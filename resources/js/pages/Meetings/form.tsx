import { useForm } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import FormLabel from "@/components/admin/form/FormLabel";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/contexts/ModalContext";
import type { Company, CustomerType, Meeting, Requirement, User } from "@/types";

interface Props {
    meeting?: Meeting;
    customers: CustomerType[];
    requirements: Requirement[];
    users: User[];
    companies: Company[];
}

export default function MeetingForm({ meeting, customers: initialCustomers, requirements, users, companies }: Props) {
    const { openModal } = useModal();
    const [customers, setCustomers] = useState<CustomerType[]>(initialCustomers);
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedCustomerId = urlParams.get('customer_id');
    const preSelectedRequirementId = urlParams.get('requirement_id');


    const { data, setData, post, put, processing, errors } = useForm({
        customer_id: meeting?.customer_id || (preSelectedCustomerId ? parseInt(preSelectedCustomerId) : ""),
        requirement_id: meeting?.requirement_id || (preSelectedRequirementId ? parseInt(preSelectedRequirementId) : ""),
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

    const filteredRequirements = data.customer_id
        ? requirements.filter(r => r.customer_id === data.customer_id)
        : requirements;

    return (
        <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1">
                <GenericCombobox
                    required
                    label="Customer"
                    items={customers.map(c => ({ ...c, name: c.full_name_with_company || c.name }))}
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
                    error={errors.customer_id}
                    renderAction={
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={(e) => {
                                e.stopPropagation();
                                openModal('CREATE_CUSTOMER', {
                                    users: users,
                                    companies: companies,
                                    onSuccess: (customer: CustomerType) => {
                                        setCustomers(prev => [...prev, customer]);
                                        setData("customer_id", customer.id);
                                    }
                                });
                            }}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    }
                />
            </div>

            <div className="space-y-1">
                <GenericCombobox
                    label="Requirement (Optional)"
                    items={filteredRequirements.map(r => ({ ...r, name: r.title || `Requirement #${r.id}` }))}
                    selectedId={data.requirement_id}
                    onSelect={(id, name, req) => {
                        setData("requirement_id", id as number);
                        // If requirement is selected, auto-select the customer
                        if (id && req) {
                            if (req.customer_id !== data.customer_id) {
                                setData(d => ({ ...d, requirement_id: id as number, customer_id: req.customer_id }));
                            }
                        }
                    }}
                    placeholder="Select Requirement"
                    searchPlaceholder="Search requirements..."
                    allowManualInput={false}
                    error={errors.requirement_id}

                />
            </div>

            <div>
                <FormLabel required>Title</FormLabel>
                <Input
                    placeholder="Meeting Title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                />
                <ErrorMessage message={errors.title} />
            </div>

            <div>
                <FormLabel required>Schedule Date Time</FormLabel>
                <Input
                    type="datetime-local"
                    value={data.scheduled_at}
                    onChange={(e) => setData("scheduled_at", e.target.value)}
                />
                <ErrorMessage message={errors.scheduled_at} />
            </div>

            <div>
                <FormLabel required>Meeting Type</FormLabel>
                <Select
                    value={data.meeting_type}
                    onValueChange={(value) => setData("meeting_type", value as Meeting['meeting_type'])}
                >
                    <SelectTrigger className={errors.meeting_type ? "border-destructive" : ""}>
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
                    <FormLabel required>Location</FormLabel>
                    <Input
                        placeholder="Location"
                        value={data.location}
                        onChange={(e) => setData("location", e.target.value)}
                    />
                    <ErrorMessage message={errors.location} />
                </div>
            )}

            <div>
                <FormLabel>Agenda</FormLabel>
                <Textarea
                    placeholder="Meeting Agenda"
                    value={data.agenda}
                    onChange={(e) => setData("agenda", e.target.value)}
                />
                <ErrorMessage message={errors.agenda} />
            </div>

            <div>
                <FormLabel required>Status</FormLabel>
                <Select
                    value={data.status}
                    onValueChange={(value) => setData("status", value as Meeting['status'])}
                >
                    <SelectTrigger className={errors.status ? "border-destructive" : ""}>
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
