import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartDataItem {
    name: string;
    followups: number;
    quotations: number;
}

export default function SalesChart({ data }: { data: ChartDataItem[] }) {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                        dataKey="name"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: '#6b7280' }}
                    />
                    <YAxis
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: '#6b7280' }}
                    />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />

                    {/* Followups Bar */}
                    <Bar dataKey="followups" name="Follow-ups" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />

                    {/* Quotations Bar */}
                    <Bar dataKey="quotations" name="Quotations" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
