<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use App\Imports\ProductImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;

class ProductService
{
    public function __construct(
        private ProductRepository $products,
    ) {}

    public function paginateIndex(array $filters): LengthAwarePaginator
    {
        return $this->products->paginateForIndex($filters);
    }

    public function create(array $data): Product
    {
        return $this->products->create($data);
    }

    public function update(Product $product, array $data): void
    {
        $this->products->update($product, $data);
    }

    public function delete(Product $product): void
    {
        $this->products->delete($product);
    }

    public function bulkDelete(array $ids): void
    {
        $this->products->bulkDelete($ids);
    }

    public function getForExport(array $ids): Collection
    {
        return $this->products->getForExport($ids);
    }

    public function import($file)
    {
        $import = new ProductImport();

        try {
            DB::beginTransaction();
            Excel::import($import, $file);

            if ($import->failures()->isNotEmpty()) {
                DB::rollBack();
                return ['errors' => $import->failures()];
            }

            DB::commit();
            return true;

        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
            DB::rollBack();
            return ['errors' => $e->failures()];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
