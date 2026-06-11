import { TableRowActions } from '@/components/table/TableRowActions';
import type { Column, Unit } from '@/types';

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
                hideView
            />
        ),
        className: 'w-[7%]',
    },
];

export { columns };
