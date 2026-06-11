import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { Company, CustomerType, Requirement, User } from "@/types";
import MeetingForm from "./form";

interface Props {
    customers: CustomerType[];
    requirements: Requirement[];
    users: User[];
    companies: Company[];
}

export default function Create({ customers, requirements, users, companies }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Meetings", href: route('meetings.index') }, { title: "Schedule", href: "" }]}>
            <Head title="Schedule Meeting" />

            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Schedule Meeting</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm  max-w-2xl">
                    <MeetingForm
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
