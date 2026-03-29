<?php

namespace App\Repositories;

use App\Models\Requirement;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class RequirementRepository
{
    public function paginateIndex(int $perPage = 10): LengthAwarePaginator
    {
        return Requirement::query()
            ->with(['customer', 'product'])
            ->latest()
            ->paginate($perPage);
    }

    public function create(array $data): Requirement
    {
        return Requirement::query()->create($data);
    }

    public function update(Requirement $requirement, array $data): void
    {
        $requirement->update($data);
    }

    public function delete(Requirement $requirement): void
    {
        $requirement->delete();
    }
}
