import { Head, Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import SupplierForm from './form';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Suppliers', href: route('suppliers.index') },
    { title: 'Create', href: route('suppliers.create') },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Supplier" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Create Supplier</h1>
                        <p className="text-sm text-muted-foreground">Add a new supplier to the system.</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('suppliers.index')}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to List
                        </Link>
                    </Button>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <SupplierForm />
                </div>
            </div>
        </AppLayout>
    );
}
