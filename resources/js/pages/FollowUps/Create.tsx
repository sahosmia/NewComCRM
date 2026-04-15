import AppLayout from "@/layouts/app-layout";
import FollowUpForm from "./form";

interface Props {
    customers: { id: number; name: string }[];
}

export default function Create({ customers }: Props) {
    return (
        <AppLayout breadcrumbs={[{ title: "Follow Ups", href: route('follow-ups.index') }, { title: "Schedule", href: route('follow-ups.create') }]}>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-xl font-bold mb-4">Schedule Follow Up</h1>
                <div className="bg-card p-6 border rounded-lg shadow-sm">
                    <FollowUpForm customers={customers} />
                </div>
            </div>
        </AppLayout>
    );
}
