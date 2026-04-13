import AppLayout from "@/layouts/app-layout";
import CustomerForm from "./form";
import type { CustomerType } from "@/types"; // তোমার টাইপ ফাইল থেকে
import { Head } from "@inertiajs/react";

interface User {
    id: number;
    name: string;
}

interface Props {
    customer: CustomerType;
    users: User[];
}

export default function Edit({ customer, users }: Props) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: "Customers", href: route("customers.index") },
                { title: "Edit Customer", href: route("customers.edit", customer.id) }
            ]}
        >

            <Head title="Customer Edit" />

            <div className="p-6">
                <h1 className="text-xl font-bold tracking-tight mb-4">Edit Customer</h1>

                <CustomerForm customer={customer} users={users} />
            </div>
        </AppLayout>
    );
}
