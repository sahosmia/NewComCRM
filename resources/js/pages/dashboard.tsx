import { Head } from '@inertiajs/react';
import { Video, Cake, Plus } from 'lucide-react';
import BirthdayList from '@/components/admin/dashboard/BirthdayList';
import SalesChart from '@/components/admin/dashboard/ChartData';
import FollowUpList from '@/components/admin/dashboard/FollowUpList';
import StatCard from '@/components/admin/dashboard/StatCard';
import MeetingList from '@/components/admin/dashboard/UpcomingMeetings';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useModal } from '@/contexts/ModalContext';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import type { Meeting, FollowUp, CustomerType, Requirement } from '@/types';

interface DashboardProps {
    meetings: { today: Meeting[]; upcoming: Meeting[]; today_count: number; upcoming_count: number };
    followUps: { today: FollowUp[]; upcoming: FollowUp[]; today_count: number; upcoming_count: number };
    sales: { today_count: number; today_amount: number; upcoming_count: number; upcoming_amount: number; total_count: number; total_amount: number };
    customers: { today_count: number; total_count: number; list: CustomerType[] };
    birthdays: { today: CustomerType[]; this_month: CustomerType[]; today_count: number; month_count: number };
    requirements: { today_count: number; upcoming_count: number; list: Requirement[] };
    chartData: any[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: dashboard().url }];

