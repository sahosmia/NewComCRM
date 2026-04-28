import AppLayout from "@/layouts/app-layout";
import FollowUpForm from "./form";
import type { FollowUp } from "@/types/follow-up";
import { Head } from "@inertiajs/react";

interface Props {
    followUp: FollowUp;
    customers: { id: number; name: string }[];
}

export default function Edit({ followUp, customers }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Follow Ups", href: route('follow-ups.index') }, { title: "Edit", href: route('follow-ups.edit', followUp.id) }]}>
            <Head title="Edit Follow Ups" />

            <div className="flex-1 space-y-4 p-4 pt-6 md:p-8 max-w-3xl">
                <h1 className="text-xl font-bold mb-4">Edit Follow Up</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <FollowUpForm followUp={followUp} customers={customers} />
                </div>
            </div>
        </AppLayout>
    );
}
