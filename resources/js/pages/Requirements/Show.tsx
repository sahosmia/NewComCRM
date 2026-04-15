import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";

export default function Show({ requirement }: any) {
    const breadcrumbs = [
        { title: "Requirements", href: route('requirements.index') },
        { title: `Requirement Details`, href: route('requirements.show', requirement.id) }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Requirement Details</h1>
                    <Link href={route("requirements.edit", requirement.id)}>
                        <Button variant="outline">Edit</Button>
                    </Link>
                </div>

                <div className="bg-card p-6 border rounded-lg shadow-sm space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Customer</h3>
                            <p>{requirement.customer?.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Product</h3>
                            <p>{requirement.product?.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Quantity</h3>
                            <p>{requirement.quantity}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Unit Price</h3>
                            <p>${requirement.unit_price}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Total Price</h3>
                            <p className="font-bold">${requirement.total_price}</p>
                        </div>
                    </div>
                    {requirement.notes && (
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                            <p className="whitespace-pre-wrap">{requirement.notes}</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
