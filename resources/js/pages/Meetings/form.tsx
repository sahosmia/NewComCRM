import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Meeting } from "@/types/metting";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";

interface Props {
    meeting?: Meeting;
    customers: { id: number; name: string; full_name_with_company?: string }[];
}

export default function MeetingForm({ meeting, customers }: Props) {
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedCustomerId = urlParams.get('customer_id');


    const { data, setData, post, put, processing, errors } = useForm({
        customer_id: meeting?.customer_id || (preSelectedCustomerId ? parseInt(preSelectedCustomerId) : ""),
        title: meeting?.title || "",
        scheduled_at: meeting?.scheduled_at ? new Date(meeting.scheduled_at).toISOString().slice(0, 16) : "",
        meeting_type: meeting?.meeting_type || "virtual",
        location: meeting?.location || "",
        agenda: meeting?.agenda || "",
        notes: meeting?.notes || "",
        status: meeting?.status || "scheduled",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (meeting) {
            put(route("meetings.update", meeting.id));
        } else {
            post(route("meetings.store"));
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1">
                <GenericCombobox
                    label="Customer"
                    items={customers.map(c => ({ id: c.id, name: c.full_name_with_company || c.name }))}
                    selectedId={data.customer_id}
                    onSelect={(id) => setData("customer_id", id as number)}
                    placeholder="Select Customer"
                    searchPlaceholder="Search customers..."
                    allowManualInput={false}
                />
                <ErrorMessage message={errors.customer_id} />
            </div>

            <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                    placeholder="Meeting Title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                />
                <ErrorMessage message={errors.title} />
            </div>

            <div>
                <label className="text-sm font-medium">Schedule Date Time</label>
                <Input
                    type="datetime-local"
                    value={data.scheduled_at}
                    onChange={(e) => setData("scheduled_at", e.target.value)}
                />
                <ErrorMessage message={errors.scheduled_at} />
            </div>

            <div>
                <label className="text-sm font-medium">Meeting Type</label>
                <Select
                    value={data.meeting_type}
                    onValueChange={(value: any) => setData("meeting_type", value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="virtual">Virtual</SelectItem>
                        <SelectItem value="physical">Physical</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                    </SelectContent>
                </Select>
                <ErrorMessage message={errors.meeting_type} />
            </div>

            {data.meeting_type === 'physical' && (
                <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input
                        placeholder="Location"
                        value={data.location}
                        onChange={(e) => setData("location", e.target.value)}
                    />
                    <ErrorMessage message={errors.location} />
                </div>
            )}

            <div>
                <label className="text-sm font-medium">Agenda</label>
                <Textarea
                    placeholder="Meeting Agenda"
                    value={data.agenda}
                    onChange={(e) => setData("agenda", e.target.value)}
                />
                <ErrorMessage message={errors.agenda} />
            </div>

            <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                    value={data.status}
                    onValueChange={(value: any) => setData("status", value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
                <ErrorMessage message={errors.status} />
            </div>

            <Button type="submit" disabled={processing}>
                {meeting ? "Update" : "Schedule"}
            </Button>
        </form>
    );
}
