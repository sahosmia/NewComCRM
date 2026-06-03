import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { CustomerType, Product, Requirement, User } from "@/types";
import { Unit } from "@/types";
import RequirementForm from "./Form";

interface Props {
    customers: CustomerType[];
    products: Product[];
    units: Unit[];
    users:User[];
}

export default function Create({ customers, products, units, users }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Requirements", href: route('requirements.index') }, { title: "Create", href: route('requirements.create') }]}>
                        <Head title="Create Requirement" />

            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Create Requirement</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <RequirementForm customers={customers} products={products} units={units} users={users} />
                </div>
            </div>
        </AppLayout>
    );
}
