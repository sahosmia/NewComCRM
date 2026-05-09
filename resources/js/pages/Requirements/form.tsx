import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {  Plus, LayoutList,  Percent, Settings, Drill, } from "lucide-react";
import { Requirement, RequirementItem } from "@/types";
import { CustomerType } from "@/types";
import { Product } from "@/types";
import { Unit } from "@/types";
import { GenericCombobox } from "@/components/admin/form/GenericCombobox";
import ErrorMessage from "@/components/admin/form/ErrorMessage";
import { FormSelect } from "@/components/admin/form/FormSelect";
import { RequirementOptions } from "./Columns";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RequirementItemRow } from "./com/RequirementItemRow";
import { FormSummaryFooter } from "./com/FormSummaryFooter";
import { ServiceSection } from "./com/ServiceSection";

interface Props {
    requirement?: Requirement;
    customers: CustomerType[];
    products: Product[];
    units: Unit[];
}

export default function RequirementForm({ requirement, customers, products, units }: Props) {
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedCustomerId = urlParams.get('customer_id');

    const { data, setData, post, put, processing, errors } = useForm({
        customer_id: requirement?.customer_id || (preSelectedCustomerId ? parseInt(preSelectedCustomerId) : ""),
        title: requirement?.title || "",
        notes: requirement?.notes || "",
        status: requirement?.status || "pending",

        ait_percentage: requirement?.ait_percentage ?? (requirement ? 0 : 5),
        vat_percentage: requirement?.vat_percentage ?? (requirement ? 0 : 10),

        has_accessories: requirement?.has_accessories ?? false,
        accessories_title: requirement?.accessories_title || "",
        accessories_quantity: requirement?.accessories_quantity || "",
        accessories_unit_id: requirement?.accessories_unit_id || "",
        accessories_price: requirement?.accessories_price || "",

        has_installation: requirement?.has_installation ?? false,
        installation_title: requirement?.installation_title || "",
        installation_quantity: requirement?.installation_quantity || "",
        installation_unit_id: requirement?.installation_unit_id || "",
        installation_price: requirement?.installation_price || "",

        price_validity_days: requirement?.price_validity_days || "",
        delivery_time_days: requirement?.delivery_time_days || "",
        advance_payment: requirement?.advance_payment ?? 0,
        before_payment: requirement?.before_payment ?? 100,
        delivery_location: requirement?.delivery_location || "",

        items: requirement?.items || [
            { product_id: 0, quantity: 1, unit_price: "", description: "" }
        ],
    });

    const addItem = () => {
        setData("items", [...data.items, { product_id: 0, quantity: 1, unit_price: "", description: "" }]);
    };

    const removeItem = (index: number) => {
        setData("items", data.items.filter((_: any, i: number) => i !== index));
    };

    const handleItemChange = (index: number, field: keyof RequirementItem | 'description', value: string | number) => {
        const newItems = [...data.items] as (RequirementItem)[];


        if (field === "product_id") {
            const product = products.find(p => p.id === parseInt(String(value)));
            newItems[index].product_id = parseInt(String(value));
            newItems[index].unit_price = product ? product.unit_price : "";
            newItems[index].description = product ? (product.description || "") : "";
        } else {
            (newItems[index] as any)[field] = value;
        }
        setData("items", newItems);
    };

    const aitPercentage = parseFloat(data.ait_percentage as string) || 0;
    const vatPercentage = parseFloat(data.vat_percentage as string) || 0;
    const aitFactor = (aitPercentage > 0 && aitPercentage < 100) ? (1 / (1 - (aitPercentage / 100))) : 1;

    const itemsTotal = data.items.reduce((sum: number, item: any) => {
        return sum + (parseFloat(item.unit_price) || 0) * (item.quantity || 0) * aitFactor;
    }, 0);

    const accessoriesTotal = data.has_accessories ? (parseFloat(data.accessories_quantity as string) || 0) * (parseFloat(data.accessories_price as string) || 0) * aitFactor : 0;
    const installationTotal = data.has_installation ? (parseFloat(data.installation_quantity as string) || 0) * (parseFloat(data.installation_price as string) || 0) * aitFactor : 0;

    const subTotal = itemsTotal + accessoriesTotal + installationTotal;

    const vatAmount = vatPercentage > 0 ? (subTotal * vatPercentage / 100) : 0;

    const grandTotal = subTotal + vatAmount;

    const aitAmount = (aitPercentage > 0 && aitPercentage < 100) ? (subTotal - (subTotal / aitFactor)) : 0;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        requirement ? put(route("requirements.update", requirement.id)) : post(route("requirements.store"));
    };

    return (
        <form onSubmit={submit} className="max-w-6xl mx-auto space-y-8 pb-10">
            {/* Top Section: Customer & Status */}
            <Card>
                <CardContent className="space-y-6 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4  ">
                        <div className="space-y-2">
                            <GenericCombobox
                                label="Customer Information"
                                items={customers.map(c => ({ id: c.id, name: c.full_name_with_company || `${c.name} - ${c.company?.name || ''}` }))}
                                selectedId={data.customer_id}
                                onSelect={(id) => setData("customer_id", id as number)}
                                placeholder="Select Customer"
                                searchPlaceholder="Search customers..."
                            />
                            <ErrorMessage message={errors.customer_id} />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Requirement Title</Label>
                            <Input
                                placeholder="Requirement Title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                            />
                            <ErrorMessage message={errors.title} />
                        </div>

                        <div className="space-y-1.5">
                            <Input
                                placeholder="Location"
                                value={data.delivery_location}
                                onChange={(e) => setData("delivery_location", e.target.value)}
                            />
                            <ErrorMessage message={errors.delivery_location} />
                        </div>






                        {/* --- Section 1: Terms & Delivery  */}
                        <div className="space-y-2">
                            <Label>Advance Payment (%)</Label>
                            <Input
                                type="number"
                                value={data.advance_payment === 0 ? "" : data.advance_payment}
                                onChange={(e) => setData("advance_payment", e.target.value === "" ? 0 : Number(e.target.value))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Before Delivery Payment (%)</Label>
                            <Input
                                type="number"
                                value={data.before_payment === 0 ? "" : data.before_payment}
                                onChange={(e) => setData("before_payment", e.target.value === "" ? 0 : Number(e.target.value))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Delivery Timeline (Days)</Label>
                            <Input
                                type="number"
                                value={data.delivery_time_days}
                                onChange={(e) => setData("delivery_time_days", e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <FormSelect
                                label="Status"
                                value={data.status}
                                onChange={(v) => setData("status", v as Requirement["status"])}
                                options={RequirementOptions}
                                error={errors.status}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Price Validity (Days)</Label>
                            <Input
                                type="number"
                                placeholder="Days"
                                value={data.price_validity_days}
                                onChange={(e) => setData("price_validity_days", e.target.value)}
                            />
                            <ErrorMessage message={errors.price_validity_days} />
                        </div>

                        <div className="space-y-2">

                            <Label htmlFor="has_vat" className="text-xs font-bold uppercase text-muted-foreground tracking-tighter">Include VAT</Label>
                            <div className="relative ">
                                <Input
                                    type="number"
                                    size={1}
                                    className=" text-xs pr-6"
                                    value={data.vat_percentage}
                                    onChange={(e) => setData("vat_percentage", e.target.value)}
                                />
                                <Percent className="w-3 absolute right-2 top-2 text-muted-foreground" />
                            </div>
                        </div>

                        <div className="space-y-2">

                            <Label htmlFor="has_ait" className="text-xs font-bold uppercase text-muted-foreground tracking-tighter">Include AIT</Label>
                            <div className="relative ">
                                <Input
                                    type="number"
                                    size={1}
                                    className="text-xs pr-6"
                                    value={data.ait_percentage}
                                    onChange={(e) => setData("ait_percentage", e.target.value)}
                                />
                                <Percent className="w-3 absolute right-2 top-2 text-muted-foreground" />
                            </div>

                        </div>

                        <div className="space-y-2 col-span-2">
                            <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">Internal Remarks</label>
                            <Textarea
                                className="bg-background resize-none text-xs border-slate-200 focus:border-primary/50"
                                rows={2}
                                placeholder="Add special instructions for team..."
                                value={data.notes}
                                onChange={(e) => setData("notes", e.target.value)}
                            />
                        </div>
                    </div>




                </CardContent>
            </Card>

            {/* Items Section */}
            <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 bg-muted/40 flex justify-between items-center border-b">
                    <h3 className="font-bold flex items-center gap-2 uppercase text-xs tracking-widest text-muted-foreground">
                        <LayoutList className="w-4 h-4 text-primary" /> Requirement Items
                    </h3>
                    <Button type="button" variant="outline" size="sm" onClick={addItem} className="h-8 gap-1 bg-background">
                        <Plus className="w-4 h-4" /> Add Item
                    </Button>
                </div>

                <div className="p-4 space-y-4">
                    {/* Table Header for Desktop */}
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
                        />
                    ))}
                </div>
            </div>

            {/* Accessories Section */}
            <ServiceSection
                title="Accessories"
                icon={<Settings className="w-4 h-4 text-primary" />}
                hasService={data.has_accessories}
                onServiceToggle={(v) => setData("has_accessories", v)}
                prefix="accessories"
                data={data}
                setData={setData}
                units={units}
                aitFactor={aitFactor}
                errors={errors}
            />

            {/* Installation Section */}
            <ServiceSection
                title="Installation"
                icon={<Drill className="w-4 h-4 text-primary" />}
                hasService={data.has_installation}
                onServiceToggle={(v) => setData("has_installation", v)}
                prefix="installation"
                data={data}
                setData={setData}
                units={units}
                aitFactor={aitFactor}
                errors={errors}
            />


            {/* Grand Total Footer */}
          {/* Footer Summary */}
            <FormSummaryFooter
                subTotal={subTotal}
                vatAmount={vatAmount}
                aitAmount={aitAmount}
                grandTotal={grandTotal}
                vatPercentage={Number(data.vat_percentage)}
                aitPercentage={Number(data.ait_percentage)}
                processing={processing}
                isEdit={!!requirement}
            />
        </form>
    );
}
