import AppLayout from "@/layouts/app-layout";
import MeetingForm from "./form";
import { Head } from "@inertiajs/react";
import { Company, CustomerType, Meeting, Requirement, User } from "@/types";

interface Props {
    meeting: Meeting;
    customers: CustomerType[];
    requirements: Requirement[];
    users: User[];
    companies: Company[];
}

export default function Edit({ meeting, customers, requirements, users, companies }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Meetings", href: route('meetings.index') }, { title: "Edit", href: "" }]}>
            <Head title="Edit Meeting" />

            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Edit Meeting</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm  max-w-2xl mx-auto">
                    <MeetingForm
                        meeting={meeting}
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
