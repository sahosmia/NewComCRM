import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { Meeting } from "@/types/meeting";
import { PaginationType } from "@/types";

interface Props {
  meetings: PaginationType<Meeting>;
}

export default function Index({ meetings }: Props) {
  const deleteMeeting = (id: number) => {
    if (confirm("Are you sure?")) {
      router.delete(route("meetings.destroy", id));
    }
  };

  return (
    <AppLayout breadcrumbs={[{ label: "Meetings" }]}>
      <div className="p-6">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">Meetings</h1>
          <Link href={route("meetings.create")}>
            <Button>Schedule Meeting</Button>
          </Link>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 border-b">Title</th>
                <th className="p-3 border-b">Customer</th>
                <th className="p-3 border-b">Start Time</th>
                <th className="p-3 border-b">Type</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {meetings.data.map((meeting) => (
                <tr key={meeting.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-3 border-b">{meeting.title}</td>
                  <td className="p-3 border-b">{meeting.customer?.name}</td>
                  <td className="p-3 border-b">{new Date(meeting.start_time).toLocaleString()}</td>
                  <td className="p-3 border-b capitalize">{meeting.meeting_type}</td>
                  <td className="p-3 border-b capitalize">{meeting.status}</td>
                  <td className="p-3 border-b text-right space-x-2">
                    <Link href={route("meetings.edit", meeting.id)}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMeeting(meeting.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {meetings.data.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-muted-foreground">
                    No meetings found.
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
