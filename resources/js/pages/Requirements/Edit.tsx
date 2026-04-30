import AppLayout from "@/layouts/app-layout";
import RequirementForm from "./form";
import { Requirement } from "@/types/requirement";
import { Product } from "@/types/product";
import { Customer } from "@/types/customer";

interface Props {
    requirement: Requirement;
    customers: Customer[];
    products: Product[];
}

export default function Edit({ requirement, customers, products }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Requirements", href: route('requirements.index') }, { title: "Edit", href:route('requirements.edit', requirement.id) }]}>
            <div className="p-6
            ">
                <h1 className="text-xl font-bold mb-4">Edit Requirement</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <RequirementForm requirement={requirement} customers={customers} products={products} />
                </div>
            </div>
        </AppLayout>
    );
}
