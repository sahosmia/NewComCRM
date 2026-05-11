<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        $companies = [
            [
                'name' => 'Square Pharmaceuticals Ltd.',
                'email' => 'info@squarepharma.com.bd',
                'phone' => '02-8859007',
                'website' => 'https://www.squarepharma.com.bd',
                'address' => 'Square Centre, 48, Mohakhali C/A, Dhaka-1212, Bangladesh',
            ],
            [
                'name' => 'Beximco Pharmaceuticals Ltd.',
                'email' => 'info@bexpiv.com',
                'phone' => '02-58611001',
                'website' => 'https://www.beximcopharma.com',
                'address' => '17, Dhanmondi R/A, Road No. 2, Dhaka-1205, Bangladesh',
            ],
            [
                'name' => 'BRAC Bank PLC',
                'email' => 'enquiry@bracbank.com',
                'phone' => '16221',
                'website' => 'https://www.bracbank.com',
                'address' => 'Anik Tower, 220/B, Tejgaon Gulshan Link Road, Tejgaon, Dhaka 1208',
            ],
            [
                'name' => 'Grameenphone Ltd.',
                'email' => 'insta.service@grameenphone.com',
                'phone' => '121',
                'website' => 'https://www.grameenphone.com',
                'address' => 'GP HOUSE, Bashundhara, Baridhara, Dhaka-1229',
            ],
            [
                'name' => 'Walton Hi-Tech Industries PLC',
                'email' => 'info@waltonbd.com',
                'phone' => '09606555555',
                'website' => 'https://waltonbd.com',
                'address' => 'Chandra, Kaliakoir, Gazipur',
            ],
            [
                'name' => 'Akij Group',
                'email' => 'info@akij.net',
                'phone' => '02-9351000',
                'website' => 'https://www.akij.net',
                'address' => 'Akij House, 198, Bir Uttam Mir Shawkat Sarak, Gulshan-1, Dhaka-1212',
            ],
        ];

        foreach ($companies as $company) {
            Company::updateOrCreate(['name' => $company['name']], $company);
        }
    }
}
