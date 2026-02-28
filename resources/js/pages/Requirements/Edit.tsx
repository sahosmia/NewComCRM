import AppLayout from "@/layouts/app-layout";
import RequirementForm from "./form";
import { Requirement } from "@/types/requirement";

interface Props {
    requirement: Requirement;
    customers: { id: number; name: string; company_name: string }[];
    products: { id: number; name: string; unit_price: string }[];
}

export default function Edit({ requirement, customers, products }: Props) {
    return (
        <AppLayout breadcrumbs={[{ label: "Requirements", href: route('requirements.index') }, { label: "Edit" }]}>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Edit Requirement</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <RequirementForm requirement={requirement} customers={customers} products={products} />
                </div>
            </div>
        </AppLayout>
    );
}
