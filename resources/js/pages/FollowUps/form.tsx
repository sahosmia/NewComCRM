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
import type { FollowUp } from "@/types/follow-up";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";

interface Props {
    followUp?: FollowUp;
    customers: { id: number; name: string; full_name_with_company?: string }[];
}

export default function FollowUpForm({ followUp, customers }: Props) {
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedCustomerId = urlParams.get('customer_id');

    const { data, setData, post, put, processing, errors } = useForm<{
        customer_id: number | string;
        follow_up_date: string;
        notes: string;
        status: string;
        priority: string;
    }>({
        customer_id: followUp?.customer_id || (preSelectedCustomerId ? parseInt(preSelectedCustomerId) : ""),
        follow_up_date: followUp?.follow_up_date ? new Date(followUp.follow_up_date).toISOString().slice(0, 16) : "",
        notes: followUp?.notes || "",
        status: followUp?.status || "pending",
        priority: followUp?.priority || "medium",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (followUp) {
            put(route("follow-ups.update", followUp.id));
        } else {
            post(route("follow-ups.store"));
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
                <label className="text-sm font-medium">Follow Up Date</label>
                <Input
                    type="datetime-local"
                    value={data.follow_up_date}
                    onChange={(e) => setData("follow_up_date", e.target.value)}
                />
                <ErrorMessage message={errors.follow_up_date}/>

            </div>

            <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                    value={data.status}
                    onValueChange={(value) => setData("status", value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                </Select>
                <ErrorMessage message={errors.status} />

            </div>

            <div>
                <label className="text-sm font-medium">Priority</label>
                <Select
                    value={data.priority}
                    onValueChange={(value) => setData("priority", value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                </Select>
                <ErrorMessage message={errors.priority} />
            </div>

            <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                    value={data.notes}
                    onChange={(e) => setData("notes", e.target.value)}
                />
                <ErrorMessage message={errors.notes} />

            </div>

            <Button type="submit" disabled={processing}>
                {followUp ? "Update" : "Schedule"}
            </Button>
        </form>
    );
}
