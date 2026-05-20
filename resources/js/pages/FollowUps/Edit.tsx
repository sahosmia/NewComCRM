import AppLayout from "@/layouts/app-layout";
import FollowUpForm from "./Form";
import { Head } from "@inertiajs/react";
import { CustomerType, FollowUp } from "@/types";

interface Props {
    followUp: FollowUp;
    customers: CustomerType[];
    requirements: { id: number; title: string | null; customer_id: number }[];
}

export default function Edit({ followUp, customers, requirements }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Follow Ups", href: route('follow-ups.index') }, { title: "Edit", href: route('follow-ups.edit', followUp.id) }]}>
            <Head title="Edit Follow Ups" />

            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 max-w-3xl">
                <h1 className="text-xl font-bold mb-4">Edit Follow Up</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <FollowUpForm followUp={followUp} customers={customers} requirements={requirements} />
                </div>
            </div>
        </AppLayout>
    );
}
