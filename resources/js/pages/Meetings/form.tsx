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
import ErrorMessage from "@/components/admin/ErrorMessage";

interface Props {
    meeting?: Meeting;
    customers: { id: number; name: string }[];
}

export default function MeetingForm({ meeting, customers }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        customer_id: meeting?.customer_id || "",
        title: meeting?.title || "",
        start_time: meeting?.start_time ? new Date(meeting.start_time).toISOString().slice(0, 16) : "",
        end_time: meeting?.end_time ? new Date(meeting.end_time).toISOString().slice(0, 16) : "",
        meeting_type: meeting?.meeting_type || "physical",
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
            <div>
                <label className="text-sm font-medium">Customer</label>
                <Select
                    value={data.customer_id.toString()}
                    onValueChange={(value) => setData("customer_id", parseInt(value))}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Customer" />
                    </SelectTrigger>
                    <SelectContent>
                        {customers.map((customer: any) => (
                            <SelectItem key={customer.id} value={customer.id.toString()}>
                                {customer.full_name_with_company || customer.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium">Start Time</label>
                    <Input
                        type="datetime-local"
                        value={data.start_time}
                        onChange={(e) => setData("start_time", e.target.value)}
                    />
                    <ErrorMessage message={errors.start_time} />
                </div>
                <div>
                    <label className="text-sm font-medium">End Time</label>
                    <Input
                        type="datetime-local"
                        value={data.end_time}
                        onChange={(e) => setData("end_time", e.target.value)}
                    />
                    <ErrorMessage message={errors.end_time} />
                </div>
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
                        <SelectItem value="physical">Physical</SelectItem>
                        <SelectItem value="virtual">Virtual</SelectItem>
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
