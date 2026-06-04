<?php

namespace App\Services;

use App\Repositories\SettingRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;

class SettingService
{
    public function __construct(protected SettingRepository $repository) {}

    /**
     * Get all settings.
     *
     * @return array
     */
    public function getAllSettings(): array
    {
        return $this->repository->getAll()->toArray();
    }

    /**
     * Update settings.
     *
     * @param array $data
     * @return void
     */
    public function updateSettings(array $data): void
    {
        $imageFields = ['logo', 'secondary_logo', 'favicon', 'company_seal'];

        foreach ($data as $key => $value) {
            if (in_array($key, $imageFields)) {
                if ($value instanceof UploadedFile) {
                    $this->handleImageUpload($key, $value);
                }
                continue;
            }

            // Always update other fields from validated data (which can be null to clear them)
            $this->repository->updateOrCreate($key, $value);
        }

        // Clear the global settings cache
        Cache::forget('settings.all');
    }

    /**
     * Handle image file upload.
     *
     * @param string $key
     * @param UploadedFile $file
     * @return void
     */
    protected function handleImageUpload(string $key, UploadedFile $file): void
    {
        // Get old image path
        $oldPath = $this->repository->getAll()->get($key);

        // Store new image
        $path = $file->store('settings', 'public');

        // Save path to DB
        $this->repository->updateOrCreate($key, $path);

        // Delete old image if exists
        if ($oldPath && Storage::disk('public')->exists($oldPath)) {
            Storage::disk('public')->delete($oldPath);
        }
    }
}
