<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class ProductRepository
{
    public function paginateLatest(int $perPage = 10): LengthAwarePaginator
    {
        return Product::query()->latest()->paginate($perPage);
    }

    public function all(): Collection
    {
        return Product::query()->get();
    }

    public function forRequirementForm(): Collection
    {
        return Product::query()
            ->select('id', 'name', 'unit_price')
            ->get();
    }

    public function create(array $data): Product
    {
        return Product::query()->create($data);
    }

    public function update(Product $product, array $data): void
    {
        $product->update($data);
    }

    public function delete(Product $product): void
    {
        $product->delete();
    }
}
