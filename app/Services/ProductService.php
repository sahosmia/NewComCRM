<?php

namespace App\Services;

use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

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
}
