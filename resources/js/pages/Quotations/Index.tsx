import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Quotation } from "@/types/quotation";
import { PaginationType } from "@/types";

interface Props {
  quotations: PaginationType<Quotation>;
  stats: any;
}

export default function Index({ quotations, stats }: Props) {
  const deleteQuotation = (id: number) => {
    if (confirm("Are you sure?")) {
      router.delete(route("quotations.destroy", id));
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Quotations" }]}>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Quotations</h1>
          <Link href={route("quotations.create")}>
            <Button>Create Quotation</Button>
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-card border rounded-lg">
                <p className="text-sm text-muted-foreground">Draft</p>
                <p className="text-2xl font-bold">{stats.draft}</p>
            </div>
            <div className="p-4 bg-card border rounded-lg text-blue-500">
                <p className="text-sm">Sent</p>
                <p className="text-2xl font-bold">{stats.sent}</p>
            </div>
            <div className="p-4 bg-card border rounded-lg text-green-500">
                <p className="text-sm">Accepted</p>
                <p className="text-2xl font-bold">{stats.accepted}</p>
            </div>
            <div className="p-4 bg-card border rounded-lg">
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">${stats.total.toFixed(2)}</p>
            </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 border-b">Number</th>
                <th className="p-3 border-b">Customer</th>
                <th className="p-3 border-b">Date</th>
                <th className="p-3 border-b">Total</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {quotations.data.map((q) => (
                <tr key={q.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-3 border-b font-mono">{q.quotation_number}</td>
                  <td className="p-3 border-b">{q.customer?.name}</td>
                  <td className="p-3 border-b">{new Date(q.quotation_date).toLocaleDateString()}</td>
                  <td className="p-3 border-b">${q.total}</td>
                  <td className="p-3 border-b capitalize">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                          q.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          q.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                      }`}>
                        {q.status}
                      </span>
                  </td>
                  <td className="p-3 border-b text-right space-x-2">
                    <Link href={route("quotations.show", q.id)}>
                      <Button variant="outline" size="sm">View</Button>
                    </Link>
                    {q.status === 'draft' && (
                        <Link href={route("quotations.edit", q.id)}>
                          <Button variant="outline" size="sm">Edit</Button>
                        </Link>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteQuotation(q.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {quotations.data.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-muted-foreground">
                    No quotations found.
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
