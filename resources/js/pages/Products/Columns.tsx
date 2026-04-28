import type { Column } from '@/types';
import { Product } from '@/types/product';
import { TableRowActions } from '@/components/table/TableRowActions';

const columns: Column<Product>[] = [
    {
        header: 'Product Details',
        accessor: (item) => (
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.name}</span>
                <span className="text-xs text-muted-foreground truncate">{item.brand} {item.model ? `| ${item.model}` : ''}</span>
            </div>
        ),
    },

    {
        header: 'Category',
        accessor: (item) => item.category,
                className: "w-1/10"

    },
    {
        header: 'Price',
        accessor: (item) => item.unit_price,
        className: "w-1/10"
    },
    {
        header: 'Stock',
        accessor: (item) => item.stock_quantity,
        className: "w-1/10"
    },

    {
        header: 'Supplier',
        accessor: (item) => (
            <div className="flex flex-col">
                <span className="font-medium text-foreground">{item.supplier_name}</span>
                <span className="text-xs text-muted-foreground truncate">{item.source ? item.source : ''}</span>
            </div>
        ),
    },
    {
        header: '',
        accessor: (item) => (
            <TableRowActions
                item={item}
                resource="products"
                label="Product"
            />
        ),
        className: 'w-[7%]',
    },
];

export { columns };
