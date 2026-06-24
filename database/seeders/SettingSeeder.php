<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            'app_name' => 'Crystal Vision Solutions',
            'email' => 'crystalsolutionsbd@gmail.com',
            'phone' => '01730-495650',
            'address' => 'Tower 71, Level-8, Near ECB Circle, Dhaka Cantonment, Dhaka-1206',
            'website_url' => 'http://www.crystalcomputers.com.bd',
            'branding_slogan' => 'LEADING ICT AND SECURITY SERVICES PROVIDER',
            'branding_services_bar' => 'Server | Server Spare Parts | Networking Equipment\'s | Security Equipment\'s | Sound Equipment\'s | Smart Device | Interactive Display',
            // 'support_whatsapp' => '01911-561554',
            'office_name_1' => 'Elephant Road Branch',
            'office_address_1' => "Tabas Building (Level-5), 53/2 New Elephant Road\nDhaka-1205, Bangladesh",
            'office_name_2' => 'Corporate Office',
            'office_address_2' => "Tower 71 (Level-8, C-9), 516/3 South Manikdi, Near ECB Circle\nDhaka Cantonment, Dhaka-1206, Bangladesh",
            'office_name_3' => 'Service Centre',
            'office_address_3' => "Tabas Building (Level-5), 53/2 New Elephant Road\nDhaka-1205, Bangladesh",
            'footer_contact_info' => 'E-mail: info@crystalcomputers.com.bd, Hunting: 09666733744, Mobile: 01730-495650, 01730-495651',
            'pdf_sender_office_info' => "<strong>Corporate Office:</strong> Tower 71, Level-8, Near ECB Circle, Dhaka Cantonment, Dhaka-1206",
            'paginated_quantity' => '10',
        ];

        foreach ($settings as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
