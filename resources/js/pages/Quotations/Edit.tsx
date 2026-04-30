import AppLayout from "@/layouts/app-layout";
import QuotationForm from "./form";
import { Quotation } from "@/types/quotation";
import { Product } from "@/types/product";
import { Head } from "@inertiajs/react";

interface Props {
    quotation: Quotation;
    customers: { id: number; name: string }[];
    products: Product[];
}

export default function Edit({ quotation, customers, products }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Quotations", href: route('quotations.index') }, { title: "Edit", href: route('quotations.create') }]}>
                        <Head title={`Edit Quotation: ${quotation.quotation_number}`} />

            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Edit Quotation</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <QuotationForm quotation={quotation} customers={customers} products={products} />
                </div>
            </div>
        </AppLayout>
    );
}
