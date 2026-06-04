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
            'logo' => ['nullable', 'image', 'max:2048'],
            'favicon' => ['nullable', 'image', 'max:1024'],
            'company_seal' => ['nullable', 'image', 'max:2048'],
            'app_name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
            'paginated_quantity' => ['required', 'integer', 'min:1'],
        ]);

        $this->service->updateSettings($validated);

        return back()->with('success', 'Settings updated successfully.');
    }
}
