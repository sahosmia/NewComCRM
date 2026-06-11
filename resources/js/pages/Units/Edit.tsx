import { Head } from '@inertiajs/react';
import Heading from '@/components/admin/heading';
import AppLayout from '@/layouts/app-layout';
import UnitForm from './form';
import { Unit } from '@/types';

interface Props {
    unit: Unit;
}

export default function UnitEdit({ unit }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Units', href: route('units.index') },
        { title: 'Edit', href: route('units.edit', unit.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Unit: ${unit.title}`} />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 rounded-xl max-w-2xl w-full">
                <Heading
                    title={`Edit Unit: ${unit.title}`}
                    description="Update unit information."
                />

                <div className="bg-card p-6 rounded-lg border shadow-sm">
                    <UnitForm unit={unit} />
                </div>
            </div>
        </AppLayout>
    );
}
