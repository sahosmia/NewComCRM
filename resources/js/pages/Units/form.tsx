import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Unit } from "@/types/unit";
import { Loader2 } from "lucide-react";
import ErrorMessage from "@/components/admin/form/ErrorMessage";

interface Props {
    unit?: Unit;
}

export default function UnitForm({ unit }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: unit?.title || "",
        short_form: unit?.short_form || "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (unit) {
            put(route("units.update", unit.id));
        } else {
            post(route("units.store"));
        }
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        placeholder="e.g. Kilogram"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        className={errors.title ? "border-red-500" : ""}
                    />
                    <ErrorMessage message={errors.title} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="short_form">Short Form</Label>
                    <Input
                        id="short_form"
                        placeholder="e.g. KG"
                        value={data.short_form}
                        onChange={(e) => setData("short_form", e.target.value)}
                        className={errors.short_form ? "border-red-500" : ""}
                    />
                    <ErrorMessage message={errors.short_form} />
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" disabled={processing} className="w-full md:w-32">
                    {processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        unit ? "Update Unit" : "Create Unit"
                    )}
                </Button>
            </div>
        </form>
    );
}
