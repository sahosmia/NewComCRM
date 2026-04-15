import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Badge } from "@/components/ui/badge";

export default function Show({ meeting }: any) {
    const breadcrumbs = [
        { title: "Meetings", href: route('meetings.index') },
        { title: meeting.title, href: route('meetings.show', meeting.id) }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">{meeting.title}</h1>
                    <Link href={route("meetings.edit", meeting.id)}>
                        <Button variant="outline">Edit</Button>
                    </Link>
                </div>

                <div className="bg-card p-6 border rounded-lg shadow-sm space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Customer</h3>
                            <p>{meeting.customer?.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Organizer</h3>
                            <p>{meeting.user?.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Start Time</h3>
                            <p>{new Date(meeting.start_time).toLocaleString()}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">End Time</h3>
                            <p>{new Date(meeting.end_time).toLocaleString()}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                            <Badge variant="outline" className="capitalize">
                                {meeting.meeting_type}
                            </Badge>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                            <Badge variant={meeting.status === 'scheduled' ? 'default' : meeting.status === 'completed' ? 'success' : 'destructive'} className="capitalize">
                                {meeting.status}
                            </Badge>
                        </div>
                    </div>
                    {meeting.location && (
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                            <p>{meeting.location}</p>
                        </div>
                    )}
                    {meeting.agenda && (
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Agenda</h3>
                            <p className="whitespace-pre-wrap">{meeting.agenda}</p>
                        </div>
                    )}
                    {meeting.notes && (
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                            <p className="whitespace-pre-wrap">{meeting.notes}</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
