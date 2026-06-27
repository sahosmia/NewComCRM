import { FileText, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface InternalNotesCardProps {
    notes?: string;
    title?: string;
    icon?: "notes" | "discussion";
    variant?: "amber" | "blue" | "slate";
    className?: string;
}

export default function InternalNotesCard({
    notes,
    title = "Internal Notes",
    icon = "notes",
    variant = "amber",
    className
}: InternalNotesCardProps) {

    const variants = {
        amber: "bg-amber-50/50 border-amber-200 text-amber-900 dark:bg-amber-950/20 dark:border-amber-900/50 dark:text-amber-200",
        blue: "bg-blue-50/50 border-blue-200 text-blue-900 dark:bg-blue-950/20 dark:border-blue-900/50 dark:text-blue-200",
        slate: "bg-slate-50/50 border-slate-200 text-slate-900 dark:bg-slate-950/20 dark:border-slate-900/50 dark:text-slate-200",
    };

    const iconColor = {
        amber: "text-amber-600 dark:text-amber-400",
        blue: "text-blue-600 dark:text-blue-400",
        slate: "text-slate-600 dark:text-slate-400",
    };

    if (!notes) return null;

    return (
        <Card className={cn(
            "border rounded-xl shadow-sm overflow-hidden relative",
            variants[variant],
            className
        )}>
            <div className="absolute top-0 right-0 p-3 opacity-[0.07] pointer-events-none">
                {icon === "notes" ? <FileText className="w-16 h-16" /> : <MessageSquare className="w-16 h-16" />}
            </div>

            <CardHeader className="py-4 px-5 border-b border-inherit/30">
                <CardTitle className="text-[11px] font-black uppercase tracking-[0.15em] flex items-center gap-2 opacity-80">
                    {icon === "notes" ? (
                        <FileText className={cn("w-3.5 h-3.5", iconColor[variant])} />
                    ) : (
                        <MessageSquare className={cn("w-3.5 h-3.5", iconColor[variant])} />
                    )}
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent className="py-5 px-5">
                <p className={cn(
                    "text-sm leading-relaxed whitespace-pre-wrap relative z-10",
                    variant === "amber" ? "italic" : ""
                )}>
                    {notes}
                </p>
            </CardContent>
        </Card>
    );
}
