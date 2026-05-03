import AppLayout from "@/layouts/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, Phone, MapPin, User, Calendar, Edit, ArrowLeft, MessageSquare, LayoutList, Plus } from "lucide-react";
import { Head, Link } from "@inertiajs/react";
import { Customer } from "@/types/customer";
import { Requirement } from "@/types/requirement";
import { FollowUp } from "@/types/follow-up";

export default function Show({ customer }: { customer: Customer & { requirements: Requirement[], follow_ups: FollowUp[] } }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: "Customers", href: route("customers.index") },
                { title: customer.name, href: "#" }
            ]}
        >
            <Head title={`${customer.name} - Customers`} />

            <div className="p-6 max-w-7xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{customer.name}</h1>
                            <Badge className="capitalize">{customer.status}</Badge>
                            <Badge variant="outline" className="capitalize">{customer.type}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">{customer.designation} at <span className="font-semibold text-foreground">{customer.company?.name || 'N/A'}</span></p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={route("customers.index")}>
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route("customers.edit", customer.id)}>
                                <Edit className="w-4 h-4 mr-2" /> Edit Profile
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Contact Details */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium uppercase text-muted-foreground tracking-wider">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 mt-1 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium">Email</p>
                                        <p className="text-sm text-muted-foreground">{customer.email || 'N/A'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 mt-1 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium">Phone Numbers</p>
                                        <div className="space-y-1 mt-1">
                                            {customer.phones?.map((p: string, i: number) => (
                                                <p key={i} className="text-sm text-muted-foreground flex items-center gap-2">

                                                    <a href={`https://wa.me/88${p.replace(/\D/g, '')}`} target="_blank" className="text-emerald-500 hover:underline text-sm font-bold">{p}</a>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="w-4 h-4 mt-1 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium">Addresses</p>
                                        <div className="space-y-2 mt-1">
                                            {customer.addresses?.map((a: string, i: number) => (
                                                <p key={i} className="text-sm text-muted-foreground italic border-l-2 pl-2 border-primary/20">{a}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium uppercase text-muted-foreground">Internal Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="w-4 h-4 text-primary" />
                                    <p className="text-sm font-medium">Assigned To: <span className="text-muted-foreground ml-1">{customer.assigned_user?.name}</span></p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <p className="text-sm font-medium">Created: <span className="text-muted-foreground ml-1">{new Date(customer.created_at).toLocaleDateString()}</span></p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    Internal Remarks
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-muted/30 p-4 rounded-lg border italic text-sm text-muted-foreground min-h-[100px]">
                                    {customer.remarks || "No internal notes added yet."}
                                </div>


                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Remarks & Activity */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Requirements Section */}
                        <Card className="overflow-hidden">
                            <CardHeader className="bg-muted/20 flex flex-row justify-between items-center py-4">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <LayoutList className="w-5 h-5 text-primary" />
                                    Requirement History
                                </CardTitle>
                                <Button size="sm" asChild>
                                    <Link href={route("requirements.create", { customer_id: customer.id })}>
                                        <Plus className="w-4 h-4 mr-1" /> New Requirement
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-muted/50 text-muted-foreground uppercase text-[10px] font-bold">
                                            <tr>
                                                <th className="px-4 py-3">ID</th>
                                                <th className="px-4 py-3">Date</th>
                                                <th className="px-4 py-3">Total Amount</th>
                                                <th className="px-4 py-3">Status</th>
                                                <th className="px-4 py-3 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {customer.requirements?.length > 0 ? (
                                                customer.requirements.map((req) => (
                                                    <tr key={req.id} className="hover:bg-muted/30 transition-colors">
                                                        <td className="px-4 py-3 font-medium">#{req.id}</td>
                                                        <td className="px-4 py-3 text-muted-foreground">
                                                            {new Date(req.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-4 py-3 font-bold">
                                                            ৳ {parseFloat(req.grand_total as string).toLocaleString()}
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <Badge variant="secondary" className={`
                                        capitalize font-normal
                                        ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                                        ${req.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                                        ${req.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                                    `}>
                                                                {req.status}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-4 py-3 text-right">
                                                            <Button variant="ghost" size="sm" asChild>
                                                                <Link href={route("requirements.show", req.id)}>View</Link>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="text-center py-10 text-muted-foreground">
                                                        No requirements found for this customer.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>




                        {/* Activities Placeholder */}
                        <Card>
                            <CardHeader className="flex flex-row justify-between items-center py-4">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-primary" />
                                    Follow-up History
                                </CardTitle>
                                <Button size="sm" variant="outline" asChild>
                                    <Link href={route("follow-ups.create", { customer_id: customer.id })}>
                                        <Plus className="w-4 h-4 mr-1" /> Log Follow-up
                                    </Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                {customer.follow_ups?.length > 0 ? (
                                    <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
                                        {customer.follow_ups.map((fu) => (
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
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
