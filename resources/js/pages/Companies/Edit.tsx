import { Head } from '@inertiajs/react';
import Heading from '@/components/admin/heading';
import AppLayout from '@/layouts/app-layout';
import type { Company } from '@/types';
import CompanyForm from './form';

interface Props {
    company: Company;
}

export default function Edit({ company }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Companies', href: route('companies.index') },
        { title: 'Edit Company', href: route('companies.edit', company.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${company.name}`} />
            <div className="p-4 md:p-8 max-w-2xl border rounded-2xl">
                <Heading
                    title="Edit Company"
                    description="Update company information and details."
                />
                <CompanyForm company={company} />
            </div>
        </AppLayout>
    );
}
