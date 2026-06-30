<?php

namespace App\Imports;

use App\Models\Product;
use App\Http\Requests\Concerns\ValidatesProductAttributes;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsFailures;

class ProductImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnFailure
{
    use Importable, SkipsFailures, ValidatesProductAttributes;

    public function model(array $row)
    {
        return new Product([
            'name'           => $row['name'],
            'description'    => $row['description'],
            'category'       => $row['category'],
            'stock_quantity' => $row['stock_quantity'] ?? 0,
            'unit_price'     => $row['unit_price'],
            'supplier_id'    => $row['supplier_id'],
            'unit_id'        => $row['unit_id'],
            'source'         => $row['source'],
        ]);
    }

    public function rules(): array
    {
        $rules = $this->productAttributeRules();
        $rules['unit_id'] = 'nullable|exists:units,id';
        $rules['supplier_id'] = 'nullable|exists:suppliers,id';
        return $rules;
    }
}
