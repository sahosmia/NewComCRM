import React from 'react';
import { Link } from '@inertiajs/react';
import { ClockIcon, UsersIcon, CalendarIcon, BellIcon, CheckCircleIcon, DollarSign, Dock } from 'lucide-react';


interface StatCardProps {
  title: string;
  value: number | string;
  icon: 'users' | 'clock' | 'calendar' | 'bell' | 'document' | 'dollar' | 'check' | 'exclamation';
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
  link?: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const iconMap = {
  users: UsersIcon,
  clock: ClockIcon,
  calendar: CalendarIcon,
  bell: BellIcon,
  document: Dock,
  dollar: DollarSign,
  check: CheckCircleIcon,
  exclamation: BellIcon
};

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    icon: 'text-blue-600',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-100'
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    icon: 'text-green-600',
    border: 'border-green-200',
    hover: 'hover:bg-green-100'
  },
  yellow: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    icon: 'text-yellow-600',
    border: 'border-yellow-200',
    hover: 'hover:bg-yellow-100'
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    icon: 'text-red-600',
    border: 'border-red-200',
    hover: 'hover:bg-red-100'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    icon: 'text-purple-600',
    border: 'border-purple-200',
    hover: 'hover:bg-purple-100'
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    icon: 'text-indigo-600',
    border: 'border-indigo-200',
    hover: 'hover:bg-indigo-100'
  }
};

export default function StatCard({
  title,
  value,
  icon,
  color,
  link,
  description,
  trend
}: StatCardProps) {
  const Icon = iconMap[icon];
  const colors = colorClasses[color];

  const CardContent = () => (
    <div className={`relative overflow-hidden rounded-lg ${colors.bg} p-6 shadow-sm border ${colors.border} transition-all ${link ? colors.hover : ''}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className={`h-8 w-8 ${colors.icon}`} />
        </div>
        <div className="ml-4 flex-1">
          <dt className="text-sm font-medium text-gray-600 truncate">{title}</dt>
          <dd className="mt-1">
            <div className="flex items-baseline">
              <p className={`text-2xl font-semibold ${colors.text}`}>{value}</p>
              {trend && (
                <span className={`ml-2 text-sm font-medium ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trend.isPositive ? '+' : '-'}{trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
          </dd>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 right-0 -mb-4 -mr-4 h-20 w-20 opacity-10">
        <Icon className={`h-full w-full ${colors.icon}`} />
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="block">
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
}
