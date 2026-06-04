import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import FormLabel from '@/components/admin/form/FormLabel';
import InputError from '@/components/input-error';
import { SettingsForm, SettingType } from '@/types';
import { Building2, Mail, Phone, MapPin, Settings2, Image as ImageIcon, ShieldCheck } from 'lucide-react';

interface Props {
    settings: SettingType;
}

const BREADCRUMBS = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Global Settings', href: '#' },
];

export default function Index({ settings }: Props) {
    const { data, setData, post, processing, errors } = useForm<SettingsForm>({
        logo: null,
        favicon: null,
        company_seal: null,
        app_name: (settings.app_name as string) || '',
        email: (settings.email as string) || '',
        phone: (settings.phone as string) || '',
        address: (settings.address as string) || '',
        paginated_quantity: (settings.paginated_quantity as string) || '10',
    });

    const [previews, setPreviews] = useState({
        logo: settings.logo ? `/storage/${settings.logo}` : null,
        favicon: settings.favicon ? `/storage/${settings.favicon}` : null,
        company_seal: settings.company_seal ? `/storage/${settings.company_seal}` : null,
    });

    const handleFileChange = (key: keyof SettingsForm, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData(key, file);
            setPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AppLayout breadcrumbs={BREADCRUMBS}>
            <Head title="Global Settings" />

            <div className="flex-1 space-y-6 p-4 md:p-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Global Settings</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* General Settings */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Settings2 className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>General Settings</CardTitle>
                            </div>
                            <CardDescription>
                                Configure basic application information and branding.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <FormLabel required>Application Name</FormLabel>
                                    <Input
                                        value={data.app_name}
                                        onChange={(e) => setData('app_name', e.target.value)}
                                        placeholder="Enter application name"
                                    />
                                    <InputError message={errors.app_name} />
                                </div>
                            </div>

                            <div className="grid gap-8 md:grid-cols-3">
                                {/* Logo */}
                                <div className="space-y-2">
                                    <FormLabel>Corporate Logo</FormLabel>
                                    <div className="flex flex-col gap-4">
                                        <div className="relative h-32 w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                                            {previews.logo ? (
                                                <img
                                                    src={previews.logo}
                                                    alt="Logo preview"
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            ) : (
                                                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                                            )}
                                        </div>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange('logo', e)}
                                        />
                                        <InputError message={errors.logo} />
                                    </div>
                                </div>

                                {/* Favicon */}
                                <div className="space-y-2">
                                    <FormLabel>Favicon</FormLabel>
                                    <div className="flex flex-col gap-4">
                                        <div className="relative h-32 w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                                            {previews.favicon ? (
                                                <img
                                                    src={previews.favicon}
                                                    alt="Favicon preview"
                                                    className="h-10 w-10 object-contain"
                                                />
                                            ) : (
                                                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                                            )}
                                        </div>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange('favicon', e)}
                                        />
                                        <InputError message={errors.favicon} />
                                    </div>
                                </div>

                                {/* Company Seal */}
                                <div className="space-y-2">
                                    <FormLabel>Company Seal</FormLabel>
                                    <div className="flex flex-col gap-4">
                                        <div className="relative h-32 w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                                            {previews.company_seal ? (
                                                <img
                                                    src={previews.company_seal}
                                                    alt="Seal preview"
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            ) : (
                                                <ShieldCheck className="h-10 w-10 text-muted-foreground" />
                                            )}
                                        </div>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange('company_seal', e)}
                                        />
                                        <InputError message={errors.company_seal} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>Contact Information</CardTitle>
                            </div>
                            <CardDescription>
                                Set the contact details displayed across the platform and reports.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <FormLabel>
                                        <div className="flex items-center gap-1">
                                            <Mail className="h-3 w-3" />
                                            Support Email
                                        </div>
                                    </FormLabel>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="contact@company.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="space-y-2">
                                    <FormLabel>
                                        <div className="flex items-center gap-1">
                                            <Phone className="h-3 w-3" />
                                            Phone Number
                                        </div>
                                    </FormLabel>
                                    <Input
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+1 (555) 000-0000"
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <FormLabel>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        Corporate Address
                                    </div>
                                </FormLabel>
                                <Textarea
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="Enter full corporate address"
                                    rows={3}
                                />
                                <InputError message={errors.address} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* System Configurations */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Settings2 className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>System Configurations</CardTitle>
                            </div>
                            <CardDescription>
                                Technical settings for application behavior.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="max-w-xs space-y-2">
                                <FormLabel required>Default Paginated Quantity</FormLabel>
                                <Input
                                    type="number"
                                    min="1"
                                    value={data.paginated_quantity}
                                    onChange={(e) => setData('paginated_quantity', e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground">
                                    Number of records shown per page in tables.
                                </p>
                                <InputError message={errors.paginated_quantity} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving Changes...' : 'Save Settings'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
