import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";

export default function Index({ products }: any) {
  const deleteProduct = (id: number) => {
    if (confirm("Are you sure?")) {
      router.delete(route("products.destroy", id));
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Products" }]}>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Products</h1>
          <Link href={route("products.create")}>
            <Button>Create Product</Button>
          </Link>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Brand</th>
                <th className="p-3 border-b">Category</th>
                <th className="p-3 border-b">Price</th>
                <th className="p-3 border-b">Stock</th>
                <th className="p-3 border-b text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {products.data.map((product: any) => (
                <tr key={product.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-3 border-b">{product.name}</td>
                  <td className="p-3 border-b">{product.brand}</td>
                  <td className="p-3 border-b">{product.category}</td>
                  <td className="p-3 border-b">${product.unit_price}</td>
                  <td className="p-3 border-b">{product.stock_quantity}</td>
                  <td className="p-3 border-b text-right space-x-2">
                    <Link href={route("products.edit", product.id)}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {products.data.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-muted-foreground">
                    No products found.
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
