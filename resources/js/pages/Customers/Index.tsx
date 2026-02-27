import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Customer } from "@/types/customer";
import { PaginationType } from "@/types";

interface Props {
    customers: PaginationType<Customer>;
}

export default function Index({ customers }: Props) {
  const deleteCustomer = (id: number) => {
    if (confirm("Are you sure?")) {
      router.delete(route("customers.destroy", id));
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Customers" }]}>
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Customers</h1>
        <Link href={route("customers.create")}>
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
          {customers.data.map((customer) => (
            <tr key={customer.id} className="border-t">
              <td>{customer.name}</td>
              <td>{customer.company_name}</td>
              <td>{customer.phone}</td>
              <td>{customer.status}</td>
              <td className="space-x-2">
                <Link href={route("customers.edit", customer.id)}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => deleteCustomer(customer.id)}
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
