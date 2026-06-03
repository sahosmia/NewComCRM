<?php

namespace App\Services;

use App\Exports\GeneralExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Collection;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Illuminate\View\View;

class ExportService
{
    /**
     * Export a collection to Excel.
     */
    public function excel(Collection $collection, array $headings, callable $mapping, string $filename): BinaryFileResponse
    {
        return Excel::download(new GeneralExport(
            $collection,
            $headings,
            $mapping
        ), $filename);
    }

    /**
     * Prepare data for a general print view.
     */
    public function printView(Collection $collection, array $headings, callable $mapping, string $title): View
    {
        $data = $collection->map($mapping);

        return view('print.general', [
            'title' => $title,
            'headings' => $headings,
            'data' => $data
        ]);
    }
}
