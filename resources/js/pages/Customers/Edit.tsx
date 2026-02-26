import CustomerForm from "./form";

export default function Edit({ customer, users }: any) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Customer</h1>
      <CustomerForm customer={customer} users={users} />
    </div>
  );
}
