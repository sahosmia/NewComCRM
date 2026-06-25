import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { Company, CustomerType, Product, Requirement, Unit, User } from "@/types";
import RequirementForm from "./form";

interface Props {
    requirement: Requirement;
    customers: CustomerType[];
    products: Product[];
    units: Unit[];
    users: User[];
        all_users: User[];

    companies: Company[];
}

export default function Edit({ requirement, customers, products, units, users, all_users, companies }: Props) {
    console.log(all_users);

    return (
        <AppLayout breadcrumbs={[{ title: "Requirements", href: route('requirements.index') }, { title: "Edit", href: route('requirements.edit', requirement.id) }]}>
            <Head title={`Edit Requirement: #${requirement.id}`} />

            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Edit Requirement</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <RequirementForm requirement={requirement} customers={customers} products={products} units={units} users={users} all_users={all_users} companies={companies} />
                </div>
            </div>
        </AppLayout>
    );
}
