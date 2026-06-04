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
import { Building2, Mail, Phone, MapPin, Settings2, Image as ImageIcon, ShieldCheck, Globe, MessageSquare, FileText, LayoutList } from 'lucide-react';

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
        secondary_logo: null,
        favicon: null,
        company_seal: null,
        app_name: (settings.app_name as string) || '',
        email: (settings.email as string) || '',
        phone: (settings.phone as string) || '',
        address: (settings.address as string) || '',
        website_url: (settings.website_url as string) || '',
        branding_slogan: (settings.branding_slogan as string) || '',
        branding_services_bar: (settings.branding_services_bar as string) || '',
        support_whatsapp: (settings.support_whatsapp as string) || '',
        office_name_1: (settings.office_name_1 as string) || '',
        office_name_2: (settings.office_name_2 as string) || '',
        office_name_3: (settings.office_name_3 as string) || '',
        office_address_1: (settings.office_address_1 as string) || '',
        office_address_2: (settings.office_address_2 as string) || '',
        office_address_3: (settings.office_address_3 as string) || '',
        footer_contact_info: (settings.footer_contact_info as string) || '',
        paginated_quantity: (settings.paginated_quantity as string) || '10',
    });

    const [previews, setPreviews] = useState({
        logo: settings.logo ? `/storage/${settings.logo}` : null,
        secondary_logo: settings.secondary_logo ? `/storage/${settings.secondary_logo}` : null,
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
                                <div className="space-y-2">
                                    <FormLabel>Branding Slogan / Suffix</FormLabel>
                                    <Input
                                        value={data.branding_slogan}
                                        onChange={(e) => setData('branding_slogan', e.target.value)}
                                        placeholder="e.g., LEADING ICT AND SECURITY SERVICES PROVIDER"
                                    />
                                    <InputError message={errors.branding_slogan} />
                                </div>
                            </div>

                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                                {/* Logo */}
                                <div className="space-y-2">
                                    <FormLabel>Primary Logo</FormLabel>
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

                                {/* Secondary Logo */}
                                <div className="space-y-2">
                                    <FormLabel>Secondary Logo (PDF Header)</FormLabel>
                                    <div className="flex flex-col gap-4">
                                        <div className="relative h-32 w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
                                            {previews.secondary_logo ? (
                                                <img
                                                    src={previews.secondary_logo}
                                                    alt="Secondary Logo preview"
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            ) : (
                                                <ImageIcon className="h-10 w-10 text-muted-foreground" />
                                            )}
                                        </div>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange('secondary_logo', e)}
                                        />
                                        <InputError message={errors.secondary_logo} />
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

                    {/* Contact & Links */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>Contact & Links</CardTitle>
                            </div>
                            <CardDescription>
                                Set the contact details and web links for branding and reports.
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

                                <div className="space-y-2">
                                    <FormLabel>
                                        <div className="flex items-center gap-1">
                                            <Globe className="h-3 w-3" />
                                            Website URL
                                        </div>
                                    </FormLabel>
                                    <Input
                                        type="url"
                                        value={data.website_url}
                                        onChange={(e) => setData('website_url', e.target.value)}
                                        placeholder="https://www.example.com"
                                    />
                                    <InputError message={errors.website_url} />
                                </div>

                                <div className="space-y-2">
                                    <FormLabel>
                                        <div className="flex items-center gap-1">
                                            <MessageSquare className="h-3 w-3" />
                                            Support WhatsApp (Mobile number)
                                        </div>
                                    </FormLabel>
                                    <Input
                                        value={data.support_whatsapp}
                                        onChange={(e) => setData('support_whatsapp', e.target.value)}
                                        placeholder="01911-561554"
                                    />
                                    <InputError message={errors.support_whatsapp} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <FormLabel>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        Default Corporate Address
                                    </div>
                                </FormLabel>
                                <Textarea
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="Enter full corporate address"
                                    rows={2}
                                />
                                <InputError message={errors.address} />
                            </div>
                        </CardContent>
                    </Card>

                    {/* PDF Document Customization */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                                <CardTitle>PDF Document Customization (Footer & Headers)</CardTitle>
                            </div>
                            <CardDescription>
                                Customize the office addresses and contact information displayed on generated PDFs.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <FormLabel>
                                    <div className="flex items-center gap-1">
                                        <LayoutList className="h-3 w-3" />
                                        PDF Services Bar (Separated by |)
                                    </div>
                                </FormLabel>
                                <Input
                                    value={data.branding_services_bar}
                                    onChange={(e) => setData('branding_services_bar', e.target.value)}
                                    placeholder="Server | Networking Equipment | Security Equipment..."
                                />
                                <p className="text-xs text-muted-foreground">This bar appears below the header in Quotation PDFs.</p>
                                <InputError message={errors.branding_services_bar} />
                            </div>

                            <div className="grid gap-6 md:grid-cols-3">
                                {/* Office 1 */}
                                <div className="space-y-3 border-r pr-4">
                                    <div className="space-y-1">
                                        <FormLabel>Office 1 Name</FormLabel>
                                        <Input
                                            value={data.office_name_1}
                                            onChange={(e) => setData('office_name_1', e.target.value)}
                                            placeholder="Elephant Road Branch"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <FormLabel>Office 1 Address</FormLabel>
                                        <Textarea
                                            value={data.office_address_1}
                                            onChange={(e) => setData('office_address_1', e.target.value)}
                                            placeholder="Address line..."
                                            rows={3}
                                        />
                                    </div>
                                </div>

                                {/* Office 2 */}
                                <div className="space-y-3 border-r px-4">
                                    <div className="space-y-1">
                                        <FormLabel>Office 2 Name</FormLabel>
                                        <Input
                                            value={data.office_name_2}
                                            onChange={(e) => setData('office_name_2', e.target.value)}
                                            placeholder="Corporate Office"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <FormLabel>Office 2 Address</FormLabel>
                                        <Textarea
                                            value={data.office_address_2}
                                            onChange={(e) => setData('office_address_2', e.target.value)}
                                            placeholder="Address line..."
                                            rows={3}
                                        />
                                    </div>
                                </div>

                                {/* Office 3 */}
                                <div className="space-y-3 pl-4">
                                    <div className="space-y-1">
                                        <FormLabel>Office 3 Name</FormLabel>
                                        <Input
                                            value={data.office_name_3}
                                            onChange={(e) => setData('office_name_3', e.target.value)}
                                            placeholder="Service Centre"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <FormLabel>Office 3 Address</FormLabel>
                                        <Textarea
                                            value={data.office_address_3}
                                            onChange={(e) => setData('office_address_3', e.target.value)}
                                            placeholder="Address line..."
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <FormLabel>PDF Footer Contact Bar</FormLabel>
                                <Input
                                    value={data.footer_contact_info}
                                    onChange={(e) => setData('footer_contact_info', e.target.value)}
                                    placeholder="E-mail: info@company.com, Hunting: 09666..., Mobile: 01730..."
                                />
                                <InputError message={errors.footer_contact_info} />
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
