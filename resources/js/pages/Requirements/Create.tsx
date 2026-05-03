import AppLayout from "@/layouts/app-layout";
import RequirementForm from "./form";
import { Head } from "@inertiajs/react";
import { Product } from "@/types/product";
import { Customer } from "@/types/customer";
import { Unit } from "@/types/unit";

interface Props {
    customers: Customer[];
    products: Product[];
    units: Unit[];
}

export default function Create({ customers, products, units }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Requirements", href: route('requirements.index') }, { title: "Create", href: route('requirements.create') }]}>
                        <Head title="Create Requirement" />

            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Create Requirement</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <RequirementForm customers={customers} products={products} units={units} />
                </div>
            </div>
        </AppLayout>
    );
}
