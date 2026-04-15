import AppLayout from "@/layouts/app-layout";
import UserForm from "./Form";
import type { UserType } from "@/types"; // তোমার টাইপ ফাইল থেকে
import { Head } from "@inertiajs/react";

interface User {
    id: number;
    name: string;
}

interface Props {
    user: UserType;
    users: User[];
}

export default function Edit({ user, users }: Props) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: "Users", href: route("users.index") },
                { title: "Edit User", href: route("users.edit", user.id) }
            ]}
        >

            <Head title="User Edit" />

            <div className="p-6">
                <h1 className="text-xl font-bold tracking-tight mb-4">Edit User</h1>

                <UserForm user={user} users={users} />
            </div>
        </AppLayout>
    );
}
