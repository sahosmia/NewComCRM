import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AppLayout from "@/layouts/app-layout";
import {
    Edit,
    Package,
    Layers,
    Tag,
    Truck,
    CircleDollarSign,
    Box,
    FileText,
    ExternalLink
} from "lucide-react";

export default function Show({ product }: any) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: "Products", href: route('products.index') },
                { title: product.name, href: route('products.show', product.id) }
            ]}
        >
                        <Head title={`${product.name}`} />

            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs uppercase px-2 py-0">
                                {product.category || "General"}
                            </Badge>
                            <span className="text-muted-foreground text-sm">SKU: PRD-{product.id.toString().padStart(4, '0')}</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route("products.edit", product.id)}>
                            <Button size="sm" className="gap-2">
                                <Edit className="w-4 h-4" /> Edit Product
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Specifications Card */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Layers className="w-5 h-5 text-blue-500" />
                                Product Specifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                            <div className="space-y-4">
                                <InfoItem icon={<Tag className="w-4 h-4" />} label="Brand" value={product.brand} />
                                <InfoItem icon={<Package className="w-4 h-4" />} label="Model" value={product.model} />
                            </div>
                            <div className="space-y-4">
                                <InfoItem icon={<Layers className="w-4 h-4" />} label="Category" value={product.category} />
                                <InfoItem icon={<Truck className="w-4 h-4" />} label="Supplier" value={product.supplier_name} />
                            </div>

                            <Separator className="md:col-span-2" />

                            <div className="md:col-span-2 space-y-3">
                                <h4 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                                    <FileText className="w-4 h-4" /> Description
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-md border border-slate-100 italic">
                                    {product.description || "No specific description provided for this product."}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Inventory & Source Sidebar */}
                    <div className="space-y-6">
                        {/* Stock & Pricing */}
                        <Card className="border-l-4 border-l-emerald-500 shadow-md">
                            <CardContent className="pt-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="p-2 bg-emerald-50 rounded-lg">
                                        <CircleDollarSign className="w-6 h-6 text-emerald-600" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-muted-foreground uppercase">Unit Price</p>
                                        <p className="text-2xl font-bold text-emerald-600">৳ {Number(product.unit_price).toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t pt-4">
                                    <div className="p-2 bg-amber-50 rounded-lg">
                                        <Box className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-medium text-muted-foreground uppercase">Stock Level</p>
                                        <p className={`text-2xl font-bold ${product.stock_quantity < 10 ? 'text-red-600' : 'text-slate-800'}`}>
                                            {product.stock_quantity} <span className="text-sm font-normal text-muted-foreground italic">units</span>
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Purchase Source */}
                        <Card className="bg-blue-50/50 border-blue-100">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-bold flex items-center gap-2 text-blue-700">
                                    <ExternalLink className="w-4 h-4" /> Purchase Source
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-blue-600 leading-snug">
                                    {product.source || "No source info added."}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// Helper Component for consistent info layout
function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | null }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 text-muted-foreground">{icon}</div>
            <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-tight">{label}</p>
                <p className="text-sm font-semibold">{value || "—"}</p>
            </div>
        </div>
    );
}
