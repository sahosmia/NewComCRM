<?php

namespace App\Http\Controllers;

use App\Services\LookupRegistry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LookupController extends Controller
{
    public function __construct(
        private LookupRegistry $lookups
    ) {}

    /**
     * Handle dynamic lookup searches (e.g., for async comboboxes)
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'keys' => 'required|array',
            'params' => 'nullable|array',
        ]);

        $keysWithParams = [];
        $params = $request->input('params', []);

        foreach ($request->input('keys') as $key) {
            $keysWithParams[$key] = $params[$key] ?? [];
        }

        return response()->json($this->lookups->get($keysWithParams));
    }
}
