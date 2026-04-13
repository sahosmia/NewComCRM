import AppLayout from "@/layouts/app-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, Phone, MapPin, User, Calendar, Edit, ArrowLeft, MessageSquare } from "lucide-react";
import { Head, Link } from "@inertiajs/react";
import type { UserType } from "@/types";

export default function Show({ user }: { user: any }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: "Users", href: route("users.index") },
                { title: user.name, href: "#" }
            ]}
        >
            <Head title={`${user.name} - users`} />

            <div className="p-6 max-w-7xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <Badge className="capitalize">{user.status}</Badge>
                            <Badge variant="outline" className="capitalize">{user.type}</Badge>
                        </div>
                        <p className="text-muted-foreground mt-1">{user.designation} at <span className="font-semibold text-foreground">{user.company_name}</span></p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={route("users.index")}>
                                <ArrowLeft className="w-4 h-4 mr-2" /> Back
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href={route("users.edit", user.id)}>
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
                                        <p className="text-sm text-muted-foreground">{user.email || 'N/A'}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 mt-1 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium">Phone Numbers</p>
                                        <div className="space-y-1 mt-1">
                                            {user.phones?.map((p: string, i: number) => (
                                                <p key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                                    {p}
                                                    <a href={`https://wa.me/88${p.replace(/\D/g, '')}`} target="_blank" className="text-emerald-500 hover:underline text-[10px] font-bold">WhatsApp</a>
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
                                            {user.addresses?.map((a: string, i: number) => (
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
                                    <p className="text-sm font-medium">Assigned To: <span className="text-muted-foreground ml-1">{user.assigned_user?.name}</span></p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <p className="text-sm font-medium">Created: <span className="text-muted-foreground ml-1">{new Date(user.created_at).toLocaleDateString()}</span></p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Remarks & Activity */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    Internal Remarks
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-muted/30 p-4 rounded-lg border italic text-sm text-muted-foreground min-h-[100px]">
                                    {user.remarks || "No internal notes added yet."}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Activities Placeholder */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activities</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-center text-muted-foreground py-10">Follow-ups and Meetings timeline will appear here.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
