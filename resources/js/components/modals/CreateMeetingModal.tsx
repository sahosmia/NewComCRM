import { usePage } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ErrorMessage from '@/components/admin/form/ErrorMessage';
import FormLabel from '@/components/admin/form/FormLabel';
import { GenericCombobox } from '@/components/admin/form/GenericCombobox';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useModalForm } from '@/hooks/use-modal-form';
import type { SharedData, Meeting, CustomerType } from '@/types';
import type { CreateMeetingModalProps } from '@/types/modals';
import CRMAssignmentSection from '../admin/form/CRMAssignmentSection';

export default function CreateMeetingModal({
    isOpen,
    onClose,
    onSuccess,
    customer_id,
    requirement_id,
    user_id,
    customers = [],
    requirements = [],
    users = []
}: CreateMeetingModalProps) {
    const { props: sharedProps } = usePage<SharedData>();
    const { auth } = sharedProps;
    const isSuperAdmin = auth.user.role === 'super_admin';

    // Fallback to shared props if not provided via direct props
    const availableCustomers = customers.length > 0 ? customers : (sharedProps.customers || []);
    const availableRequirements = requirements.length > 0 ? requirements : (sharedProps.requirements || []);
    const availableUsers = users.length > 0 ? users : (sharedProps.users || []);

    const availableCompanies = sharedProps.companies || [];
    const [localCustomers, setLocalCustomers] = useState<CustomerType[]>(availableCustomers);
    useEffect(() => {
        if (availableCustomers.length > 0) {
            setLocalCustomers(availableCustomers);
        }
    }, [customers, sharedProps.customers]);
    const { data, setData, submit, processing, errors, reset } = useModalForm({
    customer_id: customer_id || "",
            user_id: user_id || auth.user.id,

        requirement_id: requirement_id || "",
        title: "",
        scheduled_at: "",
        meeting_type: "virtual" as Meeting['meeting_type'],
        location: "",
        agenda: "",
        notes: "",
        status: "scheduled" as Meeting['status'],
         }, route('meetings.store'), {
        onSuccess: (meeting: Meeting) => {
            if (onSuccess) onSuccess(meeting);
            onClose();
        }
    });

    useEffect(() => {
        if (isOpen) {
            if (customer_id) setData('customer_id', customer_id);
            if (requirement_id) setData('requirement_id', requirement_id);
        }
    }, [isOpen, customer_id, requirement_id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit();
    };

    const filteredRequirements = data.customer_id
        ? availableRequirements.filter(r => r.customer_id === Number(data.customer_id))
        : availableRequirements;

    return (

        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Schedule Meeting</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                        <CRMAssignmentSection
                            isSuperAdmin={isSuperAdmin}
                            users={availableUsers}
                            customers={localCustomers}
                            requirements={availableRequirements}
                            companies={availableCompanies}
                            data={data}
                            setData={setData}
                            setCustomers={setLocalCustomers}
                            errors={errors}
                        />
                    </div>

                    <div className="space-y-2">
                        <FormLabel required>Title</FormLabel>
                        <Input
                            placeholder="Meeting Title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        <ErrorMessage message={errors.title} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <FormLabel required>Schedule Date Time</FormLabel>
                            <Input
                                type="datetime-local"
                                value={data.scheduled_at}
                                onChange={(e) => setData("scheduled_at", e.target.value)}
                            />
                            <ErrorMessage message={errors.scheduled_at} />
                        </div>
                        <div className="space-y-2">
                            <FormLabel required>Meeting Type</FormLabel>
                            <Select
                                value={data.meeting_type}
                                onValueChange={(value) => setData("meeting_type", value as Meeting['meeting_type'])}
                            >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="virtual">Virtual</SelectItem>
                                    <SelectItem value="physical">Physical</SelectItem>
                                    <SelectItem value="phone">Phone</SelectItem>
                                </SelectContent>
                            </Select>
                            <ErrorMessage message={errors.meeting_type} />
                        </div>
                    </div>

                    {data.meeting_type === 'physical' && (
                        <div className="space-y-2">
                            <FormLabel required>Location</FormLabel>
                            <Input
                                placeholder="Location"
                                value={data.location}
                                onChange={(e) => setData("location", e.target.value)}
                            />
                            <ErrorMessage message={errors.location} />
                        </div>
                    )}

                    <div className="space-y-2">
                        <FormLabel>Agenda</FormLabel>
                        <Textarea
                            placeholder="Meeting Agenda"
                            value={data.agenda}
                            onChange={(e) => setData("agenda", e.target.value)}
                        />
                        <ErrorMessage message={errors.agenda} />
                    </div>

                    <div className="space-y-2">
                        <FormLabel>Status</FormLabel>
                        <Select
                            value={data.status}
                            onValueChange={(value) => setData("status", value as Meeting['status'])}
                        >
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="scheduled">Scheduled</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                        <ErrorMessage message={errors.status} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Schedule Meeting'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
