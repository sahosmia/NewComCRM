import AppLayout from '@/layouts/app-layout';
import { User, FilterOption, PaginationType, SortOption, BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './columns';
import { useMemo } from 'react';

interface Props {
    users: PaginationType<User>;
}

export default function UserIndex({ users }: Props) {
    const BREADCRUMBS: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Users', href: route('users.index') },
    ];
    const filters: FilterOption[] = useMemo(() => [
        {
            name: 'role',
            label: 'User Role',
            type: 'select',
            options: [
                { label: 'Super Admin', value: 'super_admin' },
                { label: 'User', value: 'user' },
            ]
        },
    ], []);

    const userSortOptions: SortOption[] = useMemo(() => [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Name (A-Z)', sort: 'name', direction: 'asc' },
        { label: 'Email', sort: 'email', direction: 'asc' },
    ], []);

    const pageTitle = "Manage Users | CRM";

    return (
        <AppLayout breadcrumbs={BREADCRUMBS}>
            <Head title={pageTitle} />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Users (${users.total})`}
                    description="Manage your team members and their access levels."
                />

                <CommonTable
                    data={users}
                    columns={columns}
                    create_route="users.create"
                    routeName="users.index"
                    filters={filters}
                    sortOptions={userSortOptions}
                />
            </div>
        </AppLayout>
    );
}