export default function Dashboard({ meetings, followUps, sales, customers, birthdays, requirements, chartData }: DashboardProps) {
    const { openModal } = useModal();
    console.log(
        "meeting:", meetings,
        "followUps:", followUps,
        "sales:", sales,
        "customers:", customers,
        "birthdays:", birthdays,
        "requirements:", requirements,
    );


    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const openQuickModal = (type: 'CREATE_FOLLOW_UP' | 'CREATE_MEETING') => {
        openModal(type, { customers: customers.list, requirements: requirements.list });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className='space-y-8 max-w-[1600px] mx-auto'>
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-2xl border shadow-sm">
                    <div className="space-y-1">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                        <p className="text-sm text-muted-foreground">Real-time metrics and operational updates for today.</p>
                    </div>
                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        <Button size="default" className="shadow-sm flex-1 sm:flex-none" onClick={() => openQuickModal('CREATE_FOLLOW_UP')}>
                            <Plus className="h-4 w-4 mr-2" /> Follow-up
                        </Button>
                        <Button size="default" variant="outline" className="shadow-sm flex-1 sm:flex-none" onClick={() => openQuickModal('CREATE_MEETING')}>
                            <Plus className="h-4 w-4 mr-2" /> Meeting
                        </Button>
                    </div>
                </div>

                {/* Operations Counters Grid (Balanced 6 columns grid) */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <StatCard title="Today Requirements" value={requirements.today_count} icon="file-text" color="cyan" link="/requirements?period=today" />
                    <StatCard title="Upcoming Requirements" value={requirements.upcoming_count} icon="calendar" color="rose" link="/requirements?period=upcoming" />
                    <StatCard title="Today Follow up" value={followUps.today_count} icon="clock" color="yellow" link="/follow-ups?period=today" />
                    <StatCard title="Upcoming Follow up" value={followUps.upcoming_count} icon="bell" color="orange" link="/follow-ups?period=upcoming" />
                    <StatCard title="Today Meetings" value={meetings.today_count} icon="shopping-cart" color="blue" link="/meetings?period=today" />
                    <StatCard title="Upcoming Meetings" value={meetings.upcoming_count} icon="calendar" color="indigo" link="/meetings?period=upcoming" />
                </div>

                {/* Financial & Customer Core Metrics */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Today's Sales" value={formatCurrency(sales.today_amount)} description={`${sales.today_count} Items`} icon="dollar" color="purple" link="/sales?period=today" />
                    <StatCard title="Upcoming Sales" value={formatCurrency(sales.upcoming_amount)} description={`${sales.upcoming_count} Items`} icon="shopping-cart" color="blue" link="/sales?period=upcoming" />
                    <StatCard title="New Customer (Today)" value={customers.today_count} description="Registered today" icon="users" color="green" link="/customers?period=today" />
                    <StatCard title="Total Customer" value={customers.total_count} description="Registered total" icon="users" color="slate" link="/customers?period=total" />
                </div>

                {/* Main Content Layout splits */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Left & Middle Column: Analytics & Tasks */}
                    <div className="flex flex-col gap-8 lg:col-span-2">
                        {/* Activity Chart */}
                        <Card className="rounded-xl overflow-hidden shadow-sm">
                            <CardHeader className="py-4 px-6 border-b bg-muted/20">
                                <CardTitle className="text-base font-semibold">Engagement Performance</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <SalesChart data={chartData} />
                            </CardContent>
                        </Card>

                        {/* Follow-up Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="rounded-xl shadow-sm">
                                <CardHeader className="py-4 px-5 border-b flex flex-row items-center justify-between bg-muted/10">
                                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Today's Follow-ups</CardTitle>
                                    <Badge variant="secondary" className="font-mono px-2 py-0.5 text-xs rounded-md">{followUps.today_count}</Badge>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <FollowUpList followups={followUps.today} />
                                </CardContent>
                            </Card>

                            <Card className="rounded-xl shadow-sm">
                                <CardHeader className="py-4 px-5 border-b flex flex-row items-center justify-between bg-muted/10">
                                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Upcoming Follow-ups</CardTitle>
                                    <Badge variant="outline" className="font-mono px-2 py-0.5 text-xs rounded-md">{followUps.upcoming_count}</Badge>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <FollowUpList followups={followUps.upcoming} />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column: Schedules & Events */}
                    <div className="flex flex-col gap-8">
                        {/* Meetings Wrapper */}
                        <Card className="rounded-xl shadow-sm">
                            <CardHeader className="py-4 px-5 border-b flex flex-row items-center justify-between bg-muted/10">
                                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Today's Meetings</CardTitle>
                                <Badge className="bg-blue-600 hover:bg-blue-600 text-white rounded-md px-2">{meetings.today_count}</Badge>
                            </CardHeader>
                            <CardContent className="p-4">
                                <MeetingList meetings={meetings.today} />
                                {meetings.today.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-8 text-center bg-muted/30 rounded-lg border border-dashed mt-2">
                                        <div className="h-9 w-9 rounded-full bg-background flex items-center justify-center mb-2 shadow-sm">
                                            <Video className="h-4 w-4 text-muted-foreground/70" />
                                        </div>
                                        <p className="text-xs text-muted-foreground italic">No meetings scheduled for today.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="rounded-xl shadow-sm">
                            <CardHeader className="py-4 px-5 border-b flex flex-row items-center justify-between bg-muted/10">
                                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Next 5 Meetings</CardTitle>
                                <Badge variant="outline" className="rounded-md px-2">{meetings.upcoming_count} Total</Badge>
                            </CardHeader>
                            <CardContent className="p-4">
                                <MeetingList meetings={meetings.upcoming} />
                            </CardContent>
                        </Card>

                        {/* Birthday Section */}
                        <div className="space-y-4">
                            <Card className="bg-rose-50/30 dark:bg-rose-950/10 border-rose-100 dark:border-rose-950/40 shadow-sm rounded-xl">
                                <CardHeader className="py-4 px-5 border-b border-rose-100/50 dark:border-rose-950/20 flex flex-row items-center justify-between">
                                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-2">
                                        <Cake className="h-4 w-4" /> Today's Birthdays
                                    </CardTitle>
                                    <Badge className="bg-rose-500 hover:bg-rose-600 border-none rounded-md px-2">{birthdays.today_count}</Badge>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <BirthdayList customers={birthdays.today} />
                                </CardContent>
                            </Card>

                            <Card className="bg-muted/20 border-dashed rounded-xl shadow-none">
                                <CardHeader className="py-4 px-5 border-b flex flex-row items-center justify-between bg-transparent">
                                    <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                        <Cake className="h-4 w-4 opacity-70" /> This Month
                                    </CardTitle>
                                    <Badge variant="outline" className="rounded-md px-2">{birthdays.month_count}</Badge>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <BirthdayList customers={birthdays.this_month} emptyMessage="No more birthdays this month." />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
