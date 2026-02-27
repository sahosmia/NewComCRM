import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Requirement } from "@/types/requirement";
import { PaginationType } from "@/types";

interface Props {
  requirements: PaginationType<Requirement>;
}

export default function Index({ requirements }: Props) {
  const deleteRequirement = (id: number) => {
    if (confirm("Are you sure?")) {
      router.delete(route("requirements.destroy", id));
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Requirements" }]}>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Requirements</h1>
          <Link href={route("requirements.create")}>
            <Button>Create Requirement</Button>
          </Link>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 border-b">Customer</th>
                <th className="p-3 border-b">Product</th>
                <th className="p-3 border-b">Quantity</th>
                <th className="p-3 border-b">Total Price</th>
                <th className="p-3 border-b text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {requirements.data.map((req) => (
                <tr key={req.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-3 border-b">{req.customer?.name}</td>
                  <td className="p-3 border-b">{req.product?.name}</td>
                  <td className="p-3 border-b">{req.quantity}</td>
                  <td className="p-3 border-b">${req.total_price}</td>
                  <td className="p-3 border-b text-right space-x-2">
                    <Link href={route("requirements.edit", req.id)}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteRequirement(req.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {requirements.data.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-muted-foreground">
                    No requirements found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
