import AppLayout from "@/layouts/app-layout";
import RequirementForm from "./Form";
import { Head } from "@inertiajs/react";
import { CustomerType, Product, Requirement, Unit, User } from "@/types";

interface Props {
    requirement: Requirement;
    customers: CustomerType[];
    products: Product[];
    units: Unit[];
    users: User[];
}

export default function Edit({ requirement, customers, products, units, users }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Requirements", href: route('requirements.index') }, { title: "Edit", href: route('requirements.edit', requirement.id) }]}>
            <Head title={`Edit Requirement: #${requirement.id}`} />

            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Edit Requirement</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <RequirementForm requirement={requirement} customers={customers} products={products} units={units} users={users} />
                </div>
            </div>
        </AppLayout>
    );
}
