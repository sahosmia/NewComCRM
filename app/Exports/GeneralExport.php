<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class GeneralExport implements FromCollection, WithHeadings, WithMapping
{
    protected $collection;
    protected $headings;
    protected $mappingCallback;

    public function __construct($collection, array $headings, callable $mappingCallback)
    {
        $this->collection = $collection;
        $this->headings = $headings;
        $this->mappingCallback = $mappingCallback;
    }

    public function collection()
    {
        return $this->collection;
    }

    public function headings(): array
    {
        return $this->headings;
    }

    public function map($row): array
    {
        return ($this->mappingCallback)($row);
    }
}
