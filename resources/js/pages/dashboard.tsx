import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Users,  Video, Cake } from 'lucide-react';
import StatCard from '@/components/admin/dashboard/StatCard';
import FollowUpList from '@/components/admin/dashboard/FollowUpList';
import MeetingList from '@/components/admin/dashboard/UpcomingMeetings';
import SalesChart from '@/components/admin/dashboard/ChartData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Meeting, FollowUp, CustomerType, Requirement } from '@/types';
import { useModal } from '@/contexts/ModalContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import BirthdayList from '@/components/admin/dashboard/BirthdayList';


interface DashboardProps {
    meetings: {
        today: Meeting[];
        upcoming: Meeting[];
        today_count: number;
        upcoming_count: number;
    };
    followUps: {
        today: FollowUp[];
        upcoming: FollowUp[];
        today_count: number;
        upcoming_count: number;
    };
    sales: {
        today_count: number;
        today_amount: number;
        total_count: number;
        total_amount: number;
    };
    customers: {
        today_count: number;
        total_count: number;
        list: CustomerType[];
    };
    birthdays: {
        today: CustomerType[];
        this_month: CustomerType[];
        today_count: number;
        month_count: number;
    };
    requirements: {
        today_count: number;
        upcoming_count: number;
        list: Requirement[];
    };
    chartData: any[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ meetings, followUps, sales, customers, birthdays, requirements, chartData }: DashboardProps) {
    const { openModal } = useModal();
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className='p-6 space-y-8'>
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                        <p className="text-muted-foreground">Real-time metrics and operational updates for today.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" onClick={() => openModal('CREATE_FOLLOW_UP', {
                            customers: customers.list,
                            requirements: requirements.list
                        })}>
                            <Plus className="h-4 w-4 mr-1" /> Follow-up
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openModal('CREATE_MEETING', {
                            customers: customers.list,
                            requirements: requirements.list
                        })}>
                            <Plus className="h-4 w-4 mr-1" /> Meeting
                        </Button>
                    </div>
                </div>

                {/* Main Metrics Row */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Today's Sales"
                        value={formatCurrency(sales.today_amount)}
                        description={`${sales.today_count} Items`}
                        icon="dollar"
                        color="purple"
                        link="/sales"
                    />
                    <StatCard
                        title="Total Sales"
                        value={formatCurrency(sales.total_amount)}
                        description={`Total: ${sales.total_count} Items`}
                        icon="shopping-cart"
                        color="blue"
                        link="/sales"
                    />
                    <StatCard
                        title="New Customer (Today)"
                        value={customers.today_count}
                        description="Registered today"
                        icon="users"
                        color="green"
                        link="/customers"
                    />
                    <StatCard
                        title="Total Customer (All Time)"
                        value={customers.total_count}
                        description="Lifetime database"
                        icon="users"
                        color="slate"
                        link="/customers"
                    />
                </div>

                {/* Second Row: Activity Counts */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Today Requirements"
                        value={requirements.today_count}
                        icon="file-text"
                        color="cyan"
                        link="/requirements"
                    />
                    <StatCard
                        title="Upcoming Requirements"
                        value={requirements.upcoming_count}
                        icon="calendar"
                        color="rose"
                        link="/requirements"
                    />
                    <StatCard
                        title="Today Follow up"
                        value={followUps.today_count}
                        icon="clock"
                        color="yellow"
                        link="/follow-ups?period=today"
                    />
                    <StatCard
                        title="Upcoming Follow up (All Time)"
                        value={followUps.upcoming_count}
                        icon="bell"
                        color="orange"
                        link="/follow-ups?period=upcoming"
                    />
                </div>

                {/* Third Row: Meetings Activity */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                     <StatCard
                        title="Today Meetings"
                        value={meetings.today_count}
                        icon="video"
                        color="blue"
                        link="/meetings?period=today"
                    />
                    <StatCard
                        title="Upcoming Meetings"
                        value={meetings.upcoming_count}
                        icon="calendar"
                        color="indigo"
                        link="/meetings?period=upcoming"
                    />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left Side: Tasks & Activity */}
                    <div className="flex flex-col gap-8 lg:col-span-2">
                         {/* Activity Chart */}
                         <Card>
                            <CardHeader className="py-4 border-b">
                                <CardTitle className="text-lg">Engagement Performance</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <SalesChart data={chartData} />
                            </CardContent>
                        </Card>

                        {/* Follow-up Tasks */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader className="py-3 border-b flex flex-row items-center justify-between">
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Today's Follow-ups</CardTitle>
                                    <Badge variant="secondary" className="font-mono text-[10px]">{followUps.today_count}</Badge>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <FollowUpList followups={followUps.today} />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="py-3 border-b flex flex-row items-center justify-between">
                                    <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Upcoming Follow-ups</CardTitle>
                                    <Badge variant="outline" className="font-mono text-[10px]">{followUps.upcoming_count}</Badge>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <FollowUpList followups={followUps.upcoming} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Side: Schedules */}
                    <div className="flex flex-col gap-8">
                         {/* Today's Meetings */}
                         <Card>
                            <CardHeader className="py-3 border-b flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Today's Meetings</CardTitle>
                                <Badge className="bg-blue-500 text-[10px]">{meetings.today_count}</Badge>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <MeetingList meetings={meetings.today} />
                                {meetings.today.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-6 text-center">
                                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-2">
                                            <Video className="h-5 w-5 text-muted-foreground opacity-50" />
                                        </div>
                                        <p className="text-xs text-muted-foreground italic">No meetings scheduled for today.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Upcoming Meetings */}
                        <Card>
                            <CardHeader className="py-3 border-b flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Next 5 Meetings</CardTitle>
                                <Badge variant="outline" className="text-[10px]">{meetings.upcoming_count} Total</Badge>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <MeetingList meetings={meetings.upcoming} />
                            </CardContent>
                        </Card>

                         {/* Birthday Section */}
                        <Card className="bg-pink-50/20 border-pink-100 shadow-sm">
                            <CardHeader className="py-3 border-b border-pink-100/50 flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-pink-700 flex items-center gap-2">
                                    <Cake className="h-4 w-4" /> Today's Birthdays
                                </CardTitle>
                                <Badge className="bg-pink-500 hover:bg-pink-600 border-none text-[10px]">{birthdays.today_count}</Badge>
                            </CardHeader>
                            <CardContent className="pt-4 pb-2">
                                <BirthdayList customers={birthdays.today} />
                            </CardContent>
                        </Card>

                        <Card className="bg-muted/10 border-dashed">
                            <CardHeader className="py-3 border-b flex flex-row items-center justify-between">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                    <Cake className="h-4 w-4 opacity-70" /> This Month
                                </CardTitle>
                                <Badge variant="outline" className="text-[10px]">{birthdays.month_count}</Badge>
                            </CardHeader>
                            <CardContent className="pt-4 pb-2">
                                <BirthdayList customers={birthdays.this_month} emptyMessage="No more birthdays this month." />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
