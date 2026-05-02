import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import Heading from '@/components/admin/heading';
import UnitForm from './form';

export default function UnitCreate() {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Units', href: route('units.index') },
        { title: 'Create', href: route('units.create') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Unit" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 rounded-xl max-w-2xl mx-auto w-full">
                <Heading
                    title="Create Unit"
                    description="Add a new unit of measurement."
                />

                <div className="bg-card p-6 rounded-lg border shadow-sm mt-4">
                    <UnitForm />
                </div>
            </div>
        </AppLayout>
    );
}
