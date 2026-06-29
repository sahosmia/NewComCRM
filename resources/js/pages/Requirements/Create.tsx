import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { Unit , Company, CustomerType, Product, User } from "@/types";
import RequirementForm from "./form";

interface Props {
    customers: CustomerType[];
    all_customers: CustomerType[];
    products: Product[];
    units: Unit[];
    users:User[];
        all_users: User[];

    companies: Company[];
}

export default function Create({ customers, all_customers, products, units, users, all_users, companies }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Requirements", href: route('requirements.index') }, { title: "Create", href: route('requirements.create') }]}>
                        <Head title="Create Requirement" />

            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Create Requirement</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <RequirementForm customers={customers} all_customers={all_customers} products={products} units={units} users={users} all_users={all_users} companies={companies} />
                </div>
            </div>
        </AppLayout>
    );
}
