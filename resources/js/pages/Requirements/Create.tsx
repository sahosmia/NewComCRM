import AppLayout from "@/layouts/app-layout";
import RequirementForm from "./Form";

interface Props {
    customers: { id: number; name: string; company_name: string }[];
    products: { id: number; name: string; unit_price: string }[];
}

export default function Create({ customers, products }: Props) {
    return (
        <AppLayout breadcrumbs={[{ label: "Requirements", href: route('requirements.index') }, { label: "Create" }]}>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Create Requirement</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <RequirementForm customers={customers} products={products} />
                </div>
            </div>
        </AppLayout>
    );
}
