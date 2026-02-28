import AppLayout from "@/layouts/app-layout";
import QuotationForm from "./form";
import { Product } from "@/types/product";

interface Props {
    customers: { id: number; name: string }[];
    products: Product[];
}

export default function Create({ customers, products }: Props) {
    return (
        <AppLayout breadcrumbs={[{ label: "Quotations", href: route('quotations.index') }, { label: "Create" }]}>
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Create Quotation</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <QuotationForm customers={customers} products={products} />
                </div>
            </div>
        </AppLayout>
    );
}
