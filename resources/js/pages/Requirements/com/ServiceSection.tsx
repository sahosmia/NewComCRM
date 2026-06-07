import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import { RequirementServiceItem, Unit } from "@/types";
import FormLabel from "@/components/admin/form/FormLabel";
import { useModal } from "@/contexts/ModalContext";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";

interface ServiceSectionProps {
    title: string;
    icon: React.ReactNode;
    hasService: boolean;
    onServiceToggle: (val: boolean) => void;
    prefix: string; // "accessories" or "installations"
    items: RequirementServiceItem[];
    setItems: (items: RequirementServiceItem[]) => void;
    units: Unit[];
    aitFactor: number;
    errors: any;
    onUnitCreated?: (unit: Unit) => void;
}

export const ServiceSection = ({ title, icon, hasService, onServiceToggle, prefix, items, setItems, units, aitFactor, errors, onUnitCreated }: ServiceSectionProps) => {
    const { openModal } = useModal();

    const addItem = () => {
        setItems([...items, { title: "", quantity: 1, unit_id: "", price: "" }]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleItemChange = (index: number, field: keyof RequirementServiceItem, value: any) => {
        const newItems = [...items];
        (newItems[index] as any)[field] = value;
        setItems(newItems);
    };

    return (
        <div className={`bg-white border rounded-xl shadow-sm overflow-hidden mb-6 transition-all ${hasService ? 'ring-1 ring-primary/20 shadow-md' : 'border-slate-200'}`}>
            <div className={`p-4 flex justify-between items-center border-b transition-colors ${hasService ? 'bg-primary/5 border-primary/10' : 'bg-slate-50/50 border-slate-200'}`}>
                <h3 className={`font-semibold flex items-center gap-2 text-sm transition-colors ${hasService ? 'text-primary' : 'text-slate-700'}`}>
                    {icon} {title}
                </h3>
                <div className="flex items-center gap-4">
                    {hasService && (
                        <Button type="button" variant="outline" size="sm" onClick={addItem} className="h-8 gap-1 bg-background border-slate-200 hover:bg-slate-50">
                            <Plus className="w-3.5 h-3.5" /> Add New
                        </Button>
                    )}
                    <div className="flex items-center space-x-3 bg-white/50 px-3 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
                        <Checkbox id={`has_${prefix}`} checked={hasService} onCheckedChange={onServiceToggle} className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                        <Label htmlFor={`has_${prefix}`} className="text-xs font-bold cursor-pointer text-slate-600">Include {title}</Label>
                    </div>
                </div>
            </div>
            {hasService && (
                <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end border-b pb-6 last:border-0 last:pb-0">
                            <div className="md:col-span-4 lg:col-span-4 space-y-2">
                                <FormLabel required>{title} Service Description</FormLabel>
                                <Input
                                    placeholder={`Enter ${title.toLowerCase()} details...`}
                                    value={item.title}
                                    onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                                    className="h-10 border-slate-200 focus:border-primary/50"
                                />
                                <ErrorMessage message={errors[`${prefix}.${index}.title`]} />
                            </div>
                            <div className="grid grid-cols-3 md:col-span-3 lg:col-span-3 gap-4">
                                <div className="space-y-2">
                                    <FormLabel required>QTY</FormLabel>
                                    <Input
                                        type="number"
                                        className="text-center h-10 font-bold border-slate-200 focus:border-primary/50"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                    />
                                    <ErrorMessage message={errors[`${prefix}.${index}.quantity`]} />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <GenericCombobox
                                        label="Unit"
                                        items={units.map(u => ({ ...u, name: u.short_form }))}
                                        selectedId={item.unit_id}
                                        onSelect={(id, name) => handleItemChange(index, 'unit_id', id)}
                                        placeholder="Select Unit"
                                        searchPlaceholder="Search units..."
                                        allowManualInput={false}
                                        error={errors[`${prefix}.${index}.unit_id`]}
                                        renderAction={
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal('CREATE_UNIT', {
                                                        onSuccess: (unit: Unit) => {
                                                            onUnitCreated && onUnitCreated(unit);
                                                            handleItemChange(index, 'unit_id', unit.id);
                                                        }
                                                    });
                                                }}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        }
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 lg:col-span-2 space-y-2">
                                <FormLabel required>Unit Price</FormLabel>
                                <Input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                                    className="h-10 font-bold border-slate-200 focus:border-primary/50"
                                />
                                <ErrorMessage message={errors[`${prefix}.${index}.price`]} />
                            </div>
                            <div className="md:col-span-2 lg:col-span-2 space-y-2">
                                <FormLabel>Total (Incl. AIT)</FormLabel>
                                <div className="h-10 flex items-center px-4 bg-primary/5 rounded-lg border border-primary/20 font-mono font-black text-sm text-primary shadow-inner">
                                    ৳{(Number(item.quantity || 0) * Number(item.price || 0) * aitFactor).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </div>
                            </div>
                            <div className="md:col-span-1 lg:col-span-1 flex justify-end">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                                    onClick={() => removeItem(index)}
                                    disabled={items.length === 1}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <ErrorMessage message={errors[`${prefix}`]} />
                </div>
            )}
        </div>
    );
};
