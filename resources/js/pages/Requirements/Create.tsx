import AppLayout from "@/layouts/app-layout";
import RequirementForm from "./form";

interface Props {
    customers: { id: number; name: string; company_name: string }[];
    products: { id: number; name: string; unit_price: string }[];
}

export default function Create({ customers, products }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Requirements", href: route('requirements.index') }, { title: "Create", href: route('requirments.create') }]}>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Create Requirement</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <RequirementForm customers={customers} products={products} />
                </div>
            </div>
        </AppLayout>
    );
}
