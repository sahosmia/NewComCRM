import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import type { Company, User } from "@/types";
import CustomerForm from "./form";

interface CreateProps {
    users: User[];
    companies: Company[];
}

export default function Create({ users, companies }: CreateProps) {
    const breadcrumbs = [
        { title: "Customers", href: route("customers.index") },
        { title: "Create Customer", href: route("customers.create") }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Customer" />

            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Create Customer</h2>
                </div>

                <Card className="max-w-5xl shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium">
                            Customer Information
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Fill in the details below to register a new customer in the system.
                        </p>
                    </CardHeader>
                    <CardContent>
                        {/* CustomerForm is kept decoupled for easier testing */}
                        <CustomerForm users={users} companies={companies} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
