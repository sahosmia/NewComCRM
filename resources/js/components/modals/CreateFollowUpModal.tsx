import React, { useEffect } from 'react';
import { useForm, router, usePage } from '@inertiajs/react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import ErrorMessage from '@/components/admin/form/ErrorMessage';
import { GenericCombobox } from '@/components/admin/form/GenericCombobox';
import { SharedData, FollowUp } from '@/types';
import { CreateFollowUpModalProps } from '@/types/modals';

export default function CreateFollowUpModal({ 
    isOpen, 
    onClose, 
    onSuccess, 
    customer_id, 
    requirement_id,
    customers = [],
    requirements = [] 
}: CreateFollowUpModalProps) {
    const { props: sharedProps } = usePage<SharedData>();
    
    const availableCustomers = customers.length > 0 ? customers : (sharedProps.customers || []);
    const availableRequirements = requirements.length > 0 ? requirements : (sharedProps.requirements || []);

    const { data, setData, post, processing, errors, reset } = useForm({
        customer_id: customer_id || "",
        requirement_id: requirement_id || "",
        follow_up_date: "",
        notes: "",
        status: "pending" as FollowUp['status'],
        priority: "medium" as FollowUp['priority'],
    });

    useEffect(() => {
        if (isOpen) {
            if (customer_id) setData('customer_id', customer_id);
            if (requirement_id) setData('requirement_id', requirement_id);
        }
    }, [isOpen, customer_id, requirement_id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('follow-ups.store'), {
            onSuccess: () => {
                const newId = sharedProps.flash.new_id;
                router.reload({ only: ['followUps', 'customer'] });
                if (onSuccess && newId) onSuccess(Number(newId));
                reset();
                onClose();
            },
        });
    };

    const filteredRequirements = data.customer_id
        ? availableRequirements.filter(r => r.customer_id === Number(data.customer_id))
        : availableRequirements;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Schedule Follow Up</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <GenericCombobox
                                label="Customer"
                                items={availableCustomers.map(c => ({ id: c.id, name: c.full_name_with_company || c.name }))}
                                selectedId={data.customer_id}
                                onSelect={(id) => setData("customer_id", id as number)}
                                placeholder="Select Customer"
                                allowManualInput={false}
                            />
                            <ErrorMessage message={errors.customer_id} />
                        </div>
                        <div className="space-y-1">
                            <GenericCombobox
                                label="Requirement (Optional)"
                                items={filteredRequirements.map(r => ({ id: r.id, name: r.title || `Requirement #${r.id}` }))}
                                selectedId={data.requirement_id}
                                onSelect={(id) => setData("requirement_id", id as number)}
                                placeholder="Select Requirement"
                                allowManualInput={false}
                            />
                            <ErrorMessage message={errors.requirement_id} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Follow Up Date</label>
                            <Input
                                type="datetime-local"
                                value={data.follow_up_date}
                                onChange={(e) => setData("follow_up_date", e.target.value)}
                            />
                            <ErrorMessage message={errors.follow_up_date} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Priority</label>
                            <Select
                                value={data.priority}
                                onValueChange={(value) => setData("priority", value as FollowUp['priority'])}
                            >
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Notes</label>
                        <Textarea
                            placeholder="Follow up notes..."
                            value={data.notes}
                            onChange={(e) => setData("notes", e.target.value)}
                        />
                        <ErrorMessage message={errors.notes} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Schedule Follow Up'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
