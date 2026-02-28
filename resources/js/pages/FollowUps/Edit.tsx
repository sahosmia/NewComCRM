import AppLayout from "@/layouts/app-layout";
import FollowUpForm from "./form";
import type { FollowUp } from "@/types/follow-up";

interface Props {
    followUp: FollowUp;
    customers: { id: number; name: string }[];
}

export default function Edit({ followUp, customers }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Follow Ups", href: route('follow-ups.index') }, { title: "Edit", href: route('follow-ups.edit', followUp.id) }]}>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Edit Follow Up</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <FollowUpForm followUp={followUp} customers={customers} />
                </div>
            </div>
        </AppLayout>
    );
}
