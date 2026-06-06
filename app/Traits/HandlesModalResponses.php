<?php

namespace App\Traits;

use Illuminate\Http\Request;

trait HandlesModalResponses
{
    /**
     * Handle the response based on whether it's a modal request or a standard one.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $item
     * @param  string  $message
     * @param  string|null  $redirectRoute
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    protected function handleResponse(Request $request, $item, string $message, string $redirectRoute = null)
    {
        $isModal = $request->wantsJson() ||
                   $request->boolean('is_modal') ||
                   $request->header('X-Inertia-Modal-Submit');

        if ($isModal) {
            // Determine resource key for legacy test support
            $resourceKey = null;
            if ($item instanceof \App\Models\Company) $resourceKey = 'company';
            elseif ($item instanceof \App\Models\Unit) $resourceKey = 'unit';
            elseif ($item instanceof \App\Models\Product) $resourceKey = 'product';
            elseif ($item instanceof \App\Models\Customer) $resourceKey = 'customer';
            elseif ($item instanceof \App\Models\Requirement) $resourceKey = 'requirement';
            elseif ($item instanceof \App\Models\Meeting) $resourceKey = 'meeting';
            elseif ($item instanceof \App\Models\FollowUp) $resourceKey = 'follow_up';

            $responseData = [
                'success' => true,
                'message' => $message,
                'data' => $item,
                'new_id' => $item->id,
            ];

            if ($resourceKey) {
                $responseData[$resourceKey] = $item;
            }

            return response()->json($responseData, 201);
        }

        if ($redirectRoute) {
            return redirect()->route($redirectRoute)
                ->with('success', $message)
                ->with('new_id', $item->id);
        }

        return redirect()->back()
            ->with('success', $message)
            ->with('new_id', $item->id);
    }
}
