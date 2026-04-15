import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Badge } from "@/components/ui/badge";

export default function Show({ followUp }: any) {
    const breadcrumbs = [
        { title: "Follow Ups", href: route('follow-ups.index') },
        { title: `Follow Up Details`, href: route('follow-ups.show', followUp.id) }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6 max-w-2xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold">Follow Up Details</h1>
                    <Link href={route("follow-ups.edit", followUp.id)}>
                        <Button variant="outline">Edit</Button>
                    </Link>
                </div>

                <div className="bg-card p-6 border rounded-lg shadow-sm space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Customer</h3>
                            <p>{followUp.customer?.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Assigned User</h3>
                            <p>{followUp.user?.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Follow Up Date</h3>
                            <p>{new Date(followUp.follow_up_date).toLocaleString()}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
                            <Badge variant={followUp.priority === 'high' ? 'destructive' : followUp.priority === 'medium' ? 'default' : 'secondary'} className="capitalize">
                                {followUp.priority}
                            </Badge>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                            <Badge variant="outline" className="capitalize">
                                {followUp.status.replace('_', ' ')}
                            </Badge>
                        </div>
                        {followUp.completed_at && (
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Completed At</h3>
                                <p>{new Date(followUp.completed_at).toLocaleString()}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                        <p className="whitespace-pre-wrap">{followUp.notes}</p>
                    </div>
                    {followUp.next_follow_up && (
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Next Follow Up</h3>
                            <p>{new Date(followUp.next_follow_up).toLocaleString()}</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
