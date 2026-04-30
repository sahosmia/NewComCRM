import AppLayout from '@/layouts/app-layout';
import Heading from '@/components/admin/heading';
import { Head } from '@inertiajs/react';
import CompanyForm from './form';

interface Props {
    company: any;
}

export default function Edit({ company }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Companies', href: route('companies.index') },
        { title: 'Edit Company', href: route('companies.edit', company.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${company.name} | CVS CRM`} />
            <div className="p-4 md:p-8">
                <div className="max-w-2xl mx-auto">
                    <Heading
                        title="Edit Company"
                        description="Update company information and details."
                    />
                    <CompanyForm company={company} />
                </div>
            </div>
        </AppLayout>
    );
}
