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
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";
import { CustomerType, FollowUp } from "@/types";

interface Props {
    followUp?: FollowUp;
    customers: CustomerType[];
    requirements: { id: number; title: string | null; customer_id: number }[];
}

export default function FollowUpForm({ followUp, customers, requirements }: Props) {
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedCustomerId = urlParams.get('customer_id');
    const preSelectedRequirementId = urlParams.get('requirement_id');

    const { data, setData, post, put, processing, errors } = useForm<{
        customer_id: number | string;
        requirement_id: number | string;
        follow_up_date: string;
        notes: string;
        status: string;
        priority: string;
    }>({
        customer_id: followUp?.customer_id || (preSelectedCustomerId ? parseInt(preSelectedCustomerId) : ""),
        requirement_id: followUp?.requirement_id || (preSelectedRequirementId ? parseInt(preSelectedRequirementId) : ""),
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

    const filteredRequirements = data.customer_id
        ? requirements.filter(r => r.customer_id === data.customer_id)
        : requirements;

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1">
                <GenericCombobox
                    label="Customer"
                    items={customers.map(c => ({ id: c.id, name: c.full_name_with_company || c.name }))}
                    selectedId={data.customer_id}
                    onSelect={(id) => {
                        setData("customer_id", id as number);
                        if (data.requirement_id) {
                            const req = requirements.find(r => r.id === data.requirement_id);
                            if (req && req.customer_id !== id) {
                                setData(d => ({ ...d, customer_id: id as number, requirement_id: "" }));
                            }
                        }
                    }}
                    placeholder="Select Customer"
                    searchPlaceholder="Search customers..."
                    allowManualInput={false}
                />
                <ErrorMessage message={errors.customer_id} />
            </div>

            <div className="space-y-1">
                <GenericCombobox
                    label="Requirement (Optional)"
                    items={filteredRequirements.map(r => ({ id: r.id, name: r.title || `Requirement #${r.id}` }))}
                    selectedId={data.requirement_id}
                    onSelect={(id) => {
                        setData("requirement_id", id as number);
                        if (id) {
                            const req = requirements.find(r => r.id === id);
                            if (req && req.customer_id !== data.customer_id) {
                                setData(d => ({ ...d, requirement_id: id as number, customer_id: req.customer_id }));
                            }
                        }
                    }}
                    placeholder="Select Requirement"
                    searchPlaceholder="Search requirements..."
                    allowManualInput={false}
                />
                <ErrorMessage message={errors.requirement_id} />
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
