import AppLayout from "@/layouts/app-layout";
import CustomerForm from "./form";

export default function Create({ users }: any) {
  return (
    <AppLayout breadcrumbs={[{ label: "Customers", href: route("customers.index") }, { label: "Create" }]}>
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Customer</h1>
      <CustomerForm users={users} />
    </div>
    </AppLayout>
  );
}
