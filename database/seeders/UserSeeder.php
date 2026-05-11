<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create 1 Super Admin
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'role' => 'super_admin',
                'email_verified_at' => now(),
            ]
        );

        // Create 5 regular Users
        $users = [
            ['name' => 'Arif Rahman', 'email' => 'arif@example.com'],
            ['name' => 'Sultana Ahmed', 'email' => 'sultana@example.com'],
            ['name' => 'Kamal Hossain', 'email' => 'kamal@example.com'],
            ['name' => 'Meherun Nesa', 'email' => 'meherun@example.com'],
            ['name' => 'Tanvir Islam', 'email' => 'tanvir@example.com'],
        ];

        foreach ($users as $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'password' => Hash::make('password'),
                    'role' => 'user',
                    'email_verified_at' => now(),
                ]
            );
        }
    }
}
