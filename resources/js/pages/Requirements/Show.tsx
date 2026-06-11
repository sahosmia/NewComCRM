import { Link, Head, router } from "@inertiajs/react";

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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Side: Customer & Terms (Remains same) */}
                    <div className="lg:col-span-4 space-y-6">
                        {requirement.customer && <CustomerInfoCard customer={requirement.customer} />}

                        {/* Meetings Section */}
                        <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                            <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
                                <h2 className="font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                                    <Video className="w-3 h-3 text-primary" /> Meetings
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-[10px] uppercase font-bold"
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
                                    Schedule
                                </Button>
                            </div>
                            <div className="p-4 space-y-3">
                                {requirement.meetings && requirement.meetings.length > 0 ? (
                                    requirement.meetings.map(meeting => (
                                        <Link key={meeting.id} href={route('meetings.show', meeting.id)} className="block">
                                            <div className="text-xs p-2 rounded border hover:bg-muted/50 transition-colors">
                                                <p className="font-bold truncate">{meeting.title}</p>
                                                <p className="text-[10px] text-muted-foreground">{new Date(meeting.scheduled_at).toLocaleString()}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-[10px] text-muted-foreground italic text-center py-2">No meetings scheduled</p>
                                )}
                            </div>
                        </div>

                        {/* Followups Section */}
                        <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                            <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
                                <h2 className="font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                                    <History className="w-3 h-3 text-primary" /> Follow-ups
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-[10px] uppercase font-bold"
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
                                    Add
                                </Button>
                            </div>
                            <div className="p-4 space-y-3">
                                {requirement.follow_ups && requirement.follow_ups.length > 0 ? (
                                    requirement.follow_ups.map(followup => (
                                        <Link key={followup.id} href={route('follow-ups.show', followup.id)} className="block">
                                            <div className="text-xs p-2 rounded border hover:bg-muted/50 transition-colors">
                                                <p className="font-bold truncate">{followup.notes || 'Follow-up'}</p>
                                                <p className="text-[10px] text-muted-foreground">{new Date(followup.follow_up_date).toLocaleString()}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-[10px] text-muted-foreground italic text-center py-2">No follow-ups recorded</p>
                                )}
                            </div>
                        </div>


                    </div>

                    {/* Right Side: Items Table */}

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
                                            <th className="px-6 py-4">Qty</th>
                                            <th className="px-6 py-4 text-right">Unit Price</th>
                                            <th className="px-6 py-4 text-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/50">
                                        {requirement.items?.map((item: any) => (
                                            <tr key={item.id} className="hover:bg-muted/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="font-semibold">{item.product?.name}</p>

                                                    {item.description && (
                                                        <p className="text-[10px] text-muted-foreground mt-1 italic whitespace-pre-wrap">{item.description}</p>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-mono">{item.quantity} {item.product?.unit?.short_form}</td>
                                                <td className="px-6 py-4 text-right font-mono text-xs text-muted-foreground">{formatCurrency(item.unit_price)}</td>
                                                <td className="px-6 py-4 text-right font-bold text-primary">{formatCurrency(item.total_price)}</td>
                                            </tr>
                                        ))}

                                        {/* {requirement.has_accessories && (
                                            <tr className="bg-muted/5">
                                                <td className="px-6 py-4 font-semibold">{requirement.accessories_title}</td>
                                                <td className="px-6 py-4">
                                                    {requirement.accessories_quantity}{' '}
                                                    {requirement.accessories_unit?.title || requirement.accessories_unit?.short_form}
                                                </td>
                                                <td className="px-6 py-4 text-right">{formatCurrency(Number(requirement.accessories_price))}</td>
                                                <td className="px-6 py-4 text-right font-bold text-primary">
                                                    {formatCurrency(Number(requirement.accessories_quantity) * Number(requirement.accessories_price))}
                                                </td>
                                            </tr>
                                        )}

                                        {requirement.has_installation && (
                                            <tr className="bg-muted/5">
                                                <td className="px-6 py-4 font-semibold">{requirement.installation_title}</td>
                                                <td className="px-6 py-4">
                                                    {requirement.installation_quantity}{' '}
                                                    {requirement.installation_unit?.title || requirement.installation_unit?.short_form}
                                                </td>
                                                <td className="px-6 py-4 text-right">{formatCurrency(Number(requirement.installation_price))}</td>
                                                <td className="px-6 py-4 text-right font-bold text-primary">
                                                    {formatCurrency(Number(requirement.installation_quantity) * Number(requirement.installation_price))}
                                                </td>
                                            </tr>
                                        )} */}

                                        {requirement.has_accessories && requirement.accessories?.map((accessory: any) => (
                                            <tr key={`acc-${accessory.id}`} className="bg-muted/5">
                                                <td className="px-6 py-4 font-semibold">{accessory.title}</td>
                                                <td className="px-6 py-4">
                                                    {accessory.quantity}{' '}
                                                    {accessory.unit?.short_form || accessory.unit?.title || 'Unit'}
                                                </td>
                                                <td className="px-6 py-4 text-right">{formatCurrency(Number(accessory.price))}</td>
                                                <td className="px-6 py-4 text-right font-bold text-primary">
                                                    {formatCurrency(Number(accessory.quantity) * Number(accessory.price))}
                                                </td>
                                            </tr>
                                        ))}

                                        {requirement.has_installation && requirement.installations?.map((installation: any) => (
                                            <tr key={`inst-${installation.id}`} className="bg-muted/5">
                                                <td className="px-6 py-4 font-semibold">{installation.title}</td>
                                                <td className="px-6 py-4">
                                                    {installation.quantity}{' '}
                                                    {installation.unit?.short_form || installation.unit?.title || 'Unit'}
                                                </td>
                                                <td className="px-6 py-4 text-right">{formatCurrency(Number(installation.price))}</td>
                                                <td className="px-6 py-4 text-right font-bold text-primary">
                                                    {formatCurrency(Number(installation.quantity) * Number(installation.price))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                    <tfoot className="bg-primary/2 border-t-2 border-primary/10">
                                        {(requirement.has_vat || requirement.has_ait || totals.itemsCostingTotal > 0) && (
                                            <>
                                                <tr>
                                                    <td colSpan={3} className="px-6 py-2 text-right uppercase text-[9px] font-bold text-muted-foreground">Sub-Total</td>
                                                    <td className="px-6 py-2 text-right font-mono text-sm">{formatCurrency(totals.subTotal)}</td>
                                                </tr>
                                                {totals.itemsCostingTotal > 0 && (
                                                    <tr>
                                                        <td colSpan={3} className="px-6 py-2 text-right uppercase text-[9px] font-bold text-muted-foreground">Total Costing</td>
                                                        <td className="px-6 py-2 text-right font-mono text-sm text-muted-foreground">{formatCurrency(totals.itemsCostingTotal)}</td>
                                                    </tr>
                                                )}
                                                {/* {requirement.has_ait && (
                                                    <tr>
                                                        <td colSpan={3} className="px-6 py-2 text-right uppercase text-[9px] font-bold text-muted-foreground">AIT Adjustment ({requirement.ait_percentage}%)</td>
                                                        <td className="px-6 py-2 text-right font-mono text-sm text-muted-foreground">+ {formatCurrency(totals.aitAmount)}</td>
                                                    </tr>
                                                )} */}
                                            </>
                                        )}
                                        <tr>
                                            <td colSpan={3} className="px-6 py-5 text-right uppercase text-[10px] font-black tracking-[0.2em] text-muted-foreground">Grand Total Amount</td>
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
