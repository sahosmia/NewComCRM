import AppLayout from "@/layouts/app-layout";
import CustomerForm from "./form";
import { Head } from "@inertiajs/react";

export default function Create({ users }: any) {
    return (
        <AppLayout breadcrumbs={[{ title: "Customers", href: route("customers.index") }, { title: "Create", href: route("customers.create") }]}>
            <Head title="Customer Create" />

            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Create Customer</h1>
                <CustomerForm users={users} />
            </div>
        </AppLayout>
    );
}
