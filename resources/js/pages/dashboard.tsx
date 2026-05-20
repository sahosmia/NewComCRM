import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Users, CheckCircle2, Video, ShoppingCart, Calendar, Clock, DollarSign, TrendingUp } from 'lucide-react';
import StatCard from '@/components/admin/dashboard/StatCard';
import FollowUpList from '@/components/admin/dashboard/FollowUpList';
import MeetingList from '@/components/admin/dashboard/UpcomingMeetings';
import SalesChart from '@/components/admin/dashboard/ChartData';

interface DashboardProps {
    stats: {
        todayCustomers: number;
        totalCustomers: number;
        todaySalesCount: number;
        todaySalesAmount: number;
        totalSalesCount: number;
        totalSalesAmount: number;
        todayFollowupsCount: number;
        upcomingFollowupsCount: number;
        todayMeetingsCount: number;
        upcomingMeetingsCount: number;
        todayFollowupsDone: number;
        todayMeetingsDone: number;
    };
    todayFollowups: any[];
    upcomingFollowups: any[];
    todayMeetings: any[];
    upcomingMeetings: any[];
    chartData: any[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({
    stats,
    todayFollowups,
    upcomingFollowups,
    todayMeetings,
    upcomingMeetings,
    chartData
}: DashboardProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className='p-4 sm:p-6'>
                {/* Header Section */}
                <div className="mb-8 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Dashboard Overview</h1>
                        <p className="text-sm text-muted-foreground md:text-base">
                            Real-time insights and operational metrics for today.
                        </p>
                    </div>
                </div>

                {/* Today's High-Level Results */}
                <div className="mb-8">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        Today's Performance
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                <ShoppingCart className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Sales Count</p>
                                <p className="text-2xl font-bold">{stats.todaySalesCount}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <DollarSign className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Sales Revenue</p>
                                <p className="text-2xl font-bold">৳{Number(stats.todaySalesAmount).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Follow-ups Done</p>
                                <p className="text-2xl font-bold">{stats.todayFollowupsDone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                <Video className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Meetings Done</p>
                                <p className="text-2xl font-bold">{stats.todayMeetingsDone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lifetime/Summary Stats */}
                <div className="mb-8">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        Lifecycle Metrics
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard
                            title="Today's New Customers"
                            value={stats.todayCustomers}
                            icon="users"
                            color="blue"
                            link="/customers"
                        />
                        <StatCard
                            title="Total Customers"
                            value={stats.totalCustomers}
                            icon="users"
                            color="indigo"
                            link="/customers"
                        />
                        <StatCard
                            title="Total Sales Count"
                            value={stats.totalSalesCount}
                            icon="check"
                            color="green"
                            link="/sales"
                        />
                         <StatCard
                            title="Total Sales Revenue"
                            value={`৳${Number(stats.totalSalesAmount).toLocaleString()}`}
                            icon="dollar"
                            color="purple"
                            link="/sales"
                        />
                    </div>
                </div>

                {/* Activity & Schedules */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* Main Content Area: Charts and Today's Schedule */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Activity Chart */}
                        <div className="rounded-xl border bg-card shadow-sm">
                            <div className="border-b p-6 py-4">
                                <h2 className="text-lg font-semibold tracking-tight">Lead Activity (Last 6 Months)</h2>
                            </div>
                            <div className="p-6">
                                {Array.isArray(chartData) && chartData.length > 0 ? (
                                    <SalesChart data={chartData} />
                                ) : (
                                    <div className="h-64 flex items-center justify-center text-muted-foreground italic">
                                        No activity data available
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Today's Full Schedule Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Today's Follow-ups */}
                            <div className="rounded-xl border bg-card shadow-sm">
                                <div className="border-b p-4 flex items-center justify-between bg-muted/20">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-yellow-600" />
                                        <h3 className="font-semibold text-sm">Today's Follow-ups</h3>
                                    </div>
                                    <Badge variant="secondary">{stats.todayFollowupsCount}</Badge>
                                </div>
                                <div className="p-4">
                                    <FollowUpList followups={todayFollowups} emptyMessage="No follow-ups scheduled for today." />
                                </div>
                            </div>

                            {/* Today's Meetings */}
                            <div className="rounded-xl border bg-card shadow-sm">
                                <div className="border-b p-4 flex items-center justify-between bg-muted/20">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                        <h3 className="font-semibold text-sm">Today's Meetings</h3>
                                    </div>
                                    <Badge variant="secondary">{stats.todayMeetingsCount}</Badge>
                                </div>
                                <div className="p-4">
                                    <MeetingList meetings={todayMeetings} emptyMessage="No meetings scheduled for today." />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Upcoming Schedules */}
                    <div className="space-y-8">
                         {/* Upcoming Follow-ups */}
                         <div className="rounded-xl border bg-card shadow-sm">
                            <div className="border-b p-4 flex items-center justify-between">
                                <h3 className="font-semibold text-sm">Upcoming Follow-ups</h3>
                                <Badge variant="outline">{stats.upcomingFollowupsCount}</Badge>
                            </div>
                            <div className="p-4">
                                <FollowUpList followups={upcomingFollowups} emptyMessage="No upcoming follow-ups." />
                            </div>
                        </div>

                        {/* Upcoming Meetings */}
                        <div className="rounded-xl border bg-card shadow-sm">
                            <div className="border-b p-4 flex items-center justify-between">
                                <h3 className="font-semibold text-sm">Upcoming Meetings</h3>
                                <Badge variant="outline">{stats.upcomingMeetingsCount}</Badge>
                            </div>
                            <div className="p-4">
                                <MeetingList meetings={upcomingMeetings} emptyMessage="No upcoming meetings." />
                            </div>
                        </div>

                        {/* Quick Tips/Info Card */}
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 shadow-sm">
                            <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                Productivity Tip
                            </h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Always update your follow-up status after completion to keep your pipeline accurate and dashboard metrics up-to-date.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
