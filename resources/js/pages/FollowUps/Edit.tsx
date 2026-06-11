import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { Company, CustomerType, FollowUp, Requirement, User } from "@/types";
import FollowUpForm from "./form";

interface Props {
    followUp: FollowUp;
    customers: CustomerType[];
    requirements: Requirement[];
    users: User[];
    companies: Company[];
}

export default function Edit({ followUp, customers, requirements, users, companies }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Follow Ups", href: route('follow-ups.index') }, { title: "Edit", href: route('follow-ups.edit', followUp.id) }]}>
            <Head title="Edit Follow Ups" />

            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 max-w-2xl">
                <h1 className="text-xl font-bold mb-4">Edit Follow Up</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <FollowUpForm followUp={followUp} customers={customers} requirements={requirements} users={users} companies={companies} />
                </div>
            </div>
        </AppLayout>
    );
}
