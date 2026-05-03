import AppLayout from "@/layouts/app-layout";
import CustomerForm from "./form";
import { Head } from "@inertiajs/react";
import { User } from "@/types";
import { Customer } from "@/types/customer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    customer: Customer;
    users: User[];
    companies: { id: number, name: string }[];
}

export default function Edit({ customer, users, companies }: Props) {

    const breadcrumbs = [
        { title: "Customers", href: route("customers.index") },
        { title: "Edit Customer", href: route("customers.edit", customer.id) }
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer Edit" />

            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Edit Customer</h2>
                </div>
                <Card className="max-w-4xl mx-auto shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">
                            Customer Information
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">Update the details below to maintain accurate customer records in the system.</p>
                    </CardHeader>
                    <CardContent>
                        <CustomerForm customer={customer} users={users} companies={companies} />
                    </CardContent>
                </Card>
            </div >
        </AppLayout >
    );
}
