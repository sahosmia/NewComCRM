import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { Meeting } from '@/types';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

function MeetingList({ meetings, emptyMessage = "No upcoming meetings" }: { meetings: Meeting[], emptyMessage?: string }) {
    if (meetings.length === 0) {
        return (
            <div className="flex h-40 flex-col items-center justify-center text-muted-foreground">
                <Calendar className="mb-2 h-8 w-8 opacity-20" />
                <p className="text-sm italic">{emptyMessage}</p>
            </div>
        );
    }

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="space-y-4">
            {meetings.map((meeting) => (
                <div key={meeting.id} className="group flex items-center justify-between p-3 border rounded-xl hover:bg-muted/40 transition-all duration-200">
                   <div className="flex gap-4 overflow-hidden">
                        {/* Date Box */}
                        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/5 text-primary border border-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
                            <span className="text-[10px] font-bold uppercase leading-none">
                                {new Date(meeting.scheduled_at).toLocaleDateString('en-GB', { month: 'short' })}
                            </span>
                            <span className="text-lg font-bold leading-tight">
                                {new Date(meeting.scheduled_at).getDate()}
                            </span>
                        </div>

                        {/* Meeting Info */}
                        <div className="flex flex-col gap-0.5 overflow-hidden">
                            <h4 className="truncate text-sm font-semibold text-foreground">
                                {meeting.title}
                            </h4>
                            <div className="flex flex-col gap-0.5">
                                <span className="flex items-center text-[11px] text-muted-foreground">
                                    <Clock className="mr-1 h-3 w-3" />
                                    {formatTime(meeting.scheduled_at)}
                                </span>
                                <span className="flex items-center text-[11px] text-muted-foreground truncate">
                                    <MapPin className="mr-1 h-3 w-3" />
                                    {meeting.customer?.name || 'No Customer'}
                                </span>
                            </div>
                        </div>
                   </div>

                    <Link href={`/meetings/${meeting.id}`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default MeetingList;
