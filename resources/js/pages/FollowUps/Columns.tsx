import type { Column } from '@/types';
import { Badge } from '@/components/ui/badge';
import { TableRowActions } from '@/components/table/TableRowActions';
import { InlineStatusUpdate } from '@/components/table/InlineStatusUpdate';
import { formatDate } from '@/utils/date-format';
import { CustomerType, FollowUp, Requirement } from '@/types';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Video } from 'lucide-react';


const FOLLOW_UP_OPTIONS = [
    { value: 'pending', label: 'Pending', colorClass: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
    { value: 'price_shared', label: 'Price Shared', colorClass: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    { value: 'negotiation', label: 'Negotiation', colorClass: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
    { value: 'purchase', label: 'Purchase', colorClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    { value: 'lost', label: 'Lost', colorClass: 'bg-red-500/10 text-red-600 border-red-500/20' },
    { value: 'follow_up', label: 'Follow Up', colorClass: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' },
];

const getColumns = (
    openModal: (type: 'CREATE_UNIT' | 'CREATE_COMPANY' | 'CREATE_CUSTOMER' | 'CREATE_PRODUCT' | 'CREATE_MEETING' | 'CREATE_FOLLOW_UP', props?: Record<string, unknown>) => void,
    customers: CustomerType[],
    requirements: Requirement[]
): Column<FollowUp>[] => [
    {
        header: 'Customer',
        accessor: (item) => (
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.customer?.name}</span>
                <span className="text-[10px] text-muted-foreground truncate">{item.customer?.company?.name || 'N/A'}</span>
            </div>
        ),
    },
    {
        header: 'Requirement',
        accessor: (item) => item.requirement?.title || 'N/A',
    },
    {
        header: 'Follow Up Date',
        accessor: (item) => formatDate(item.follow_up_date),
    },
    {
        header: 'Status',
        accessor: (item) => (
            <InlineStatusUpdate
                id={item.id}
                currentStatus={item.status}
                routeName="follow-ups.update-status"
                options={FOLLOW_UP_OPTIONS}
            />
        ),
    },
    {
        header: 'Priority',
        accessor: (item) => (
            <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'} className="capitalize">
                {item.priority}
            </Badge>
        ),
    },
    {
        header: 'Representative',
        accessor: (item) => (
            <div className="flex flex-col">
                {item.user ? (
                    <>
                        <span className="text-xs font-medium">{item.user.name}</span>
                        <span className="text-[10px] text-muted-foreground">{item.user.email}</span>
                    </>
                ) : (
                    <span className="text-xs text-muted-foreground italic">N/A</span>
                )}
            </div>
        ),
    },
    {
        header: '',
        accessor: (item) => (
            <TableRowActions
                item={item}
                resource="follow-ups"
                label="Follow Up"
                customActions={
                    <DropdownMenuItem
                        onClick={() => openModal('CREATE_MEETING', {
                            customer_id: item.customer_id,
                            requirement_id: item.requirement_id,
                            customers,
                            requirements
                        })}
                    >
                        <Video className="w-4 h-4 mr-2" /> Add Meeting
                    </DropdownMenuItem>
                }
            />
        ),
        className: 'w-[7%]',
    },
];

export { getColumns };
