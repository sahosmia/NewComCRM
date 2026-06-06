import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, LayoutList, Percent, Settings, Drill, } from "lucide-react";
import { Company, Requirement, RequirementItem, User } from "@/types";
import { CustomerType } from "@/types";
import { Product } from "@/types";
import { Unit } from "@/types";
import { useState } from "react";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import { FormSelect } from "@/components/admin/form/FormSelect";
import { RequirementOptions } from "./Columns";
import { Card, CardContent } from "@/components/ui/card";
import { RequirementItemRow } from "./com/RequirementItemRow";
import { FormSummaryFooter } from "./com/FormSummaryFooter";
import { ServiceSection } from "./com/ServiceSection";
import FormLabel from "@/components/admin/form/FormLabel";
import { useModal } from "@/contexts/ModalContext";


interface Props {
    requirement?: Requirement;
    customers: CustomerType[];
    products: Product[];
    units: Unit[];
    users: User[];
        companies: Company[];

}

export default function RequirementForm({ requirement, customers: initialCustomers, products: initialProducts, units: initialUnits, users, companies }: Props) {
    const { openModal } = useModal();
    const [customers, setCustomers] = useState<CustomerType[]>(initialCustomers);
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [units, setUnits] = useState<Unit[]>(initialUnits);
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedCustomerId = urlParams.get('customer_id');

    const { data, setData, post, put, processing, errors } = useForm({
        customer_id: requirement?.customer_id || (preSelectedCustomerId ? parseInt(preSelectedCustomerId) : ""),
        title: requirement?.title || "",
        notes: requirement?.notes || "",
        status: requirement?.status || "pending",

        ait_percentage: requirement?.ait_percentage ?? (requirement ? 0 : 5),
        vat_percentage: requirement?.vat_percentage ?? (requirement ? 0 : 10),

        has_accessories: !!(requirement?.has_accessories ?? false),
        accessories: requirement?.accessories || [
            { title: "", quantity: 1, unit_id: "", price: "" }
        ],

        has_installation: !!(requirement?.has_installation ?? false),
        installations: requirement?.installations || [
            { title: "", quantity: 1, unit_id: "", price: "" }
        ],

        price_validity_days: requirement?.price_validity_days || "",
        delivery_time_days: requirement?.delivery_time_days || "",
        advance_payment: requirement?.advance_payment ?? 0,
        before_payment: requirement?.before_payment ?? 0,
        after_payment: requirement?.after_payment ?? 0,
        delivery_location: requirement?.delivery_location || "",
        send_qutation_to: requirement?.send_qutation_to || "",
        qutation_send_by: requirement?.qutation_send_by || "",

        items: requirement?.items || [
            { product_id: 0, quantity: 1, unit_price: "", costing_price: 0, description: "" }
        ],
    });

    const addItem = () => {
        setData("items", [...data.items, { product_id: 0, quantity: 1, unit_price: "", costing_price: 0, description: "" }]);
    };

    const removeItem = (index: number) => {
        setData("items", data.items.filter((_: any, i: number) => i !== index));
    };

    const handleItemChange = (index: number, field: keyof RequirementItem | 'description' | 'costing_price', value: string | number, productFallback?: Product) => {
        const newItems = data.items.map((item, i) => {
            if (i !== index) return item;

            if (field === "product_id") {
                const product = productFallback || products.find(p => p.id === parseInt(String(value)));
                return {
                    ...item,
                    product_id: parseInt(String(value)),
                    unit_price: product ? product.unit_price : "",
                    description: product ? (product.description || "") : "",
                };
            }

            return { ...item, [field]: value };
        }) as RequirementItem[];

        setData("items", newItems);
    };

    const aitPercentage = parseFloat(data.ait_percentage as string) || 0;
    const vatPercentage = parseFloat(data.vat_percentage as string) || 0;
    const aitFactor = (aitPercentage > 0 && aitPercentage < 100) ? (1 / (1 - (aitPercentage / 100))) : 1;

    const itemsTotal = data.items.reduce((sum: number, item: any) => {
        return sum + ((parseFloat(item.unit_price) || 0) * (item.quantity || 0) * aitFactor);
    }, 0);

    const itemsCostingTotal = data.items.reduce((sum: number, item: any) => {
        return sum + (parseFloat(item.costing_price) || 0);
    }, 0);

    const accessoriesTotal = data.has_accessories ? data.accessories.reduce((sum: number, item: any) => {
        return sum + (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0) * aitFactor;
    }, 0) : 0;

    const installationTotal = data.has_installation ? data.installations.reduce((sum: number, item: any) => {
        return sum + (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0) * aitFactor;
    }, 0) : 0;

    const subTotal = itemsTotal + accessoriesTotal + installationTotal;

    const taxableAmount = itemsTotal + accessoriesTotal + installationTotal;

    const vatAmount = vatPercentage > 0 ? (taxableAmount * vatPercentage / 100) : 0;

    const grandTotal = subTotal + vatAmount;

    const aitAmount = (aitPercentage > 0 && aitPercentage < 100) ? (subTotal - (subTotal / aitFactor)) : 0;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        requirement ? put(route("requirements.update", requirement.id)) : post(route("requirements.store"));
    };

    return (
        <form onSubmit={submit} className="max-w-6xl mx-auto space-y-6 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Main Details */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="overflow-hidden border-none shadow-sm ring-1 ring-slate-200">
                        <div className="p-4 bg-slate-50/50 border-b border-slate-200">
                            <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                                <LayoutList className="w-4 h-4 text-primary" /> Basic Information
                            </h3>
                        </div>
                        <CardContent className=" space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <FormLabel required>Requirement Title</FormLabel>
                                    <Input
                                        placeholder="Enter title (e.g. Server Maintenance 2024)"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="h-10"
                                    />
                                    <ErrorMessage message={errors.title} />
                                </div>
                                <div className="space-y-2">
                                    <GenericCombobox
                                        required
                                        label="Customer Information"
                                        items={customers.map(c => ({ id: c.id, name: c.full_name_with_company || `${c.name} - ${c.company?.name || ''}` }))}
                                        selectedId={data.customer_id}
                                        placeholder="Select Customer"
                                        searchPlaceholder="Search customers..."
                                        onSelect={(id) => setData("customer_id", id as number)}
                                        error={errors.customer_id}
                                        renderAction={
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal('CREATE_CUSTOMER', {
                                                        users: users,
                                                        companies: companies,
                                                        onSuccess: (newCustomer: CustomerType) => {
                                                            setCustomers(prev => [...prev, newCustomer]);
                                                            setData('customer_id', newCustomer.id);
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <GenericCombobox
                                        label="Send Quotation To"
                                        items={customers.map(c => ({ id: c.id, name: c.full_name_with_company || `${c.name} - ${c.company?.name || ''}` }))}
                                        selectedId={data.send_qutation_to}
                                        onSelect={(id) => setData("send_qutation_to", id as number)}
                                        placeholder="Select Recipient (Optional)"
                                        searchPlaceholder="Search customers..."
                                        error={errors.send_qutation_to}
                                         renderAction={
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal('CREATE_CUSTOMER', {
                                                        users: users,
                                                        companies: companies,
                                                        onSuccess: (newCustomer: CustomerType) => {
                                                            setCustomers(prev => [...prev, newCustomer]);
                                                            setData('send_qutation_to', newCustomer.id);
                                                        }
                                                    });
                                                }}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <GenericCombobox
                                        label="Quotation Sent By"
                                        items={users.map(u => ({ id: u.id, name: u.name }))}
                                        selectedId={data.qutation_send_by}
                                        onSelect={(id) => setData("qutation_send_by", id as number)}
                                        placeholder="Select Sender (Optional)"
                                        searchPlaceholder="Search users..."
                                        error={errors.qutation_send_by}
                                        renderAction={
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal('CREATE_CUSTOMER', {
                                                        users: users,
                                                        companies: companies,
                                                        onSuccess: (newCustomer: CustomerType) => {
                                                            setCustomers(prev => [...prev, newCustomer]);
                                                            setData('qutation_send_by', newCustomer.id);
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
                        </CardContent>
                    </Card>

                    {/* Items Section moved inside main column */}
                    <div className="bg-card border-none shadow-sm ring-1 ring-slate-200 rounded-xl overflow-hidden">
                        <div className="p-4 bg-slate-50/50 flex justify-between items-center border-b border-slate-200">
                            <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                                <Plus className="w-4 h-4 text-primary" /> Requirement Items
                            </h3>
                            <Button type="button" variant="outline" size="sm" onClick={addItem} className="h-8 gap-1 bg-background border-slate-200 hover:bg-slate-50">
                                <Plus className="w-3.5 h-3.5" /> Add New Item
                            </Button>
                        </div>

                        <div className="p-6 space-y-4">
                            {data.items.map((item, index) => (
                                <RequirementItemRow
                                    key={index}
                                    index={index}
                                    item={item}
                                    products={products}
                                    aitFactor={aitFactor}
                                    onItemChange={handleItemChange}
                                    onRemove={removeItem}
                                    isRemoveDisabled={data.items.length === 1}
                                    errors={errors}
                                     units={units}
                                     onProductCreated={(newProduct: Product) => {
                                         setProducts(prev => [...prev, newProduct]);
                                     }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Sidebar Info */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm ring-1 ring-slate-200">
                        <div className="p-4 bg-slate-50/50 border-b border-slate-200">
                            <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                                <Settings className="w-4 h-4 text-primary" /> Delivery & Status
                            </h3>
                        </div>
                        <CardContent className=" space-y-5">
                            <div className="space-y-2">
                                <FormSelect
                                    required
                                    label="Status"
                                    value={data.status}
                                    onChange={(v) => setData("status", v as Requirement["status"])}
                                    options={RequirementOptions}
                                    error={errors.status}
                                />
                            </div>

                            <div className="space-y-2">
                                <FormLabel>Delivery Location</FormLabel>
                                <Input
                                    placeholder="e.g. Main Warehouse"
                                    value={data.delivery_location}
                                    onChange={(e) => setData("delivery_location", e.target.value)}
                                    className="h-10"
                                />
                                <ErrorMessage message={errors.delivery_location} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <FormLabel required>Timeline (Days)</FormLabel>
                                    <Input
                                        type="number"
                                        value={data.delivery_time_days}
                                        onChange={(e) => setData("delivery_time_days", e.target.value)}
                                        placeholder="0"
                                        className="h-10"
                                    />
                                    <ErrorMessage message={errors.delivery_time_days} />
                                </div>
                                <div className="space-y-2">
                                    <FormLabel required>Validity (Days)</FormLabel>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={data.price_validity_days}
                                        onChange={(e) => setData("price_validity_days", e.target.value)}
                                        className="h-10"
                                    />
                                    <ErrorMessage message={errors.price_validity_days} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm ring-1 ring-slate-200">
                        <div className="p-4 bg-slate-50/50 border-b border-slate-200">
                            <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                                <Percent className="w-4 h-4 text-primary" /> Taxes & Payments
                            </h3>
                        </div>
                        <CardContent className=" space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <FormLabel required>VAT (%)</FormLabel>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            className="pr-8 h-10"
                                            value={data.vat_percentage}
                                            onChange={(e) => setData("vat_percentage", e.target.value)}
                                        />
                                        <Percent className="w-3.5 h-3.5 absolute right-3 top-3.5 text-slate-400" />
                                    </div>
                                    <ErrorMessage message={errors.vat_percentage} />
                                </div>
                                <div className="space-y-2">
                                    <FormLabel required>AIT (%)</FormLabel>
                                    <div className="relative">
                                        <Input
                                            type="number"
                                            className="pr-8 h-10"
                                            value={data.ait_percentage}
                                            onChange={(e) => setData("ait_percentage", e.target.value)}
                                        />
                                        <Percent className="w-3.5 h-3.5 absolute right-3 top-3.5 text-slate-400" />
                                    </div>
                                    <ErrorMessage message={errors.ait_percentage} />
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <FormLabel required>Advance (%)</FormLabel>
                                        <span className="text-[10px] font-medium text-slate-500">{data.advance_payment}%</span>
                                    </div>
                                    <Input
                                        type="number"
                                        value={data.advance_payment === 0 ? "" : data.advance_payment}
                                        onChange={(e) => setData("advance_payment", e.target.value === "" ? 0 : Number(e.target.value))}
                                        className="h-10"
                                    />
                                    <ErrorMessage message={errors.advance_payment} />
                                </div>

                                <div className="space-y-2">
                                    <FormLabel>Before Delivery (%)</FormLabel>
                                    <Input
                                        type="number"
                                        value={data.before_payment === 0 ? "" : data.before_payment}
                                        onChange={(e) => {
                                            const val = e.target.value === "" ? 0 : Number(e.target.value);
                                            setData(d => ({
                                                ...d,
                                                before_payment: val,
                                                after_payment: val > 0 ? 0 : d.after_payment
                                            }));
                                        }}
                                        disabled={Number(data.after_payment) > 0}
                                        className="h-10"
                                    />
                                    <ErrorMessage message={errors.before_payment} />
                                </div>

                                <div className="space-y-2">
                                    <FormLabel>After Delivery (%)</FormLabel>
                                    <Input
                                        type="number"
                                        value={data.after_payment === 0 ? "" : data.after_payment}
                                        onChange={(e) => {
                                            const val = e.target.value === "" ? 0 : Number(e.target.value);
                                            setData(d => ({
                                                ...d,
                                                after_payment: val,
                                                before_payment: val > 0 ? 0 : d.before_payment
                                            }));
                                        }}
                                        disabled={Number(data.before_payment) > 0}
                                        className="h-10"
                                    />
                                    <ErrorMessage message={errors.after_payment} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm ring-1 ring-slate-200">
                        <div className="p-4 bg-slate-50/50 border-b border-slate-200">
                            <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-700">
                                <LayoutList className="w-4 h-4 text-primary" /> Internal Remarks
                            </h3>
                        </div>
                        <CardContent className="">
                            <Textarea
                                className="bg-background resize-none text-sm border-slate-200 focus:border-primary/50"
                                rows={4}
                                placeholder="Add special instructions for team..."
                                value={data.notes}
                                onChange={(e) => setData("notes", e.target.value)}
                            />
                            <ErrorMessage message={errors.notes} />
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="space-y-6">
                {/* Accessories Section */}
                <ServiceSection
                    title="Accessories"
                    icon={<Settings className="w-4 h-4 text-primary" />}
                    hasService={data.has_accessories}
                    onServiceToggle={(v) => setData("has_accessories", v)}
                    prefix="accessories"
                    items={data.accessories}
                    setItems={(items) => setData("accessories", items)}
                    units={units}
                    aitFactor={aitFactor}
                    errors={errors}
                    onUnitCreated={(newUnit: Unit) => {
                        setUnits(prev => [...prev, newUnit]);
                    }}
                />

                {/* Installation Section */}
                <ServiceSection
                    title="Installation"
                    icon={<Drill className="w-4 h-4 text-primary" />}
                    hasService={data.has_installation}
                    onServiceToggle={(v) => setData("has_installation", v)}
                    prefix="installations"
                    items={data.installations}
                    setItems={(items) => setData("installations", items)}
                    units={units}
                    aitFactor={aitFactor}
                    errors={errors}
                    onUnitCreated={(newUnit: Unit) => {
                        setUnits(prev => [...prev, newUnit]);
                    }}
                />
            </div>


            {/* Grand Total Footer */}
            {/* Footer Summary */}
            <FormSummaryFooter
                subTotal={subTotal}
                vatAmount={vatAmount}
                aitAmount={aitAmount}
                grandTotal={grandTotal}
                vatPercentage={Number(data.vat_percentage)}
                aitPercentage={Number(data.ait_percentage)}
                totalCostingPrice={itemsCostingTotal}
                processing={processing}
                isEdit={!!requirement}
            />
        </form>
    );
}
