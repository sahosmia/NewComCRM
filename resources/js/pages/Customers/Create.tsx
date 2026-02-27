import AppLayout from "@/layouts/app-layout";
import CustomerForm from "./form";

export default function Create({ users }: any) {
  return (
    <AppLayout breadcrumbs={[{ title: "Customers", href: route("customers.index") }, { title: "Create", href: route("customers.create") }]}>
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Customer</h1>
      <CustomerForm users={users} />
    </div>
    </AppLayout>
  );
}
