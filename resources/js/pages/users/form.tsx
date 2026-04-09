import { useForm } from "@inertiajs/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";




interface Props {
    user?: User;
    users: User[];
}

export default function UserForm({ user, users }: Props) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, put, processing, } = useForm({
        name: user?.name || "",
        designation: user?.designation || "",
        company_name: user?.company_name || "",
        phone: user?.phone || "",
        email: user?.email || "",
        address: user?.address || "",
        assigned_to: user?.assigned_to || "",
        status: user?.status || "active",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (user) {
            put(route("users.update", user.id));
        } else {
            post(route("users.store"));
        }
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <Input
                placeholder="Name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
            />
            <Input
                placeholder="Company Name"
                value={data.company_name}
                onChange={(e) => setData("company_name", e.target.value)}
            />
            {/* error message */}
            <Input
                placeholder="Phone"
                value={data.phone}
                onChange={(e) => setData("phone", e.target.value)}
            />

            <Input
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
            />
            <Textarea
                placeholder="Address"
                value={data.address}
                onChange={(e) => setData("address", e.target.value)}
            />

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                    >
                        {data.assigned_to
                            ? users.find((user) => user.id === data.assigned_to)?.name
                            : "Select User"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-[--radix-popover-trigger-width] p-0"
                    align="start">
                    <Command>
                        <CommandInput placeholder="Search user..." />
                        <CommandEmpty>No user found.</CommandEmpty>

                        <CommandGroup>
                            {users.map((user) => (
                                <CommandItem
                                    key={user.id}
                                    value={user.name}
                                    onSelect={() => {
                                        setData("assigned_to", user.id);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            data.assigned_to === user.id
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {user.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

            <Select
                value={data.status}
                onValueChange={(value) => setData("status", value as "active" | "inactive")}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
            </Select>

            <Button type="submit" disabled={processing}>
                {user ? "Update" : "Create"}
            </Button>
        </form >
    );
}
