import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/admin/form/FormSelect";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import { Requirement, Unit } from "@/types";
import FormLabel from "@/components/admin/form/FormLabel";
import { memo } from "react";

interface ServiceSectionProps {
    title: string;
    icon: React.ReactNode;
    hasService: boolean;
    onServiceToggle: (val: boolean) => void;
    prefix: "accessories" | "installation";
    data: Partial<Requirement>;
    setData: (field: string, value: string | number | boolean) => void;
    units: Unit[];
    aitFactor: number;
    errors: Record<string, string>;
}

export const ServiceSection = memo(({ title, icon, hasService, onServiceToggle, prefix, data, setData, units, aitFactor, errors }: ServiceSectionProps) => {
    return (
        <div className="bg-card border rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-4 bg-muted/40 flex justify-between items-center border-b">
                <h3 className="font-bold flex items-center gap-2 uppercase text-xs tracking-widest text-muted-foreground">
                    {icon} {title}
                </h3>
                <div className="flex items-center space-x-2">
                    <Checkbox id={`has_${prefix}`} checked={hasService} onCheckedChange={onServiceToggle} />
                    <Label htmlFor={`has_${prefix}`} className="text-xs font-medium">Include {title}</Label>
                </div>
            </div>
            {hasService && (
                <div className="p-4 space-y-4 animate-in fade-in slide-in-from-top-1">
                    <div className="grid grid-cols-12 gap-3 items-end">
                        <div className="col-span-12 md:col-span-5 space-y-1.5">
                            <FormLabel>{title} Title</FormLabel>
                            <Input
                                value={(data[`${prefix}_title` as keyof Requirement] as string) || ""}
                                onChange={(e) => setData(`${prefix}_title`, e.target.value)}
                            />
                            <ErrorMessage message={errors[`${prefix}_title`]} />
                        </div>
                        <div className="col-span-4 md:col-span-1 space-y-1.5">
                            <FormLabel>Quantity</FormLabel>
                            <Input
                                type="number"
                                className="text-center"
                                value={(data[`${prefix}_quantity` as keyof Requirement] as string | number) || ""}
                                onChange={(e) => setData(`${prefix}_quantity`, parseInt(e.target.value) || 0)}
                            />
                        </div>
                        <div className="col-span-8 md:col-span-2 space-y-1">
                            <FormSelect
                                label="Unit"
                                value={data[`${prefix}_unit_id` as keyof Requirement]?.toString() || ""}
                                onChange={(v) => setData(`${prefix}_unit_id`, v)}
                                options={units.map(u => ({ label: u.short_form, value: u.id.toString() }))}
                                error={errors[`${prefix}_unit_id`]}
                            />
                        </div>
                        <div className="col-span-6 md:col-span-2 space-y-1.5">
                            <FormLabel>Price</FormLabel>
                            <Input
                                type="number"
                                value={(data[`${prefix}_price` as keyof Requirement] as string | number) || ""}
                                onChange={(e) => setData(`${prefix}_price`, e.target.value)}
                            />
                        </div>
                        <div className="col-span-6 md:col-span-2 space-y-1.5">
                            <FormLabel>Total</FormLabel>
                            <div className="h-10 flex items-center px-3 bg-muted/30 rounded-md border border-dashed font-mono font-bold text-sm">
                                ৳{(Number(data[`${prefix}_quantity` as keyof Requirement] || 0) * Number(data[`${prefix}_price` as keyof Requirement] || 0) * aitFactor).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});
