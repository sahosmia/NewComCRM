import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import MeetingForm from "./form";

interface Props {
    customers: { id: number; name: string }[];
}

export default function Create({ customers }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Meetings", href: route('meetings.index') }, { title: "Schedule", href:""}]}>
            <Head title="Schedule Meeting | CVS CRM" />
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Schedule Meeting</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <MeetingForm customers={customers} />
                </div>
            </div>
        </AppLayout>
    );
}
