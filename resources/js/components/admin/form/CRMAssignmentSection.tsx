import { Plus } from "lucide-react";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";
import { Button } from "@/components/ui/button";
import { useModal } from "@/contexts/ModalContext";
import type { Company, CustomerType, Requirement, User } from "@/types";

interface CRMAssignmentSectionProps {
    isSuperAdmin: boolean;
    users: User[];
    customers: CustomerType[];
    requirements: Requirement[];
    companies: Company[];
    data: {
        user_id: number;
        customer_id: number | string;
        requirement_id: number | string;
    };
    setData: any;
    setCustomers: React.Dispatch<React.SetStateAction<CustomerType[]>>;
    errors: Record<string, string>;
}

export default function CRMAssignmentSection({
    isSuperAdmin,
    users,
    customers,
    requirements,
    companies,
    data,
    setData,
    setCustomers,
    errors,
}: CRMAssignmentSectionProps) {
    const { openModal } = useModal();

    const filteredRequirements = data.customer_id
        ? requirements.filter(r => r.customer_id === data.customer_id)
        : requirements;

    return (
        <>


            {/* 2. Customer Field */}
            <div className="space-y-1">
                <GenericCombobox
                    required
                    label="Customer"
                    items={customers.map(c => ({ ...c, name: c.full_name_with_company || c.name }))}
                    selectedId={data.customer_id}
                    onSelect={(id) => {
                        const customer = customers.find(c => c.id === id);
                        setData(d => ({
                            ...d,
                            customer_id: id as number,
                            user_id: customer?.assigned_to ? Number(customer.assigned_to) : d.user_id,
                            requirement_id: (d.requirement_id && requirements.find(r => r.id === d.requirement_id)?.customer_id !== id) ? "" : d.requirement_id
                        }));
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
                                    users,
                                    companies,
                                    onSuccess: (customer: CustomerType) => {
                                        setCustomers(prev => [...prev, customer]);
                                        setData(d => ({
                                            ...d,
                                            customer_id: customer.id,
                                            user_id: customer.assigned_to ? Number(customer.assigned_to) : d.user_id
                                        }));
                                    }
                                });
                            }}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    }
                />
            </div>
            
            {/* 1. Assign To Field */}
            {isSuperAdmin && (
                <div className="space-y-1">
                    <GenericCombobox
                        required
                        label="Assign To"
                        items={users.map(u => ({ id: u.id, name: u.name }))}
                        selectedId={data.user_id}
                        onSelect={(id) => setData("user_id", id as number)}
                        placeholder="Select User"
                        searchPlaceholder="Search users..."
                        allowManualInput={false}
                        error={errors.user_id}
                    />
                </div>
            )}

            {/* 3. Requirement Field */}
            <div className="space-y-1">
                <GenericCombobox
                    label="Requirement (Optional)"
                    items={filteredRequirements.map(r => ({ ...r, name: r.title || `Requirement #${r.id}` }))}
                    selectedId={data.requirement_id}
                    onSelect={(id, name, req) => {
                        if (id) {
                            const selectedReq = req || requirements.find(r => r.id === id);
                            const associatedCustomer = customers.find(c => c.id === selectedReq?.customer_id);

                            setData(d => ({
                                ...d,
                                requirement_id: id as number,
                                customer_id: selectedReq ? selectedReq.customer_id : d.customer_id,
                                user_id: associatedCustomer?.assigned_to ? Number(associatedCustomer.assigned_to) : d.user_id
                            }));
                        } else {
                            setData("requirement_id", "");
                        }
                    }}
                    placeholder="Select Requirement"
                    searchPlaceholder="Search requirements..."
                    allowManualInput={false}
                    error={errors.requirement_id}
                />
            </div>
        </>
    );
}
