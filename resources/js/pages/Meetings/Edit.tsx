import AppLayout from "@/layouts/app-layout";
import MeetingForm from "./Form";
import { Meeting } from "@/types/meeting";

interface Props {
    meeting: Meeting;
    customers: { id: number; name: string }[];
}

export default function Edit({ meeting, customers }: Props) {
    return (
        <AppLayout breadcrumbs={[{ label: "Meetings", href: route('meetings.index') }, { label: "Edit" }]}>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Edit Meeting</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <MeetingForm meeting={meeting} customers={customers} />
                </div>
            </div>
        </AppLayout>
    );
}
