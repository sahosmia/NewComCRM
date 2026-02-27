import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { FollowUp } from "@/types/follow-up";
import { PaginationType } from "@/types";

interface Props {
  followUps: PaginationType<FollowUp>;
  stats: any;
}

export default function Index({ followUps, stats }: Props) {
  const deleteFollowUp = (id: number) => {
    if (confirm("Are you sure?")) {
      router.delete(route("follow-ups.destroy", id));
    }
  };

  const completeFollowUp = (id: number) => {
      router.post(route("follow-ups.complete", id));
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Follow Ups" }]}>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Follow Ups</h1>
          <Link href={route("follow-ups.create")}>
            <Button>Schedule Follow Up</Button>
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-card border rounded-lg">
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">{stats.today}</p>
            </div>
            <div className="p-4 bg-card border rounded-lg">
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">{stats.upcoming}</p>
            </div>
            <div className="p-4 bg-card border rounded-lg text-red-500">
                <p className="text-sm">Overdue</p>
                <p className="text-2xl font-bold">{stats.overdue}</p>
            </div>
            <div className="p-4 bg-card border rounded-lg text-green-500">
                <p className="text-sm">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 border-b">Customer</th>
                <th className="p-3 border-b">Date</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Priority</th>
                <th className="p-3 border-b text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {followUps.data.map((fu) => (
                <tr key={fu.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-3 border-b">{fu.customer?.name}</td>
                  <td className="p-3 border-b">{new Date(fu.follow_up_date).toLocaleDateString()}</td>
                  <td className="p-3 border-b capitalize">{fu.status.replace('_', ' ')}</td>
                  <td className="p-3 border-b capitalize">{fu.priority}</td>
                  <td className="p-3 border-b text-right space-x-2">
                    {!fu.completed_at && (
                        <Button variant="outline" size="sm" onClick={() => completeFollowUp(fu.id)}>Complete</Button>
                    )}
                    <Link href={route("follow-ups.edit", fu.id)}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteFollowUp(fu.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {followUps.data.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-muted-foreground">
                    No follow ups found.
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
