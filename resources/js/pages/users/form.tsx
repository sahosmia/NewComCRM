import { useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { UserType } from "@/types";
import ErrorMessage from "@/components/admin/ErrorMessage";

interface Props { user?: UserType; }

export default function UserForm({ user }: Props) {
    const [open, setOpen] = useState(false);

    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        role: user?.role || "user",
        password: "",
    });

    // --- Handlers ---

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        user ? put(route("users.update", user.id)) : post(route("users.store"));
    };

    return (
        <form onSubmit={submit} className="space-y-8 p-6 rounded-xl border shadow-sm w-1/2 max-w-125">

            {/* Section 1: Basic Information */}
            <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input value={data.name} onChange={e => setData("name", e.target.value)} placeholder="John Doe" />
                        <ErrorMessage message={errors.name} />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input type="email" value={data.email} onChange={e => setData("email", e.target.value)} placeholder="john@example.com" />
                        <ErrorMessage message={errors.email} />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">User Role</label>
                        <Select value={data.role} onValueChange={val => setData("role", val as "user" | "super_admin")}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="user">User</SelectItem>
                                <SelectItem value="super_admin">Super Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">Password</label>
                        <Input type="password" value={data.password} onChange={e => setData("password", e.target.value)} placeholder="" />
                        <ErrorMessage message={errors.password} />
                    </div>
                </div>


            </div>

            {/* Submit */}
            <div className="flex justify-end gap-3 pt-6 border-t">
                <Button variant="ghost" type="button" onClick={() => window.history.back()}>Cancel</Button>
                <Button type="submit" disabled={processing} className="px-8">
                    {processing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    {user ? "Save Changes" : "Create User"}
                </Button>
            </div>
        </form>
    );
}
