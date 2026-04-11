<?php

use App\Models\Customer;

it('test_can_search_customers_by_company_name', function ()
{
    // Arrange: Create one specific target and 5 random ones
    Customer::factory()->create(['company_name' => 'Kamal Enterprise']);
    Customer::factory()->count(5)->create();

    // Act: Hit your Inertia/JSON route
    $response = $this->get(route('customers.index', ['search' => 'Kamal']));

    // Assert: Check if only the match is returned
    $response->assertStatus(200);
    $this->assertCount(1, $response->viewData('customers')->data);
});
