import { Link } from "@inertiajs/react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        accessor: (supplier: Supplier) => (
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href={route("suppliers.edit", supplier.id)}>
                        <Edit className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
        ),
    },
];
