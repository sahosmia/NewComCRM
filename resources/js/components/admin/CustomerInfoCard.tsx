import { Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

interface CustomerInfoProps {
    customer: {
        id: number;
        name: string;
        designation?: string;
        company?: {
            name: string;
        };
        email?: string;
        phones?: string[];
        addresses?: string[];
    };
}

export default function CustomerInfoCard({ customer }: CustomerInfoProps) {
    return (
        <Card className="shadow-sm border-muted/60">
            <CardHeader className="bg-muted/10 border-b py-3">
                <CardTitle className="text-xs font-bold uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    Contact Information
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pt-5">
                {/* Name & Designation */}
                <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-primary/5 rounded-md">
                        <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <Link href={route('customers.show', customer.id)} className="hover:underline">
                            <p className="text-sm font-bold text-foreground leading-none">{customer.name}</p>
                        </Link>
                        {(customer.designation || customer.company?.name) && (
                            <p className="text-xs text-muted-foreground mt-1.5 leading-tight">
                                {customer.designation} {customer.designation && customer.company?.name ? 'at' : ''} <span className="font-semibold text-foreground/80">{customer.company?.name}</span>
                            </p>
                        )}
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-primary/5 rounded-md">
                        <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground/70 tracking-tighter">Email Address</p>
                        <p className="text-sm font-medium truncate">{customer.email || 'N/A'}</p>
                    </div>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-primary/5 rounded-md">
                        <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div className="w-full">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground/70 tracking-tighter mb-1">Phone & WhatsApp</p>
                        <div className="grid gap-1.5">
                            {customer.phones?.length ? customer.phones.map((p, i) => (
                                <div key={i} className="flex items-center justify-between group bg-muted/20 p-1.5 rounded-md border border-transparent hover:border-emerald-200 hover:bg-emerald-50/30 transition-all">
                                    <span className="text-sm font-semibold text-foreground/80">{p}</span>
                                    <a
                                        href={`https://wa.me/88${p.replace(/\D/g, '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-[10px] bg-emerald-500 text-white px-1.5 py-0.5 rounded shadow-sm opacity-80 hover:opacity-100"
                                    >
                                        <MessageCircle className="w-3 h-3" />
                                        WhatsApp
                                    </a>
                                </div>
                            )) : <p className="text-sm text-muted-foreground">N/A</p>}
                        </div>
                    </div>
                </div>

                {/* Addresses */}
                <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-primary/5 rounded-md">
                        <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground/70 tracking-tighter mb-1">Office / Home Address</p>
                        <div className="space-y-2">
                            {customer.addresses?.length ? customer.addresses.map((a, i) => (
                                <p key={i} className="text-xs text-muted-foreground leading-relaxed italic border-l-2 pl-2 border-primary/20">
                                    {a}
                                </p>
                            )) : <p className="text-sm text-muted-foreground font-light">No address found.</p>}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
