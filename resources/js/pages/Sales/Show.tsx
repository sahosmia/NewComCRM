import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import {
    Calendar,
    ArrowLeft,
    Package,
    ArrowRight
} from "lucide-react";
import CustomerInfoCard from "@/components/admin/CustomerInfoCard";
import { formatDate } from "@/utils/date-format";
import { formatCurrency } from "@/utils/number-format";

interface Sale {
    id: number;
    amount: string;
    sale_date: string;
    requirement_id: number;
    customer_id: number;
    customer: any;
    requirement: {
        id: number;
        title: string;
    };
}

export default function Show({ sale }: { sale: Sale }) {
    const breadcrumbs = [
        { title: "Sales", href: route('sales.index') },
        { title: `SALE-${sale.id}`, href: "#" }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Sale Details: SALE-${sale.id}`} />

            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex items-center gap-3">
                    <Link href={route('sales.index')}>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-black tracking-tight">
                            Sale Transaction: SALE-{sale.id}
                        </h1>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium mt-1">
                            <Calendar className="w-3 h-3 text-primary" />
                            Processed on {formatDate(sale.sale_date)}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        {sale.customer && <CustomerInfoCard customer={sale.customer} />}
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-card border rounded-xl shadow-sm overflow-hidden p-6 space-y-6">
                            <div className="flex justify-between items-start border-b pb-6">
                                <div>
                                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Related Requirement</p>
                                    <div className="flex items-center gap-2">
                                        <Package className="w-5 h-5 text-primary" />
                                        <h2 className="text-lg font-bold">{sale.requirement?.title || `REQ-${sale.requirement_id}`}</h2>
                                    </div>
                                    <Link href={route('requirements.show', sale.requirement_id)} className="inline-flex items-center gap-1 text-xs text-primary mt-2 hover:underline">
                                        View Full Requirement <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest mb-1">Transaction Amount</p>
                                    <p className="text-2xl font-black text-primary">{formatCurrency(sale.amount)}</p>
                                </div>
                            </div>

                            <div className="bg-muted/30 rounded-lg p-4">
                                <h3 className="text-xs font-bold uppercase mb-3 flex items-center gap-2">
                                    <div className="w-1 h-3 bg-primary rounded-full"></div>
                                    Transaction Summary
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Status</span>
                                        <span className="font-bold text-emerald-600">Purchased</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Customer Type</span>
                                        <span className="font-medium">{sale.customer?.company ? 'Corporate' : 'Personal'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Payment Status</span>
                                        <span className="font-medium">Captured</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
