import { Head, router } from "@inertiajs/react";
import {
    Users,
    Calendar,
    MessageSquare,
    Video,
    TrendingUp,
    Filter,
    FileText,
} from "lucide-react";
import { useState } from "react";
import Pagination from "@/components/admin/Pagination";
import StatusBadge from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import type { CustomerType, FollowUp, Meeting, Sale, User, Requirement, PaginationType } from "@/types";
import { formatDate } from "@/utils/date-format";
import { formatCurrency } from "@/utils/number-format";

interface Props {
    stats: {
        total_sales_amount: number;
        total_sales_count: number;
        total_meetings: number;
        total_follow_ups: number;
        new_customers: number;
    };
    followUps: FollowUp[];
    meetings: Meeting[];
    sales: Sale[];
    customers: CustomerType[];
    requirements: PaginationType<Requirement>;
    filters: {
        users: User[];
        customers: { id: number; name: string }[];
    };
}

export default function ReportIndex({
    stats,
    followUps,
    meetings,
    sales,
    customers,
    requirements,
    filters,
}: Props) {
    const urlParams = new URLSearchParams(window.location.search);
    const [period, setPeriod] = useState(urlParams.get("period") || "month");
    const [userId, setUserId] = useState(urlParams.get("user_id") || "all");
    const [customerId, setCustomerId] = useState(urlParams.get("customer_id") || "all");
    const [startDate, setStartDate] = useState(urlParams.get("start_date") || "");
    const [endDate, setEndDate] = useState(urlParams.get("end_date") || "");

    const handleFilter = () => {
        const params: any = {};
        if (period !== "custom") params.period = period;
        if (userId !== "all") params.user_id = userId;
        if (customerId !== "all") params.customer_id = customerId;
        if (period === "custom") {
            if (startDate) params.start_date = startDate;
            if (endDate) params.end_date = endDate;
        }

        router.get(route("reports.index"), params, { preserveState: true });
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Dashboard", href: route("dashboard") },
                { title: "Reports", href: "#" },
            ]}
        >
            <Head title="Reports Overview" />

            <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>

                    <Card className="w-full md:w-auto">
                        <CardContent className="p-3 flex flex-wrap items-center gap-3">
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground">Period</label>
                                <Select value={period} onValueChange={setPeriod}>
                                    <SelectTrigger className="w-[140px] h-9">
                                        <SelectValue placeholder="Select Period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="day">Today</SelectItem>
                                        <SelectItem value="week">This Week</SelectItem>
                                        <SelectItem value="month">This Month</SelectItem>
                                        <SelectItem value="year">This Year</SelectItem>
                                        <SelectItem value="custom">Custom Range</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {period === "custom" && (
                                <>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-bold uppercase text-muted-foreground">Start Date</label>
                                        <Input
                                            type="date"
                                            className="h-9 w-[140px]"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-bold uppercase text-muted-foreground">End Date</label>
                                        <Input
                                            type="date"
                                            className="h-9 w-[140px]"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </>
                            )}

                            {filters.users.length > 0 && (
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold uppercase text-muted-foreground">User</label>
                                    <Select value={userId} onValueChange={setUserId}>
                                        <SelectTrigger className="w-[160px] h-9">
                                            <SelectValue placeholder="All Users" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Users</SelectItem>
                                            {filters.users.map((u) => (
                                                <SelectItem key={u.id} value={u.id.toString()}>
                                                    {u.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}

                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-bold uppercase text-muted-foreground">Customer</label>
                                <Select value={customerId} onValueChange={setCustomerId}>
                                    <SelectTrigger className="w-[180px] h-9">
                                        <SelectValue placeholder="All Customers" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Customers</SelectItem>
                                        {filters.customers.map((c) => (
                                            <SelectItem key={c.id} value={c.id.toString()}>
                                                {c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-1 self-end">
                                <Button size="sm" onClick={handleFilter} className="h-9 gap-2">
                                    <Filter className="w-4 h-4" /> Filter
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <Card className="border-l-4 border-l-purple-500">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Sales Amount</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(stats.total_sales_amount)}</div>
                            <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-emerald-500" /> From {stats.total_sales_count} sales
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Meetings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_meetings}</div>
                            <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                                <Video className="w-3 h-3 text-blue-500" /> Customer interactions
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-amber-500">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Follow-ups</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_follow_ups}</div>
                            <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                                <MessageSquare className="w-3 h-3 text-amber-500" /> Relationship touchpoints
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-emerald-500">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">New Customers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.new_customers}</div>
                            <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                                <Users className="w-3 h-3 text-emerald-500" /> Added in this period
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-slate-500">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Efficiency</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_meetings + stats.total_follow_ups > 0
                                    ? ((stats.total_sales_count / (stats.total_meetings + stats.total_follow_ups)) * 100).toFixed(1)
                                    : 0}%
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1">Lead Conversion Rate</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sales Section */}
                    <Card>
                        <CardHeader className="bg-muted/10">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-purple-600" /> Sales Transactions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="max-h-[400px] overflow-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="sticky top-0 bg-background text-[10px] uppercase font-bold text-muted-foreground border-b z-10">
                                        <tr>
                                            <th className="px-4 py-3">Date</th>
                                            <th className="px-4 py-3">Customer</th>
                                            <th className="px-4 py-3 text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {sales.length > 0 ? sales.map((sale) => (
                                            <tr key={sale.id} className="hover:bg-muted/50 transition-colors">
                                                <td className="px-4 py-3 text-xs whitespace-nowrap">{formatDate(sale.sale_date)}</td>
                                                <td className="px-4 py-3">
                                                    <p className="font-medium text-xs truncate">{sale.customer?.name}</p>
                                                    <p className="text-[10px] text-muted-foreground">Rep: {sale.customer?.assigned_user?.name}</p>
                                                </td>
                                                <td className="px-4 py-3 text-right font-bold text-xs">{formatCurrency(sale.amount)}</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={3} className="text-center py-8 text-muted-foreground italic">No sales found</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Meetings Section */}
                    <Card>
                        <CardHeader className="bg-muted/10">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Video className="w-5 h-5 text-blue-600" /> Meetings Log
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="max-h-[400px] overflow-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="sticky top-0 bg-background text-[10px] uppercase font-bold text-muted-foreground border-b z-10">
                                        <tr>
                                            <th className="px-4 py-3">Scheduled At</th>
                                            <th className="px-4 py-3">Details</th>
                                            <th className="px-4 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {meetings.length > 0 ? meetings.map((meeting) => (
                                            <tr key={meeting.id} className="hover:bg-muted/50 transition-colors">
                                                <td className="px-4 py-3 text-xs whitespace-nowrap">{new Date(meeting.scheduled_at).toLocaleString()}</td>
                                                <td className="px-4 py-3">
                                                    <p className="font-medium text-xs truncate">{meeting.title}</p>
                                                    <p className="text-[10px] text-muted-foreground truncate">{meeting.customer?.name}</p>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold uppercase">{meeting.status}</span>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={3} className="text-center py-8 text-muted-foreground italic">No meetings found</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Follow-ups Section */}
                    <Card>
                        <CardHeader className="bg-muted/10">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-amber-600" /> Follow-ups History
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="max-h-[400px] overflow-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="sticky top-0 bg-background text-[10px] uppercase font-bold text-muted-foreground border-b z-10">
                                        <tr>
                                            <th className="px-4 py-3">Date</th>
                                            <th className="px-4 py-3">Customer</th>
                                            <th className="px-4 py-3">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {followUps.length > 0 ? followUps.map((f) => (
                                            <tr key={f.id} className="hover:bg-muted/50 transition-colors">
                                                <td className="px-4 py-3 text-xs whitespace-nowrap">{formatDate(f.follow_up_date)}</td>
                                                <td className="px-4 py-3 font-medium text-xs">{f.customer?.name}</td>
                                                <td className="px-4 py-3 text-xs text-muted-foreground truncate max-w-40">{f.notes}</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={3} className="text-center py-8 text-muted-foreground italic">No follow-ups found</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Customers Section */}
                    <Card>
                        <CardHeader className="bg-muted/10">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Users className="w-5 h-5 text-emerald-600" /> New Customer Acquisition
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="max-h-[400px] overflow-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="sticky top-0 bg-background text-[10px] uppercase font-bold text-muted-foreground border-b z-10">
                                        <tr>
                                            <th className="px-4 py-3">Created Date</th>
                                            <th className="px-4 py-3">Name</th>
                                            <th className="px-4 py-3">Company</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {customers.length > 0 ? customers.map((c) => (
                                            <tr key={c.id} className="hover:bg-muted/50 transition-colors">
                                                <td className="px-4 py-3 text-xs whitespace-nowrap">{formatDate(c.created_at)}</td>
                                                <td className="px-4 py-3 font-medium text-xs">{c.name}</td>
                                                <td className="px-4 py-3 text-xs text-muted-foreground">{c.company?.name || 'Personal'}</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={3} className="text-center py-8 text-muted-foreground italic">No new customers found</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Requirements Section */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="bg-muted/10">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-600" /> Requirements History
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="max-h-[500px] overflow-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="sticky top-0 bg-background text-[10px] uppercase font-bold text-muted-foreground border-b z-10">
                                        <tr>
                                            <th className="px-4 py-3">Date</th>
                                            <th className="px-4 py-3">Title</th>
                                            <th className="px-4 py-3">Customer</th>
                                            <th className="px-4 py-3">Status</th>
                                            <th className="px-4 py-3 text-right">Grand Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {requirements && requirements.data.length > 0 ? requirements.data.map((req) => (
                                            <tr key={req.id} className="hover:bg-muted/50 transition-colors">
                                                <td className="px-4 py-3 text-xs whitespace-nowrap">{formatDate(req.created_at)}</td>
                                                <td className="px-4 py-3 font-medium text-xs truncate max-w-xs">{req.title || `REQ-${req.id}`}</td>
                                                <td className="px-4 py-3">
                                                    <p className="font-medium text-xs truncate">{req.customer?.name}</p>
                                                    <p className="text-[10px] text-muted-foreground">{req.customer?.company?.name || 'Personal'}</p>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <StatusBadge status={req.status} />
                                                </td>
                                                <td className="px-4 py-3 text-right font-bold text-xs">{formatCurrency(req.grand_total)}</td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={5} className="text-center py-8 text-muted-foreground italic">No requirements found</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-4 border-t">
                                <Pagination data={requirements} routeName="reports.index" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
