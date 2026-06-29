import { Head, Link } from "@inertiajs/react";
import {
    User, Calendar, ArrowLeft, MessageSquare,
    Clock, CheckCircle2, Briefcase, Video
} from "lucide-react";
import CustomerInfoCard from "@/components/admin/CustomerInfoCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { cn } from "@/lib/utils";
import type { FollowUp } from "@/types";
import { formatDateTime } from "@/utils/date-format";


export default function Show({ followUp }: { followUp: FollowUp }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: "Follow Ups", href: route("follow-ups.index") },
                { title: `Follow Up Details`, href: "#" }
            ]}
        >
            <Head title={`Follow Up Detail - ${followUp.customer?.name}`} />

            <div className="p-6 max-w-7xl mx-auto space-y-6">

                {/* Header Section - Same as Customer Show */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">Follow Up Details</h1>

                        </div>

                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route('meetings.create', { customer_id: followUp.customer_id, requirement_id: followUp.requirement_id })}>
                                <Video className="w-4 h-4 mr-2" /> Add Meeting
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={route("follow-ups.index")}>
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route("follow-ups.edit", followUp.id)}>
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Summary & Participants (Like Contact Details) */}
                    <div className="lg:col-span-1 space-y-6">

                        {followUp.customer && <CustomerInfoCard customer={followUp.customer} />}

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Stakeholders</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3 border-b pb-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <User className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Customer Contact</p>
                                        <p className="text-sm text-muted-foreground">{followUp.customer?.name}</p>
                                        <div className="flex gap-2 mt-1">
                                            {Array.isArray(followUp.customer?.phones) && followUp.customer.phones.length > 0 && <span className="text-[10px] text-primary bg-primary/5 px-1.5 rounded uppercase font-bold">Call Enabled</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                                        <User className="w-4 h-4 text-secondary-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Assigned Sales Personnel</p>
                                        <p className="text-sm text-muted-foreground">{followUp.user?.name}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>


                    </div>

                    {/* Right Column: Content & Next Steps (Like History/Remarks) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Linked Requirement Card */}
                        {followUp.requirement && (
                            <Card className="border-l-4 border-l-blue-500">
                                <CardHeader>
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-blue-500">
                                        <Briefcase className="w-4 h-4" />
                                        Linked Requirement
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between items-center bg-blue-500/5 p-4 rounded-lg border border-blue-500/20">
                                        <div>
                                            <p className="text-sm font-bold text-foreground">
                                                {followUp.requirement.title || `Requirement #${followUp.requirement.id}`}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Status: <span className="capitalize">{followUp.requirement.status}</span>
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('requirements.show', followUp.requirement.id)}>
                                                View Details
                                            </Link>
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                        <div className="p-3 bg-muted/30 rounded-lg">
                                            <p className="text-muted-foreground mb-1 uppercase font-bold text-[9px]">Grand Total</p>
                                            <p className="font-bold">BDT {Number(followUp.requirement.grand_total).toLocaleString()}</p>
                                        </div>
                                        <div className="p-3 bg-muted/30 rounded-lg">
                                            <p className="text-muted-foreground mb-1 uppercase font-bold text-[9px]">AIT %</p>
                                            <p className="font-bold">{followUp.requirement.ait_percentage}%</p>
                                        </div>
                                        <div className="p-3 bg-muted/30 rounded-lg">
                                            <p className="text-muted-foreground mb-1 uppercase font-bold text-[9px]">VAT %</p>
                                            <p className="font-bold">{followUp.requirement.vat_percentage}%</p>
                                        </div>
                                        <div className="p-3 bg-muted/30 rounded-lg">
                                            <p className="text-muted-foreground mb-1 uppercase font-bold text-[9px]">Validity</p>
                                            <p className="font-bold">{followUp.requirement.price_validity_days} Days</p>
                                        </div>
                                    </div>

                                    {followUp.requirement.items && followUp.requirement.items.length > 0 && (
                                        <div className="border rounded-lg overflow-hidden">
                                            <table className="w-full text-[11px]">
                                                <thead className="bg-muted/50 border-b">
                                                    <tr>
                                                        <th className="px-3 py-2 text-left">Product</th>
                                                        <th className="px-3 py-2 text-center">Qty</th>
                                                        <th className="px-3 py-2 text-right">Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y">
                                                    {followUp.requirement.items.map(item => (
                                                        <tr key={item.id}>
                                                            <td className="px-3 py-2 font-medium">{item.product?.name}</td>
                                                            <td className="px-3 py-2 text-center">{item.quantity} {item.product?.unit?.short_form}</td>
                                                            <td className="px-3 py-2 text-right font-mono">{Number(item.unit_price).toLocaleString()}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}

                        <Card className="overflow-hidden">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Schedule Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                {/* Date Section */}
                                <div className="flex flex-col gap-1 border-l-2 border-primary/20 pl-3">
                                    <span className="text-[10px] font-bold uppercase text-muted-foreground/70">Scheduled Date</span>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-semibold">{formatDateTime(followUp.follow_up_date)}</span>
                                    </div>
                                </div>

                                {/* Status & Priority Row */}
                                <div className="flex flex-wrap items-center gap-3">
                                    {/* Status */}
                                    <Badge
                                        className={cn(
                                            "h-7 px-3 flex items-center gap-1.5 border-none shadow-sm transition-all",
                                            followUp.status === 'purchase'
                                                ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"
                                                : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                                        )}
                                    >
                                        {followUp.status === 'purchase' ? (
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        ) : (
                                            <Clock className="w-3.5 h-3.5" />
                                        )}
                                        <span className="capitalize font-bold text-[11px] tracking-wide">
                                            {followUp.status.replace('_', ' ')}
                                        </span>
                                    </Badge>

                                    {/* Priority Indicator */}
                                    <div className="flex items-center gap-2 px-2.5 py-1 bg-muted/30 rounded-full border border-border">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            followUp.priority === 'high' ? "bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.4)]" :
                                                followUp.priority === 'medium' ? "bg-amber-500" : "bg-blue-500"
                                        )} />
                                        <span className="text-[10px] font-bold uppercase text-muted-foreground">
                                            {followUp.priority}
                                        </span>
                                    </div>
                                </div>

                                {/* Completion Info */}
                                {followUp.completed_at && (
                                    <div className="flex flex-col gap-2 p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/20 group">
                                        <div className="flex items-center gap-2">
                                            <div className="bg-emerald-500 rounded-full p-0.5">
                                                <CheckCircle2 className="w-3 h-3 text-white" />
                                            </div>
                                            <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-tight">Execution Time</p>
                                        </div>
                                        <p className="text-xs font-medium text-emerald-600/80 ml-5">
                                            Completed on <span className="text-foreground font-bold">{formatDateTime(followUp.completed_at)}</span>
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Discussion/Notes Section */}
                        <Card className="min-h-62.5 flex flex-col">
                            <CardHeader className=" flex justify-center bg-muted/20 border-b px-6 -mt-6">
                                <CardTitle className="flex items-center gap-2  py-4">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    Meeting / Discussion Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 flex-1 italic text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {followUp.notes || "No detailed notes were recorded for this activity."}
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
