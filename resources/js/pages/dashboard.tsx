import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import AppLayout from '@/layouts/app-layout';
import StatCard from '@/components/StatCard';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ stats, todayFollowups, upcomingMeetings, chartData }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Customers"
                    value={stats.totalCustomers}
                    icon="users"
                    color="blue"
                    link="/customers"
                />
                <StatCard
                    title="Today's Follow-ups"
                    value={stats.todayFollowups}
                    icon="clock"
                    color="yellow"
                    link="/follow-ups?type=today"
                />
                <StatCard
                    title="Upcoming Meetings"
                    value={stats.upcomingMeetings}
                    icon="calendar"
                    color="green"
                    link="/meetings?status=upcoming"
                />
                <StatCard
                    title="Pending Follow-ups"
                    value={stats.pendingFollowups}
                    icon="bell"
                    color="red"
                    link="/follow-ups?status=pending"
                />
            </div>

            {/* Charts and Lists */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-medium mb-4">Follow-ups & Quotations</h2>
                        <SalesChart data={chartData} />
                    </div>

                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium">Today's Follow-ups</h2>
                        </div>
                        <FollowUpList followups={todayFollowups} />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium">Upcoming Meetings</h2>
                        </div>
                        <MeetingList meetings={upcomingMeetings} />
                    </div>

                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium">Recent Activity</h2>
                        </div>
                        <ActivityTimeline activities={recentActivities} />
                    </div>
                </div>
            </div> */}
        </AppLayout>
    );
}
