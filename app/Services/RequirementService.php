<?php

namespace App\Services;

use App\Models\Requirement;
use App\Repositories\RequirementRepository;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class RequirementService
{
    public function __construct(
        private RequirementRepository $requirements,
    ) {
    }

    public function paginateIndex(array $filters): LengthAwarePaginator
    {
        return $this->requirements->paginateForIndex($filters);
    }



    public function create(array $data): Requirement
    {
        return DB::transaction(function () use ($data) {
            $requirementData = collect($data)->except(['items', 'accessories', 'installations'])->toArray();
            $requirementData['status'] = 'pending';

            $requirement = $this->requirements->create($requirementData);

            $requirement->items()->createMany($data['items']);
            if (!empty($data['accessories'])) {
                $requirement->accessories()->createMany($data['accessories']);
            }

            if (!empty($data['installations'])) {
                $requirement->installations()->createMany($data['installations']);
            }

            // Explicitly calculate to ensure taxes/accessories/installation are included
            $requirement->calculateGrandTotal();

            return $requirement;
        });
    }

    public function update(Requirement $requirement, array $data): void
    {
        DB::transaction(function () use ($requirement, $data) {
            $requirementData = collect($data)->except(['items', 'accessories', 'installations'])->toArray();

            $this->requirements->update($requirement, $requirementData);

            $requirement->items()->delete();

            $requirement->items()->createMany($data['items']);

             $requirement->accessories()->delete();
            if (!empty($data['accessories'])) {
                $requirement->accessories()->createMany($data['accessories']);
            }

            $requirement->installations()->delete();
            if (!empty($data['installations'])) {
                $requirement->installations()->createMany($data['installations']);
            }

            // Explicitly calculate to ensure taxes/accessories/installation are included
            $requirement->calculateGrandTotal();
        });
    }

    public function delete(Requirement $requirement): void
    {
        $this->requirements->delete($requirement);
    }

    public function bulkDelete(array $ids): void
    {
        $this->requirements->bulkDelete($ids);
    }

    public function getForExport(array $ids): Collection
    {
        return $this->requirements->getForExport($ids);
    }

    public function selectOptions(): Collection
    {
        return $this->requirements->selectOptions();
    }
}
