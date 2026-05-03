<?php

namespace App\Services;

use App\Models\Unit;
use App\Repositories\UnitRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

class UnitService
{
    public function __construct(
        private UnitRepository $unitRepository
    ) {}

    public function paginateIndex(array $params): LengthAwarePaginator
    {
        return $this->unitRepository->paginateForIndex($params);
    }

    public function getAll(): Collection
    {
        return $this->unitRepository->all();
    }

    public function create(array $data): Unit
    {
        return $this->unitRepository->create($data);
    }

    public function update(Unit $unit, array $data): void
    {
        $this->unitRepository->update($unit, $data);
    }

    public function delete(Unit $unit): void
    {
        $this->unitRepository->delete($unit);
    }

    public function bulkDelete(array $ids): void
    {
        $this->unitRepository->bulkDelete($ids);
    }
}
