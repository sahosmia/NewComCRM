import { Link, Head, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Plus } from "lucide-react";


import {
    Calendar,
    FileText,
    ArrowLeft,
    Package,
    Printer,
    Video,
    History
} from "lucide-react";
import { useMemo } from "react";
import CustomerInfoCard from "@/components/admin/CustomerInfoCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";
import AppLayout from "@/layouts/app-layout";

import type { CustomerType, Requirement } from "@/types";
import { User } from "@/types";
import { formatDate } from "@/utils/date-format";

interface Props {
    requirement: Requirement;
    customers: CustomerType[];
    requirements: Requirement[];
    users: User[];
}

export default function Show({ requirement, customers, requirements, users }: Props) {
    const { openModal } = useModal();

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

    // --- Calculation Logic ---
    const totals = useMemo(() => {
        const itemsTotal = requirement.items?.reduce((sum: number, i: any) => sum + parseFloat(i.total_price), 0) || 0;
        const itemsCostingTotal = requirement.items?.reduce((sum: number, i: any) => sum + ((parseFloat(i.costing_price) || 0) * (i.quantity || 0)), 0) || 0;

        const accessoriesTotal = requirement.has_accessories ? requirement.accessories?.reduce((sum: number, i: any) => sum + (parseFloat(i.total_price) || 0), 0) || 0 : 0;
        const installationTotal = requirement.has_installation ? requirement.installations?.reduce((sum: number, i: any) => sum + (parseFloat(i.total_price) || 0), 0) || 0 : 0;

        const subTotal = itemsTotal + accessoriesTotal + installationTotal;

        const taxableAmount = itemsTotal + accessoriesTotal + installationTotal;

        const vatAmount = (parseFloat(requirement.vat_percentage as string) || 0) > 0 ? taxableAmount * ((parseFloat(requirement.vat_percentage as string) || 0) / 100) : 0;

        // AIT calculation: Gross-up formula
        const aitPercentage = parseFloat(requirement.ait_percentage as string) || 0;
        const aitAmount = (aitPercentage > 0 && aitPercentage < 100) ? taxableAmount * (aitPercentage / (100 - aitPercentage)) : 0;

        return {
            subTotal,
            itemsCostingTotal,
            vatAmount,
            aitAmount,
            grandTotal: requirement.grand_total // Or subTotal + vatAmount + aitAmount if dynamic
        };
    }, [requirement]);

    return (


        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Requirement: ${requirement.customer?.name || 'N/A'}`} />

            <div className="p-6 max-w-6xl mx-auto space-y-6">
                {/* Top Action Bar (Remains same) */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-background">
                    <div className="flex items-center gap-3">
                        <Link href={route('requirements.index')}>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-black tracking-tight">
                                    {requirement.title || `REQ-${requirement.id}`}
                                </h1>
                                <StatusBadge status={requirement.status} />
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                                <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                                    <Calendar className="w-3 h-3 text-primary" />
                                    Created on {formatDate(requirement.created_at)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Link href={route("requirements.edit", requirement.id)} className="flex-1 md:flex-none">
                            <Button variant="outline" size="sm" className="w-full">Edit</Button>
                        </Link>
                        <a href={route('requirements.download', requirement.id)} target="_blank">
                            <Button variant="outline" size="sm" className="flex-1 md:flex-none">
                                <Printer className="w-4 h-4 mr-2" /> Print
                            </Button>
                        </a>
                    </div>
                </div>

                <div>
                    <div className="bg-card border rounded-xl shadow-sm overflow-hidden mt-6">
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
                                        <th className="px-6 py-4 w-5/12">Product Description</th>
                                        <th className="px-6 py-4 w-1/12">Qty</th>
                                        <th className="px-6 py-4 text-right w-2/12">Costing Price</th>
                                        <th className="px-6 py-4 text-right w-2/12">Sale Price</th>
                                        <th className="px-6 py-4 text-right w-2/12">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {requirement.items?.map((item: any) => (
                                        <tr key={item.id} className="hover:bg-muted/5 transition-colors">
                                            <td className="px-6 py-4 max-w-5/12">
                                                <p className="font-semibold">{item.product?.name}</p>

                                                {item.description && (
                                                    <p className="text-[12px] text-muted-foreground mt-1 italic whitespace-pre-wrap">{item.description}</p>
                                                )}
                                                <div className="flex flex-col gap-4 mt-1">
                                                    {item.product?.supplier_name && (
                                                        <p className="text-[12px] text-muted-foreground">
                                                            <span className="font-bold uppercase">Supplier:</span> {item.product.supplier_name}
                                                        </p>
                                                    )}
                                                    {item.product?.source && (
                                                        <p className="text-[12px] text-muted-foreground">
                                                            <span className="font-bold uppercase">Source:</span> {item.product.source}
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-mono">{item.quantity} {item.product?.unit?.short_form}</td>
                                            <td className="px-6 py-4 text-right font-mono text-xs text-muted-foreground">{formatCurrency(item.costing_price)}</td>
                                            <td className="px-6 py-4 text-right font-mono text-xs text-muted-foreground">{formatCurrency(item.unit_price)}</td>
                                            <td className="px-6 py-4 text-right font-bold text-primary">{formatCurrency(item.total_price)}</td>
                                        </tr>
                                    ))}



                                    {requirement.has_accessories && requirement.accessories?.map((accessory: any) => (
                                        <tr key={`acc-${accessory.id}`} className="bg-muted/5">
                                            <td className="px-6 py-4 font-semibold">{accessory.title}</td>
                                            <td className="px-6 py-4 font-mono">
                                                {accessory.quantity}
                                                {accessory.unit?.short_form || accessory.unit?.title || 'Unit'}
                                            </td>
                                            <td></td>
                                            <td className="px-6 py-4 text-right font-mono text-xs text-muted-foreground">{formatCurrency(Number(accessory.price))}</td>
                                            <td className="px-6 py-4 text-right font-bold text-primary">
                                                {formatCurrency(Number(accessory.quantity) * Number(accessory.price))}
                                            </td>
                                        </tr>
                                    ))}

                                    {requirement.has_installation && requirement.installations?.map((installation: any) => (
                                        <tr key={`inst-${installation.id}`} className="bg-muted/5">
                                            <td className="px-6 py-4 font-semibold">{installation.title}</td>
                                            <td className="px-6 py-4 font-mono">
                                                {installation.quantity}{' '}
                                                {installation.unit?.short_form || installation.unit?.title || 'Unit'}
                                            </td>
                                            <td></td>
                                            <td className="px-6 py-4 text-right font-mono text-xs text-muted-foreground">{formatCurrency(Number(installation.price))}</td>
                                            <td className="px-6 py-4 text-right font-bold text-primary">
                                                {formatCurrency(Number(installation.quantity) * Number(installation.price))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                                <tfoot className="bg-primary/2 border-t-2 border-primary/10">
                                    {(Number(requirement.vat_percentage) > 0 || Number(requirement.ait_percentage) > 0 || totals.itemsCostingTotal > 0) && (
                                        <>
                                            <tr>
                                                <td colSpan={4} className="px-6 py-2 text-right uppercase text-[9px] font-bold text-muted-foreground">Sub-Total</td>
                                                <td className="px-6 py-2 text-right font-mono text-sm">{formatCurrency(totals.subTotal)}</td>
                                            </tr>
                                            {totals.itemsCostingTotal > 0 && (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-2 text-right uppercase text-[9px] font-bold text-muted-foreground">Total Costing</td>
                                                    <td className="px-6 py-2 text-right font-mono text-sm text-muted-foreground">{formatCurrency(totals.itemsCostingTotal)}</td>
                                                </tr>
                                            )}
                                            {Number(requirement.ait_percentage) > 0 && (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-2 text-right uppercase text-[9px] font-bold text-muted-foreground">AIT Adjustment ({requirement.ait_percentage}%)</td>
                                                    <td className="px-6 py-2 text-right font-mono text-sm text-muted-foreground">+ {formatCurrency(totals.aitAmount)}</td>
                                                </tr>
                                            )}
                                            {Number(requirement.vat_percentage) > 0 && (
                                                <tr>
                                                    <td colSpan={4} className="px-6 py-2 text-right uppercase text-[9px] font-bold text-muted-foreground">VAT ({requirement.vat_percentage}%)</td>
                                                    <td className="px-6 py-2 text-right font-mono text-sm text-muted-foreground">+ {formatCurrency(totals.vatAmount)}</td>
                                                </tr>
                                            )}
                                        </>
                                    )}
                                    <tr>
                                        <td colSpan={4} className="px-6 py-5 text-right uppercase text-[10px] font-black tracking-[0.2em] text-muted-foreground">Grand Total Amount</td>
                                        <td className="px-6 py-5 text-right">
                                            <span className="text-xl font-black text-primary tracking-tighter">
                                                {formatCurrency(totals.grandTotal)}
                                            </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Side: Customer & Terms (Remains same) */}
                    <div className="lg:col-span-4 space-y-6">
                        {requirement.customer && <CustomerInfoCard customer={requirement.customer} />}
                    </div>

                    {/* Right Side: Items Table */}

                    <div className="lg:col-span-8">
                        <div className="lg:col-span-2 space-y-6">

                            {/* Activities Placeholder */}
                            <Card>
                                <CardHeader className="flex flex-row justify-between items-center py-4">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-primary" />
                                        Follow-up History
                                    </CardTitle>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => openModal('CREATE_FOLLOW_UP', {
                                            customer_id: requirement.customer_id,
                                            requirement_id: requirement.id,
                                            user_id: requirement.user_id,
                                            users: users,
                                            customers: customers,
                                            requirements: requirements,
                                            onSuccess: () => {
                                                router.reload({ only: ['requirement'] });
                                            }
                                        })}
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Log Follow-up
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {requirement.follow_ups?.length > 0 ? (
                                        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
                                            {requirement.follow_ups.map((fu: any) => (
                                                <div key={fu.id} className="relative flex items-start gap-4 group">
                                                    {/* Timeline Dot */}
                                                    <div className={`mt-1.5 h-10 w-10 rounded-full border-4 border-background flex items-center justify-center shrink-0 z-10 shadow-sm
                                                    ${fu.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                                                        <MessageSquare className="w-4 h-4" />
                                                    </div>

                                                    {/* Content Card */}
                                                    <div className="flex-1 bg-muted/20 p-4 rounded-xl border border-transparent group-hover:border-primary/20 transition-all">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <h4 className="font-semibold text-sm capitalize">{fu.status.replace('_', ' ')}</h4>
                                                            <time className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                                                                {new Date(fu.follow_up_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                                            </time>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground line-clamp-2 italic">
                                                            "{fu.notes || "No notes provided."}"
                                                        </p>


                                                        <div className="mt-3 flex items-center gap-4">
                                                            <Badge variant="secondary" className="text-[10px] h-5">
                                                                Priority: {fu.priority}
                                                            </Badge>
                                                            <Link
                                                                href={route('follow-ups.show', fu.id)}
                                                                className="text-[11px] text-primary hover:underline font-medium"
                                                            >
                                                                Details →
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="bg-muted/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Calendar className="w-6 h-6 text-muted-foreground/50" />
                                            </div>
                                            <p className="text-sm text-muted-foreground font-medium">No follow-ups recorded yet.</p>
                                            <p className="text-xs text-muted-foreground/70 mt-1">Start tracking interactions with this customer.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Meetings Section */}
                            <Card>
                                <CardHeader className="flex flex-row justify-between items-center py-4">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Video className="w-5 h-5 text-primary" />
                                        Meeting History
                                    </CardTitle>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => openModal('CREATE_MEETING', {
                                            customer_id: requirement.customer_id,
                                            requirement_id: requirement.id,
                                            user_id: requirement.user_id,
                                            users: users,
                                            customers: customers,
                                            requirements: requirements,
                                            onSuccess: () => {
                                                router.reload({ only: ['requirement'] });
                                            }
                                        })}
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Schedule Meeting
                                    </Button>
                                </CardHeader>
                                <CardContent>
                                    {requirement.meetings?.length > 0 ? (
                                        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
                                            {requirement.meetings.map((m: any) => (
                                                <div key={m.id} className="relative flex items-start gap-4 group">
                                                    {/* Timeline Dot */}
                                                    <div className={`mt-1.5 h-10 w-10 rounded-full border-4 border-background flex items-center justify-center shrink-0 z-10 shadow-sm
                            ${m.status === 'completed' ? 'bg-emerald-500 text-white' : m.status === 'cancelled' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                                                        <Video className="w-4 h-4" />
                                                    </div>

                                                    {/* Content Card */}
                                                    <div className="flex-1 bg-muted/20 p-4 rounded-xl border border-transparent group-hover:border-primary/20 transition-all">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <h4 className="font-semibold text-sm capitalize">{m.title}</h4>
                                                            <time className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">
                                                                {new Date(m.scheduled_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                            </time>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground line-clamp-2 italic">
                                                            "{m.agenda || "No agenda provided."}"
                                                        </p>

                                                        <div className="mt-3 flex items-center gap-4">
                                                            <Badge variant="secondary" className="text-[10px] h-5">
                                                                Type: {m.meeting_type}
                                                            </Badge>
                                                            <Badge variant="outline" className="text-[10px] h-5 capitalize">
                                                                {m.status}
                                                            </Badge>
                                                            <Link
                                                                href={route('meetings.show', m.id)}
                                                                className="text-[11px] text-primary hover:underline font-medium"
                                                            >
                                                                Details →
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="bg-muted/50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Video className="w-6 h-6 text-muted-foreground/50" />
                                            </div>
                                            <p className="text-sm text-muted-foreground font-medium">No meetings scheduled yet.</p>
                                            <p className="text-xs text-muted-foreground/70 mt-1">Keep track of physical or virtual meetings.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                        </div>

                        <div className="bg-card border rounded-xl p-5 shadow-sm space-y-4 mt-6">
                            <h2 className="font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                                <FileText className="w-3 h-3 text-primary" /> Terms & Delivery
                            </h2>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                {requirement.quotation_recipient && (
                                    <div className="col-span-2 border-b pb-2 mb-2">
                                        <p className="text-muted-foreground mb-1 uppercase text-[9px] font-bold">Sent To</p>
                                        <p className="font-bold">{requirement.quotation_recipient.name} ({requirement.quotation_recipient.company?.name || 'N/A'})</p>
                                    </div>
                                )}
                                {requirement.quotation_sender && (
                                    <div className="col-span-2 border-b pb-2 mb-2">
                                        <p className="text-muted-foreground mb-1 uppercase text-[9px] font-bold">Sent By</p>
                                        <p className="font-bold">{requirement.quotation_sender.name}</p>
                                    </div>
                                )}
                                <div><p className="text-muted-foreground mb-1">Price Validity</p><p className="font-bold">{requirement.price_validity_days || 'N/A'} Days</p></div>
                                <div><p className="text-muted-foreground mb-1">Delivery Time</p><p className="font-bold">{requirement.delivery_time_days || 'N/A'} Days</p></div>
                                {/* {requirement.delivery_date && <div><p className="text-muted-foreground mb-1">Deliver Able Date</p><p className="font-bold">{formatDate(requirement.delivery_date)}</p></div>} */}

                                <div><p className="text-muted-foreground mb-1">Advance Pay</p><p className="font-bold">{requirement.advance_payment}%</p></div>
                                {requirement.before_payment > 0 && <div><p className="text-muted-foreground mb-1">Before Delivery</p><p className="font-bold">{requirement.before_payment}%</p></div>}
                                {requirement.after_payment > 0 && <div><p className="text-muted-foreground mb-1">After Delivery</p><p className="font-bold">{requirement.after_payment}%</p></div>}
                            </div>
                        </div>
                    </div>


                </div>


            </div>
        </AppLayout>
    );
}
