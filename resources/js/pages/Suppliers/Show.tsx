import { Head, Link } from '@inertiajs/react';
import { ChevronLeft, Mail, Phone, MapPin, FileText, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Supplier } from '@/types';

interface Props {
    supplier: Supplier;
}

export default function Show({ supplier }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Suppliers', href: route('suppliers.index') },
        { title: supplier.name, href: route('suppliers.show', supplier.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Supplier: ${supplier.name}`} />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">{supplier.name}</h1>
                        <p className="text-sm text-muted-foreground">Supplier Details</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route('suppliers.index')}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back to List
                            </Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href={route('suppliers.edit', supplier.id)}>
                                Edit Supplier
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="w-5 h-5 text-primary" />
                                Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {supplier.description && (
                                <div>
                                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">Description</h4>
                                    <p className="text-sm leading-relaxed">{supplier.description}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Mail className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground">Email</p>
                                            <p className="text-sm">{supplier.email || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground">Phone</p>
                                            <p className="text-sm">{supplier.phone || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground">Address</p>
                                            <p className="text-sm whitespace-pre-wrap">{supplier.address || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Package className="w-5 h-5 text-primary" />
                                Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center p-6 bg-muted/50 rounded-xl">
                                <p className="text-3xl font-bold text-primary">--</p>
                                <p className="text-xs text-muted-foreground mt-1">Products Supplied</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
