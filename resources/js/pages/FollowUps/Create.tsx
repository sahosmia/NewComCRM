import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { Company, CustomerType, Requirement, User } from "@/types";
import FollowUpForm from "./form";

interface Props {
    customers: CustomerType[];
    requirements: Requirement[];
    users: User[];
    companies: Company[];
}

export default function Create({ customers, requirements, users, companies }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Follow Ups", href: route('follow-ups.index') }, { title: "New Schedule", href: "#" }]}>
            <Head title="Create Follow Ups" />

            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 max-w-3xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold tracking-tight">Schedule Follow Up</h1>
                    <p className="text-muted-foreground text-sm">Plan your next interaction with the customer.</p>
                </div>
                <div className="bg-card p-8 border rounded-xl shadow-sm ring-1 ring-border/50">
                    <FollowUpForm 
                        customers={customers} 
                        requirements={requirements} 
                        users={users} 
                        companies={companies}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
