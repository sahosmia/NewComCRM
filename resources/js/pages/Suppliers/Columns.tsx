import { TableRowActions } from "@/components/table/TableRowActions";
import type { Column, Supplier } from "@/types";

export const columns: Column<Supplier>[] = [
    {
        header: "Name",
        accessor: "name",
        className: "font-medium",
    },
    {
        header: "Email",
        accessor: "email",
    },
    {
        header: "Phone",
        accessor: "phone",
    },
    {
        header: "Actions",
        accessor: (item: Supplier) => (
            <TableRowActions
                item={item}
                resource="suppliers"
                label="Supplier"
            />
        ),
    },
];
