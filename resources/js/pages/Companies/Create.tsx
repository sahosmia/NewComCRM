import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/admin/heading';
import { Head } from '@inertiajs/react';
import CompanyForm from './form';

export default function Create() {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Companies', href: route('companies.index') },
        { title: 'Create Company', href: route('companies.create') },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Company" />
            <div className="p-4 md:p-8">
                <div className="max-w-2xl mx-auto">
                    <Heading
                        title="Create New Company"
                        description="Add a new company to manage its details and associated customers."
                        className="mb-8"
                    />
                    <CompanyForm />
                </div>
            </div>
        </AppLayout>
    );
}
