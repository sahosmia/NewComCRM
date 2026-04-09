import UserForm from "./form";

export default function Edit({ user, users }: any) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit User</h1>
      <UserForm user={user} users={users} />
    </div>
  );
}
