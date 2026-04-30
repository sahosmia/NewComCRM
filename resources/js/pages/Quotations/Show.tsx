import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Quotation } from "@/types/quotation";

interface Props {
    quotation: Quotation;
}

export default function Show({ quotation }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Quotations", href: route('quotations.index') }, { title: "Details View", href: "#" }]}>
                        <Head title={`Quotation: ${quotation.quotation_number}`} />

            <div className="p-6 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Quotation: {quotation.quotation_number}</h1>
                        <p className="text-muted-foreground">Status: <span className="capitalize">{quotation.status}</span></p>
                    </div>
                    <div className="space-x-2">
                        <Link href={route("quotations.download", quotation.id)}>
                            <Button variant="outline">Download PDF</Button>
                        </Link>
                        {quotation.status === 'draft' && (
                            <Link href={route("quotations.edit", quotation.id)}>
                                <Button>Edit</Button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-bold mb-2">Customer Info</h3>
                        <p>{quotation.customer?.name}</p>
                        <p className="text-sm text-muted-foreground">{quotation.customer?.company?.name}</p>
                        <p className="text-sm">{quotation.customer?.email}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-bold mb-2">Quotation Info</h3>
                        <p>Date: {new Date(quotation.quotation_date).toLocaleDateString()}</p>
                        <p>Valid Until: {new Date(quotation.valid_until).toLocaleDateString()}</p>
                        <p>Created By: {quotation.user?.name}</p>
                    </div>
                </div>

                <div className="border rounded-lg overflow-hidden mb-8">
                    <table className="w-full text-left">
                        <thead className="bg-muted">
                            <tr>
                                <th className="p-3">Product</th>
                                <th className="p-3 text-right">Qty</th>
                                <th className="p-3 text-right">Price</th>
                                <th className="p-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotation.items?.map((item) => (
                                <tr key={item.id} className="border-t">
                                    <td className="p-3">{item.description}</td>
                                    <td className="p-3 text-right">{item.quantity}</td>
                                    <td className="p-3 text-right">${item.unit_price}</td>
                                    <td className="p-3 text-right">${item.total}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="border-t bg-muted/50 font-bold">
                            <tr>
                                <td colSpan={3} className="p-3 text-right">Subtotal</td>
                                <td className="p-3 text-right">${quotation.subtotal}</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="p-3 text-right">Tax</td>
                                <td className="p-3 text-right">${quotation.tax}</td>
                            </tr>
                            <tr>
                                <td colSpan={3} className="p-3 text-right">Discount</td>
                                <td className="p-3 text-right">-${quotation.discount}</td>
                            </tr>
                            <tr className="text-lg">
                                <td colSpan={3} className="p-3 text-right">Grand Total</td>
                                <td className="p-3 text-right">${quotation.total}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                {(quotation.terms_conditions || quotation.notes) && (
                    <div className="grid grid-cols-2 gap-8">
                        {quotation.terms_conditions && (
                            <div>
                                <h4 className="font-bold text-sm mb-1">Terms & Conditions</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{quotation.terms_conditions}</p>
                            </div>
                        )}
                        {quotation.notes && (
                            <div>
                                <h4 className="font-bold text-sm mb-1">Notes</h4>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{quotation.notes}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
