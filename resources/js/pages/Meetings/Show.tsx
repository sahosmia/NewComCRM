import { Link, Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Badge } from "@/components/ui/badge";
import CustomerInfoCard from "@/components/admin/CustomerInfoCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Calendar, MapPin, ClipboardList,
    MessageSquare, Clock
} from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";

export default function Show({ meeting }: any) {
    const breadcrumbs = [
        { title: "Meetings", href: route('meetings.index') },
        { title: "Detail View", href: "#" }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Meeting: ${meeting.title}`} />

            <div className="p-6 max-w-7xl mx-auto space-y-6">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold tracking-tight">{meeting.title}</h1>
                            <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                                Meeting ID: #{meeting.id}
                            </Badge>
                            <StatusBadge status={meeting.status} className="shadow-sm" />

                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(meeting.scheduled_at).toLocaleString()}
                            </div>
                            {meeting.location && (
                                <div className="flex items-center gap-1 text-primary font-medium">
                                    <MapPin className="w-4 h-4" />
                                    {meeting.location}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route("meetings.index")}>
                                Back
                            </Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href={route("meetings.edit", meeting.id)}>
                                Edit
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Customer & Contact */}
                    <div className="lg:col-span-1 space-y-6">
                        <CustomerInfoCard customer={meeting.customer} />

                        {/* Quick Stats or Meta (Optional) */}
                        <Card className="bg-muted/20 border-dashed">
                            <CardContent className="pt-6">
                                <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-2">Created By</div>
                                <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">
                                        {meeting.user?.name?.substring(0, 2).toUpperCase() || 'AD'}
                                    </div>
                                    <span className="text-sm font-medium">{meeting.user?.name || 'Admin'}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Agenda & Notes */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Agenda Card */}
                        <Card className="border-l-4 border-l-amber-500">
                            <CardHeader>
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-amber-600">
                                    <ClipboardList className="w-4 h-4" />
                                    Meeting Agenda
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-amber-50/30 p-4 rounded-lg border border-amber-100/50 min-h-[100px]">
                                    <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
                                        {meeting.agenda || "No agenda specified for this meeting."}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Discussion Notes Card */}
                        <Card className="border-l-4 border-l-primary flex-1">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-primary">
                                    <MessageSquare className="w-4 h-4" />
                                    Discussion Notes
                                </CardTitle>
                                <Clock className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-sm max-w-none text-muted-foreground leading-7 whitespace-pre-wrap">
                                    {meeting.notes ? (
                                        meeting.notes
                                    ) : (
                                        <div className="italic py-8 text-center border-2 border-dashed rounded-lg">
                                            No notes recorded yet.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
