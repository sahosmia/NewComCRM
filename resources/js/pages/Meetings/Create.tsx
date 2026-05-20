import AppLayout from "@/layouts/app-layout";
import MeetingForm from "./Form";
import { Head } from "@inertiajs/react";
import { CustomerType } from "@/types";

interface Props {
    customers: CustomerType[];
    requirements: { id: number; title: string | null; customer_id: number }[];
}

export default function Create({ customers, requirements }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Meetings", href: route('meetings.index') }, { title: "Schedule", href: "" }]}>
            <Head title="Schedule Meeting" />

            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Schedule Meeting</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm  max-w-2xl mx-auto">
                    <MeetingForm customers={customers} requirements={requirements} />
                </div>
            </div>
        </AppLayout>
    );
}
