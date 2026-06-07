<?php

namespace Tests\Feature;

use App\Models\Company;
use App\Models\Customer;
use App\Models\User;
use App\Services\CustomerService;
use App\Services\ExportService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Maatwebsite\Excel\Facades\Excel;
use Tests\TestCase;

class CustomerImportExportTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->admin = User::factory()->create(['role' => 'super_admin']);
    }

    public function test_exported_customer_list_can_be_imported_and_updated()
    {
        $company = Company::factory()->create(['name' => 'Test Company']);
        $user = User::factory()->create(['name' => 'Test User']);

        $customer = Customer::factory()->create([
            'name' => 'John Export',
            'email' => 'export@example.com',
            'phones' => ['01712345678'],
            'addresses' => ['Original Address'],
            'company_id' => $company->id,
            'assigned_to' => $user->id,
            'type' => 'corporate',
            'status' => 'active',
            'remarks' => 'Original Remarks',
            'date_of_birth' => '1990-01-01',
        ]);

        // The export headings now are:
        // ['Name', 'Email', 'Phones', 'Addresses', 'Company', 'Designation', 'Type', 'Status', 'Assigned To', 'Date of Birth', 'Remarks']

        // Create a temporary excel file simulating what would be exported
        $data = [
            ['Name', 'Email', 'Phones', 'Addresses', 'Company', 'Designation', 'Type', 'Status', 'Assigned To', 'Date of Birth', 'Remarks'],
            ['John Export Updated', 'export@example.com', '01712345678, 01812345678', 'New Address', 'Test Company', 'Manager', 'corporate', 'active', 'Test User', '1990-01-01', 'Updated Remarks']
        ];

        Excel::store(new \App\Exports\GeneralExport(collect($data), [], fn($row) => $row), 'test_customers.xlsx', 'public');

        $file = new UploadedFile(storage_path('app/public/test_customers.xlsx'), 'test_customers.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', null, true);

        $importResponse = $this->actingAs($this->admin)->post(route('customers.import'), [
            'file' => $file
        ]);

        if (session('errors')) {
            $this->fail('Import failed with errors: ' . json_encode(session('errors')->all()));
        }

        $importResponse->assertRedirect();

        // Verify update happened
        $customer->refresh();
        $this->assertEquals('John Export Updated', $customer->name);
        $this->assertIsArray($customer->phones);
        $this->assertCount(2, $customer->phones);
        $this->assertContains('01712345678', $customer->phones);
        $this->assertContains('01812345678', $customer->phones);

        $this->assertIsArray($customer->addresses);
        $this->assertCount(1, $customer->addresses);
        $this->assertContains('New Address', $customer->addresses);

        $this->assertEquals('Updated Remarks', $customer->remarks);
        $this->assertEquals($company->id, $customer->company_id);
        $this->assertEquals($user->id, $customer->assigned_to);
    }
}
