import { Link } from '@inertiajs/react';
import {
  Clock,
  Users,
  Calendar,
  Bell,
  CheckCircle,
  DollarSign,
  FileText,
  AlertCircle,
  ShoppingCart
} from 'lucide-react';

export type IconType = 'users' | 'clock' | 'calendar' | 'bell' | 'file-text' | 'dollar' | 'shopping-cart' | 'check' | 'exclamation';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: IconType;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo' | 'cyan' | 'rose' | 'orange' | 'slate';
  link?: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const iconMap = {
  users: Users,
  clock: Clock,
  calendar: Calendar,
  bell: Bell,
  'file-text': FileText,
  dollar: DollarSign,
  'shopping-cart': ShoppingCart,
  check: CheckCircle,
  exclamation: AlertCircle,
};

const colorClasses = {
  blue: { text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50/50 dark:bg-blue-950/30', border: 'hover:border-blue-300 dark:hover:border-blue-800' },
  green: { text: 'text-green-600 dark:text-green-400', bg: 'bg-green-50/50 dark:bg-green-950/30', border: 'hover:border-green-300 dark:hover:border-green-800' },
  yellow: { text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50/50 dark:bg-amber-950/30', border: 'hover:border-amber-300 dark:hover:border-amber-800' },
  red: { text: 'text-red-600 dark:text-red-400', bg: 'bg-red-50/50 dark:bg-red-950/30', border: 'hover:border-red-300 dark:hover:border-red-800' },
  purple: { text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50/50 dark:bg-purple-950/30', border: 'hover:border-purple-300 dark:hover:border-purple-800' },
  indigo: { text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50/50 dark:bg-indigo-950/30', border: 'hover:border-indigo-300 dark:hover:border-indigo-800' },
  cyan: { text: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50/50 dark:bg-cyan-950/30', border: 'hover:border-cyan-300 dark:hover:border-cyan-800' },
  rose: { text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50/50 dark:bg-rose-950/30', border: 'hover:border-rose-300 dark:hover:border-rose-800' },
  orange: { text: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50/50 dark:bg-orange-950/30', border: 'hover:border-orange-300 dark:hover:border-orange-800' },
  slate: { text: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50/50 dark:bg-slate-950/30', border: 'hover:border-slate-300 dark:hover:border-slate-800' },
};

export default function StatCard({ title, value, icon, color, link, description, trend }: StatCardProps) {
  const Icon = iconMap[icon] || AlertCircle;
  const colors = colorClasses[color] || colorClasses.blue;

  const CardContent = () => (
    <div className={`group relative overflow-hidden rounded-xl border bg-card p-5 text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md ${link ? colors.border : ''}`}>
      <div className="flex items-center justify-between space-x-4">
        <div className="space-y-1 flex-1 min-w-0">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider truncate">{title}</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold tracking-tight">{value}</h2>
            {trend && (
              <span className={`inline-flex items-center text-xs font-medium ${trend.isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {trend.value}%
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground truncate font-medium">{description}</p>
          )}
        </div>

        <div className={`p-3 rounded-xl ${colors.bg} ${colors.text} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {/* Subtle Bottom Glow Line on Hover */}
      <div className={`absolute bottom-0 left-0 right-0 h-[2px] w-full scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${colors.text.replaceAll('text-', 'bg-')}`} />
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block active:scale-[0.99] transition-transform">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}
