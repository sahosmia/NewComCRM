<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Company;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CompanyApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_create_a_company_via_json()
    {
        $user = User::factory()->create(['role' => 'super_admin']);

        $data = [
            'name' => 'New JSON Company',
            'email' => 'json@example.com',
            'phone' => '123456789',
            'website' => 'https://example.com',
            'address' => 'JSON Address',
        ];

        $response = $this->actingAs($user)
            ->postJson(route('companies.store'), $data);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'company' => [
                    'id',
                    'name',
                    'email',
                    'phone',
                    'website',
                    'address',
                ]
            ])
            ->assertJson([
                'message' => 'Company created successfully.',
                'company' => [
                    'name' => 'New JSON Company',
                ]
            ]);

        $this->assertDatabaseHas('companies', ['name' => 'New JSON Company']);
    }

    public function test_company_creation_validation_works_for_json_requests()
    {
        $user = User::factory()->create(['role' => 'super_admin']);

        $response = $this->actingAs($user)
            ->postJson(route('companies.store'), [
                'name' => '', // Required
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name']);
    }
}
