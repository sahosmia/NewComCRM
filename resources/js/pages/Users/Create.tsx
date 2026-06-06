import AppLayout from "@/layouts/app-layout";
import UserForm from "./Form";
import { Head } from "@inertiajs/react";
import { UserType } from "@/types";

export default function Create({ user }: {user:UserType}) {
    return (
        <AppLayout breadcrumbs={[{ title: "Users", href: route("users.index") }, { title: "Create", href: route("users.create") }]}>
            <Head title="User Create" />

            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Create User</h1>
                <UserForm user={user} />
            </div>
        </AppLayout>
    );
}
