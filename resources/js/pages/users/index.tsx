import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { User } from "@/types/user";
import { PaginationType } from "@/types";

interface Props {
    users: PaginationType<User>;
}

export default function Index({ users }: Props) {
  const deleteUser = (id: number) => {
    if (confirm("Are you sure?")) {
      router.delete(route("users.destroy", id));
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: "Users", href: route("users.index") }]}>
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Users</h1>
        <Link href={route("users.create")}>
          <Button>Create</Button>
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.data.map((user: any) => (
            <tr key={user.id} className="border-t">
              <td>{user.name}</td>
              <td>{user.company_name}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>
              <td className="space-x-2">
                <Link href={route("users.edit", user.id)}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AppLayout>
  );
}
