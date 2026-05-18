import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Users, CheckCircle2, Video, ShoppingCart } from 'lucide-react';
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
        todayFollowupsDone: number;
        todayMeetingsDone: number;
        todaySalesCount: number;
        totalSalesAmount?: number;
    };
    todayFollowups: FollowUp[];
    upcomingMeetings: Meeting[];
    chartData: { name: string; followups: number }[];
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

                {/* Results Section */}
                <div className="mb-8">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Today's Results
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Follow-ups Done</p>
                                <p className="text-2xl font-bold">{stats.todayFollowupsDone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <Video className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Meetings Done</p>
                                <p className="text-2xl font-bold">{stats.todayMeetingsDone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                <ShoppingCart className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Sales Completed</p>
                                <p className="text-2xl font-bold">{stats.todaySalesCount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Pipeline Overview</h2>
                </div>

                {/* Stats Cards - Improved Gap and Responsive Grid */}
                <div className={`mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 ${stats.totalSalesAmount !== undefined ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
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
                        link="/meetings?status=scheduled"
                    />
                    <StatCard
                        title="Pending Follow-ups"
                        value={stats.pendingFollowups}
                        icon="bell"
                        color="red"
                        link="/follow-ups?status=pending"
                    />
                    {stats.totalSalesAmount !== undefined && (
                        <StatCard
                            title="Total Sales Amount"
                            value={stats.totalSalesAmount}
                            icon="dollar"
                            color="purple"
                            link="/sales"
                        />
                    )}
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
