import { Link, Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    FileText,
    ArrowLeft,
    Package,
    Printer,
    History
} from "lucide-react";
import CustomerInfoCard from "@/components/admin/CustomerInfoCard";
import StatusBadge from "@/components/shared/StatusBadge";

export default function Show({ requirement }: any) {
    const breadcrumbs = [
        { title: "Requirements", href: route('requirements.index') },
        { title: `REQ-${requirement.id}`, href: "#" }
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Requirement: ${requirement.customer?.name}`} />

            <div className="p-6 max-w-6xl mx-auto space-y-6">

                {/* Top Action Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-background">
                    <div className="flex items-center gap-3">
                        <Link href={route('requirements.index')}>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-black tracking-tight">REQ-{requirement.id}</h1>


                                <StatusBadge status={requirement.status} />
                            </div>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1 font-medium">
                                <Calendar className="w-3 h-3 text-primary" />
                                Created on {new Date(requirement.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        {/* <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                            <Printer className="w-4 h-4 mr-2" /> Print
                        </Button> */}
                        <Link href={route("requirements.edit", requirement.id)} className="flex-1 md:flex-none">
                            <Button variant="outline" size="sm" className="w-full">Edit</Button>
                        </Link>
                         <Link href={route('requirements.download', requirement.id)} target="_blank">
                            <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                                <Printer className="w-4 h-4 mr-2" /> Print
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Side: Customer & Internal Info (4 Columns) */}
                    <div className="lg:col-span-4 space-y-6">
                        <CustomerInfoCard customer={requirement.customer} />

                        {/* Notes Section */}
                        {requirement.notes && (
                            <div className="bg-amber-50/50 border border-amber-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <FileText className="w-12 h-12 text-amber-600" />
                                </div>
                                <h2 className="font-bold text-amber-800 text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <FileText className="w-3 h-3" />
                                    Internal Notes
                                </h2>
                                <p className="text-sm text-amber-900/80 leading-relaxed italic relative z-10">
                                    "{requirement.notes}"
                                </p>
                            </div>
                        )}

                        {/* Quick Logs/History Placeholder */}
                        <div className="border border-dashed rounded-xl p-5 flex items-center justify-center text-muted-foreground italic text-xs gap-2">
                            <History className="w-3 h-3" />
                            No recent activity logs.
                        </div>
                    </div>

                    {/* Right Side: Items Table (8 Columns) */}
                    <div className="lg:col-span-8">
                        <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                            <div className="p-5 border-b bg-muted/20 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Package className="w-4 h-4 text-primary" />
                                    <h2 className="font-bold text-sm tracking-tight uppercase">Requirement Items</h2>
                                </div>
                                <Badge variant="secondary" className="font-mono text-[10px]">
                                    {requirement.items?.length || 0} Total Items
                                </Badge>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-muted/30 text-muted-foreground uppercase text-[10px] font-bold tracking-wider border-b">
                                        <tr>
                                            <th className="px-6 py-4">Product Description</th>
                                            <th className="px-6 py-4 text-center">Qty</th>
                                            <th className="px-6 py-4 text-right whitespace-nowrap">Unit Price</th>
                                            <th className="px-6 py-4 text-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {requirement.items?.map((item: any) => (
                                            <tr key={item.id} className="hover:bg-muted/5 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <p className="font-semibold text-foreground leading-none">{item.product?.name}</p>
                                                    <p className="text-[10px] text-muted-foreground mt-1.5 uppercase font-medium tracking-tighter">
                                                        Brand: <span className="text-foreground/70">{item.product?.brand || 'N/A'}</span>
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 text-center font-mono font-medium">
                                                    {item.quantity} {item.product?.unit?.short_form}
                                                </td>
                                                <td className="px-6 py-4 text-right font-mono text-xs text-muted-foreground">
                                                    {formatCurrency(item.unit_price)}
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-primary">
                                                    {formatCurrency(item.total_price)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot className="bg-primary/[0.02] border-t-2 border-primary/10">
                                        <tr>
                                            <td colSpan={3} className="px-6 py-5 text-right uppercase text-[10px] font-black tracking-[0.2em] text-muted-foreground">Grand Total Amount</td>
                                            <td className="px-6 py-5 text-right">
                                                <span className="text-xl font-black text-primary tracking-tighter">
                                                    {formatCurrency(requirement.grand_total)}
                                                </span>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
