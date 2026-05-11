import { Calendar, Clock, MapPin } from 'lucide-react';
import { Meeting } from '@/types/index';
import { InlineStatusUpdate } from '@/components/table/InlineStatusUpdate';
import { MEETING_STATUS_OPTIONS } from '@/pages/Meetings/Columns';

function MeetingList({ meetings }: { meetings: Meeting[] }) {
    if (meetings.length === 0) {
        return (
            <div className="flex h-40 flex-col items-center justify-center text-muted-foreground">
                <Calendar className="mb-2 h-8 w-8 opacity-20" />
                <p className="text-sm">No upcoming meetings</p>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="space-y-6">
            {meetings.map((meeting) => (
                <div key={meeting.id} className="group flex gap-4">
                    {/* Date Box */}
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary/5 text-primary border border-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
                        <span className="text-[10px] font-bold uppercase leading-none">
                            {new Date(meeting.scheduled_at).toLocaleDateString('en-GB', { month: 'short' })}
                        </span>
                        <span className="text-xl font-bold leading-tight">
                            {new Date(meeting.scheduled_at).getDate()}
                        </span>
                    </div>

                    {/* Meeting Info */}
                    <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                        <div className='flex items-center justify-between gap-2'>
                            <h4 className="truncate text-sm font-semibold text-foreground">
                                {meeting.title}
                            </h4>
                            <InlineStatusUpdate
                                id={meeting.id}
                                currentStatus={meeting.status}
                                routeName="meetings.update-status"
                                options={MEETING_STATUS_OPTIONS}
                            />
                        </div>
                        <div className="flex flex-col gap-0.5">
                            <span className="flex items-center text-[11px] text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                {formatTime(meeting.scheduled_at)}
                            </span>
                            <span className="flex items-center text-[11px] text-muted-foreground truncate">
                                <MapPin className="mr-1 h-3 w-3" />
                                {meeting.customer?.company?.name || 'No Location'}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MeetingList;
