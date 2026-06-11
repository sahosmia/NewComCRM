import { useForm, usePage } from "@inertiajs/react";
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
import type { Company, CustomerType, FollowUp, Requirement, User } from "@/types";
import CRMAssignmentSection from "@/components/admin/form/CRMAssignmentSection";

interface Props {
    followUp?: FollowUp;
    customers: CustomerType[];
    requirements: Requirement[];
    users: User[];
    companies: Company[];
}

export default function FollowUpForm({ followUp, customers: initialCustomers, requirements, users, companies }: Props) {
    const { auth } = usePage().props as any;
    const isSuperAdmin = auth.user.role === 'super_admin';

    const { openModal } = useModal();
    const [customers, setCustomers] = useState<CustomerType[]>(initialCustomers);

    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedCustomerId = urlParams.get('customer_id');
    const preSelectedRequirementId = urlParams.get('requirement_id');

    const { data, setData, post, put, processing, errors } = useForm<{
        user_id: number;
        customer_id: number | string;
        requirement_id: number | string;
        follow_up_date: string;
        notes: string;
        status: string;
        priority: string;
    }>({
        user_id: followUp?.user_id || auth.user.id,
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
            <CRMAssignmentSection
                isSuperAdmin={isSuperAdmin}
                users={users}
                customers={customers}
                requirements={requirements}
                companies={companies}
                data={data}
                setData={setData}
                setCustomers={setCustomers}
                errors={errors}
            />

            <div>
                <FormLabel required>Follow Up Date</FormLabel>
                <Input
                    type="datetime-local"
                    value={data.follow_up_date}
                    onChange={(e) => setData("follow_up_date", e.target.value)}
                />
                <ErrorMessage message={errors.follow_up_date} />

            </div>

            <div>
                <FormLabel required>Status</FormLabel>
                <Select
                    value={data.status}
                    onValueChange={(value) => setData("status", value)}
                >
                    <SelectTrigger className={errors.status ? "border-destructive" : ""}>
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
                <FormLabel required>Priority</FormLabel>
                <Select
                    value={data.priority}
                    onValueChange={(value) => setData("priority", value)}
                >
                    <SelectTrigger className={errors.priority ? "border-destructive" : ""}>
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
                <FormLabel>Notes</FormLabel>
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
