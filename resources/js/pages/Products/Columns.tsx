import { TableRowActions } from '@/components/table/TableRowActions';
import type { Column, Product } from '@/types';

const columns: Column<Product>[] = [
    {
        header: 'Product Details',
        accessor: (item) => (
            <div className="flex flex-col min-w-0 max-w-48">
                <span className="font-medium text-foreground">{item.name}</span>

            </div>
        ),
    },

    {
        header: 'Category',
        accessor: (item) => item.category,
        className: "w-1/10"

    },
    {
        header: 'Description',
        accessor: (item) => (
            <div className="max-w-62.5 min-w-37.5">
                <p className="text-xs text-muted-foreground whitespace-normal wrap-break-word leading-relaxed line-clamp-2">
                    {item.description || "No description."}
                </p>
            </div>
        ),
        className: "w-[25%]"
    },
    {
        header: 'Price',
        accessor: (item) => item.costing_price,
        className: "w-1/10"
    },

    {
        header: 'Stock',
        accessor: (item) => (
            <span>
                {item.stock_quantity} {item.unit?.short_form}
            </span>
        ),
        className: "w-1/10"
    },

    {
        header: 'Supplier',
        accessor: (item) => (
            <div className="flex flex-col min-w-0 max-w-50">
                <span className="font-medium text-foreground truncate">
                    {item.supplier?.name}
                </span>
                {item.source && (
                    <span className="text-xs text-muted-foreground truncate block">
                        {item.source}
                    </span>
                )}
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
