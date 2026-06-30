import { Head } from "@inertiajs/react";
import CommonTable from "@/components/admin/CommonTable";
import AppLayout from "@/layouts/app-layout";
import type { BreadcrumbItem, PaginationType, Supplier } from "@/types";
import { columns } from "./Columns";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: route("dashboard") },
    { title: "Suppliers", href: route("suppliers.index") },
];

interface Props {
    suppliers: PaginationType<Supplier>;
}

export default function Index({ suppliers }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Suppliers" />
            <div className="flex flex-col gap-6 p-6">
                <CommonTable
                    data={suppliers}
                    columns={columns}
                    routeName="suppliers"
                    create_route="suppliers.create"
                    entityName="Supplier"
                    bulkDeleteRoute="suppliers.bulkDestroy"
                    filters={[
                        {
                            name: "search",
                            label: "Search",
                            type: "searchSelect",
                        },
                    ]}
                />
            </div>
        </AppLayout>
    );
}
