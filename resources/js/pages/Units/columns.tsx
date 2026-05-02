import type { Column } from '@/types';
import { Unit } from '@/types/unit';
import { TableRowActions } from '@/components/table/TableRowActions';

const columns: Column<Unit>[] = [
    {
        header: 'Title',
        accessor: (item) => item.title,
    },
    {
        header: 'Short Form',
        accessor: (item) => item.short_form,
    },
    {
        header: '',
        accessor: (item) => (
            <TableRowActions
                item={item}
                resource="units"
                label="Unit"
            />
        ),
        className: 'w-[7%]',
    },
];

export { columns };
