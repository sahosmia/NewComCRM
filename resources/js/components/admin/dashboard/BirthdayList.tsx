import { Link } from "@inertiajs/react";
import { Cake, ChevronRight } from "lucide-react";
import type { CustomerType } from "@/types";

interface BirthdayListProps {
    customers: CustomerType[];
    emptyMessage?: string;
}

export default function BirthdayList({ customers, emptyMessage = "No birthdays today." }: BirthdayListProps) {
    if (customers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center mb-2">
                    <Cake className="h-5 w-5 text-muted-foreground opacity-50" />
                </div>
                <p className="text-xs text-muted-foreground italic">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {customers.map((customer) => (
                <Link
                    key={customer.id}
                    href={route('customers.show', customer.id)}
                    className="flex items-center justify-between group p-2 rounded-lg hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-pink-100 dark:bg-pink-950/30 flex items-center justify-center">
                            <Cake className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold group-hover:text-primary transition-colors">
                                {customer.name}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-muted-foreground uppercase font-medium">
                                    {customer.company?.name || 'Personal'}
                                </span>
                                {customer.date_of_birth && (
                                    <>
                                        <span className="text-[10px] text-muted-foreground">•</span>
                                        <span className="text-[10px] text-pink-600 dark:text-pink-400 font-bold">
                                            {new Date(customer.date_of_birth).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </Link>
            ))}
        </div>
    );
}
