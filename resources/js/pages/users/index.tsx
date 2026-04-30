import AppLayout from '@/layouts/app-layout';
import { UserType, FilterOption, PaginationType, SortOption } from '@/types';
import { Head } from '@inertiajs/react';
import CommonTable from '@/components/admin/CommonTable';
import Heading from '@/components/admin/heading';
import { columns } from './columns';

interface Props {
    users: PaginationType<UserType>;
}



export default function UserIndex({ users }: Props) {
    const breadcrumbs = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Users', href: route('users.index') },
    ];

    const filters: FilterOption[] = [
        {
            name: 'role',
            label: 'User Role',
            type: 'select',
            options: [
                { label: 'Super Admin', value: 'super_admin' },
                { label: 'User', value: 'user' },
            ]
        },

    ];

    const userSortOptions :SortOption [] = [
        { label: 'Newest First', sort: 'created_at', direction: 'desc' },
        { label: 'Name (A-Z)', sort: 'name', direction: 'asc' },
        { label: 'Email', sort: 'email', direction: 'asc' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users | CVS CRM" />

            <div className="flex flex-col flex-1 h-full gap-4 p-4 overflow-x-auto rounded-xl">
                <Heading
                    title={`Users (${users.total})`}
                    description="Manage your client base, contact information, and account status."
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
