import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import {
    Calendar,
    User,
    Building2,
    Mail,
    Phone,
    FileText,
    ArrowLeft,
    Package
} from "lucide-react";

export default function Show({ requirement }: any) {
    const breadcrumbs = [
        { title: "Requirements", href: route('requirements.index') },
        { title: `Details #${requirement.id}`, href: route('requirements.show', requirement.id) }
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
            <Head title={`Requirement #${requirement.id}`} />

            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <Link href={route('requirements.index')}>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Requirement #{requirement.id}</h1>
                            <div className="flex items-center gap-2 text-muted-foreground mt-1 text-sm">
                                <Calendar className="w-4 h-4" />
                                <span>Created on {new Date(requirement.created_at).toLocaleDateString()}</span>
                                <Badge variant="secondary" className="ml-2 capitalize">{requirement.status}</Badge>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route("requirements.edit", requirement.id)}>
                            <Button variant="outline">Edit Requirement</Button>
                        </Link>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Generate Quote</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column: Customer Details */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
                            <div className="flex items-center gap-2 border-b pb-3 mb-2">
                                <User className="w-5 h-5 text-blue-500" />
                                <h2 className="font-semibold italic uppercase text-sm tracking-wider">Customer Info</h2>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase">Name</p>
                                    <p className="font-medium text-blue-600 underline underline-offset-4 decoration-blue-200">{requirement.customer?.name}</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Building2 className="w-4 h-4 text-muted-foreground mt-1" />
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase">Company</p>
                                        <p className="text-sm">{requirement.customer?.company_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Mail className="w-4 h-4 text-muted-foreground mt-1" />
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase">Email</p>
                                        <p className="text-sm">{requirement.customer?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Phone className="w-4 h-4 text-muted-foreground mt-1" />
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase">Phone</p>
                                        <p className="text-sm">{requirement.customer?.phones?.[0]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes Section */}
                        {requirement.notes && (
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm">
                                <div className="flex items-center gap-2 mb-3">
                                    <FileText className="w-5 h-5 text-amber-600" />
                                    <h2 className="font-semibold text-amber-800 text-sm uppercase">Internal Notes</h2>
                                </div>
                                <p className="text-sm text-amber-900 whitespace-pre-wrap leading-relaxed italic">
                                    "{requirement.notes}"
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Items List Table */}
                    <div className="md:col-span-2">
                        <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                            <div className="p-5 border-b bg-muted/30 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Package className="w-5 h-5 text-blue-500" />
                                    <h2 className="font-bold uppercase text-sm tracking-wider">Requirement Items</h2>
                                </div>
                                <Badge variant="outline" className="bg-gray-600">{requirement.items?.length} Items</Badge>
                            </div>
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] font-bold">
                                    <tr>
                                        <th className="px-5 py-3">Product Description</th>
                                        <th className="px-5 py-3 text-center">Qty</th>
                                        <th className="px-5 py-3 text-right">Unit Price</th>
                                        <th className="px-5 py-3 text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {requirement.items?.map((item: any) => (
                                        <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                                            <td className="px-5 py-4">
                                                <p className="font-medium">{item.product?.name}</p>
                                                <p className="text-[11px] text-muted-foreground">{item.product?.brand}</p>
                                            </td>
                                            <td className="px-5 py-4 text-center font-mono">
                                                {item.quantity}
                                            </td>
                                            <td className="px-5 py-4 text-right font-mono">
                                                {formatCurrency(item.unit_price)}
                                            </td>
                                            <td className="px-5 py-4 text-right font-bold text-blue-600">
                                                {formatCurrency(item.total_price)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-muted/30 font-bold border-t-2 border-muted">
                                    <tr>
                                        <td colSpan={3} className="px-5 py-4 text-right uppercase text-xs tracking-widest">Grand Total</td>
                                        <td className="px-5 py-4 text-right text-lg text-blue-700">
                                            {formatCurrency(requirement.grand_total)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
