import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormSelect } from "@/components/admin/form/FormSelect";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import { Unit } from "@/types";
import FormLabel from "@/components/admin/form/FormLabel";

interface ServiceSectionProps {
    title: string;
    icon: React.ReactNode;
    hasService: boolean;
    onServiceToggle: (val: boolean) => void;
    prefix: string; // "accessories" or "installation"
    data: any;
    setData: (field: string, value: any) => void;
    units: Unit[];
    aitFactor: number;
    errors: any;
}

export const ServiceSection = ({ title, icon, hasService, onServiceToggle, prefix, data, setData, units, aitFactor, errors }: ServiceSectionProps) => {
    return (
        <div className={`bg-white border rounded-xl shadow-sm overflow-hidden mb-6 transition-all ${hasService ? 'ring-1 ring-primary/20 shadow-md' : 'border-slate-200'}`}>
            <div className={`p-4 flex justify-between items-center border-b transition-colors ${hasService ? 'bg-primary/5 border-primary/10' : 'bg-slate-50/50 border-slate-200'}`}>
                <h3 className={`font-semibold flex items-center gap-2 text-sm transition-colors ${hasService ? 'text-primary' : 'text-slate-700'}`}>
                    {icon} {title}
                </h3>
                <div className="flex items-center space-x-3 bg-white/50 px-3 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
                    <Checkbox id={`has_${prefix}`} checked={hasService} onCheckedChange={onServiceToggle} className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                    <Label htmlFor={`has_${prefix}`} className="text-xs font-bold cursor-pointer text-slate-600">Include {title}</Label>
                </div>
            </div>
            {hasService && (
                <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                        <div className="md:col-span-5 lg:col-span-6 space-y-2">
                            <FormLabel>{title} Service Description</FormLabel>
                            <Input
                                placeholder={`Enter ${title.toLowerCase()} details...`}
                                value={data[`${prefix}_title`]}
                                onChange={(e) => setData(`${prefix}_title`, e.target.value)}
                                className="h-10 border-slate-200 focus:border-primary/50"
                            />
                            <ErrorMessage message={errors[`${prefix}_title`]} />
                        </div>
                        <div className="grid grid-cols-2 md:col-span-3 lg:col-span-2 gap-4">
                            <div className="space-y-2">
                                <FormLabel>QTY</FormLabel>
                                <Input
                                    type="number"
                                    className="text-center h-10 font-bold border-slate-200 focus:border-primary/50"
                                    value={data[`${prefix}_quantity`]}
                                    onChange={(e) => setData(`${prefix}_quantity`, e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <FormSelect
                                    label="Unit"
                                    value={data[`${prefix}_unit_id`].toString()}
                                    onChange={(v) => setData(`${prefix}_unit_id`, v)}
                                    options={units.map(u => ({ label: u.short_form, value: u.id.toString() }))}
                                    error={errors[`${prefix}_unit_id`]}
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 lg:col-span-2 space-y-2">
                            <FormLabel>Unit Price</FormLabel>
                            <Input
                                type="number"
                                value={data[`${prefix}_price`]}
                                onChange={(e) => setData(`${prefix}_price`, e.target.value)}
                                className="h-10 font-bold border-slate-200 focus:border-primary/50"
                            />
                            <ErrorMessage message={errors[`${prefix}_price`]} />
                        </div>
                        <div className="md:col-span-2 lg:col-span-2 space-y-2">
                            <FormLabel className="text-primary font-bold">Total (Incl. AIT)</FormLabel>
                            <div className="h-10 flex items-center px-4 bg-primary/5 rounded-lg border border-primary/20 font-mono font-black text-sm text-primary shadow-inner">
                                ৳{(Number(data[`${prefix}_quantity`] || 0) * Number(data[`${prefix}_price`] || 0) * aitFactor).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
