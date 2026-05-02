import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Heading from '@/components/admin/heading';
import { Unit } from '@/types/unit';
import UnitForm from './form';

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

            <div className="flex flex-col flex-1 h-full gap-4 p-4 rounded-xl max-w-2xl mx-auto w-full">
                <Heading
                    title={`Edit Unit: ${unit.title}`}
                    description="Update unit information."
                />

                <div className="bg-card p-6 rounded-lg border shadow-sm mt-4">
                    <UnitForm unit={unit} />
                </div>
            </div>
        </AppLayout>
    );
}
