<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\SettingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function __construct(protected SettingService $service) {}

    /**
     * Display a listing of the settings.
     */
    public function index()
    {
        return Inertia::render('Admin/Settings/Index', [
            'settings' => $this->service->getAllSettings(),
        ]);
    }

    /**
     * Update the settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_logo' => ['nullable', 'image', 'max:2048'],
            'logo' => ['nullable', 'image', 'max:2048'],
            'secondary_logo' => ['nullable', 'image', 'max:2048'],
            'favicon' => ['nullable', 'image', 'max:1024'],
            'company_seal' => ['nullable', 'image', 'max:2048'],
            'app_name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'address' => ['nullable', 'string'],
            'website_url' => ['nullable', 'url', 'max:255'],
            'branding_slogan' => ['nullable', 'string', 'max:255'],
            'branding_services_bar' => ['nullable', 'string', 'max:500'],
            'support_whatsapp' => ['nullable', 'string', 'max:50'],
            'office_name_1' => ['nullable', 'string', 'max:255'],
            'office_name_2' => ['nullable', 'string', 'max:255'],
            'office_name_3' => ['nullable', 'string', 'max:255'],
            'office_address_1' => ['nullable', 'string'],
            'office_address_2' => ['nullable', 'string'],
            'office_address_3' => ['nullable', 'string'],
            'footer_contact_info' => ['nullable', 'string'],
            'pdf_sender_office_info' => ['nullable', 'string'],
            'paginated_quantity' => ['required', 'integer', 'min:1'],
        ]);

        $this->service->updateSettings($validated);

        return back()->with('success', 'Settings updated successfully.');
    }
}
