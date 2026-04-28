import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Users, Clock, Calendar, Bell } from 'lucide-react';
import StatCard from '@/components/admin/dashboard/StatCard';
import FollowUpList from '@/components/admin/dashboard/FollowUpList';
import MeetingList from '@/components/admin/dashboard/UpcomingMeetings';
import SalesChart from '@/components/admin/dashboard/ChartData';

interface DashboardProps {
    stats: {
        totalCustomers: number;
        todayFollowups: number;
        upcomingMeetings: number;
        pendingFollowups: number;
    };
    todayFollowups: any[];
    upcomingMeetings: any[];
    chartData: any[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ stats, todayFollowups, upcomingMeetings, chartData }: DashboardProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className='p-4'>
                {/* Header Section with proper vertical spacing */}
                <div className="mb-8 flex flex-col gap-1  md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Dashboard</h1>
                        <p className="text-sm text-muted-foreground md:text-base">
                            Here's an overview of your business activities today.
                        </p>
                    </div>
                    {/* Optional: Add a "Quick Action" button here */}
                </div>

                {/* Stats Cards - Improved Gap and Responsive Grid */}
                <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

                {/* Charts & Lists Section - Refined Grid Spacing */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* Main Content Area (Left 2/3 on Desktop) */}
                    <div className="flex flex-col gap-8 lg:col-span-2">

                        {/* Activity Overview Card */}
                        <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm">
                            <div className="flex flex-row items-center justify-between border-b p-6 py-4">
                                <h2 className="text-lg font-semibold tracking-tight">Activity Overview</h2>
                            </div>
                            <div className="p-6">
                                {Array.isArray(chartData) && chartData.length > 0 ? (
                                    <SalesChart data={chartData} />
                                ) : (
                                    <div className="h-75 flex items-center justify-center text-muted-foreground italic">
                                        No chart data available
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tasks/Follow-up List Card */}
                        <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm">
                            <div className="border-b p-6 py-4">
                                <h2 className="text-lg font-semibold tracking-tight">Today's Tasks</h2>
                            </div>
                            <div className="p-6"> {/* Padding 0 for list to touch edges if needed */}
                                {todayFollowups && todayFollowups.length > 0 ? (
                                    <FollowUpList followups={todayFollowups} />
                                ) : (
                                    <div className="flex min-h-50 flex-col items-center justify-center text-center">
                                        <div className="mb-2 rounded-full bg-muted p-3">
                                            <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium text-muted-foreground">No tasks assigned for today.</p>
                                        <p className="text-xs text-muted-foreground/60">Check back later for new follow-ups.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Content (Right 1/3 on Desktop) */}
                    <div className="flex flex-col gap-8">

                        {/* Meetings Card */}
                        <div className="flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm">
                            <div className="border-b p-6 py-4">
                                <h2 className="text-lg font-semibold tracking-tight">Next Meetings</h2>
                            </div>
                            <div className="p-6">
                                    <MeetingList meetings={upcomingMeetings} />
                            </div>
                        </div>

                        {/* Quick Status/Support Card */}
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                    <Users className="h-5 w-5 text-primary" />
                                </div>
                                <p className="text-sm font-medium text-primary">System Online</p>
                                <p className="text-xs text-muted-foreground">Everything is running smoothly.</p>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
        </AppLayout>
    );
}
