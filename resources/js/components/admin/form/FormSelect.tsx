import FormLabel from '@/components/admin/form/FormLabel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ErrorMessage from './ErrorMessage';

interface Option {
    value: string;
    label: string;
}

interface FormSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    placeholder?: string;
    error?: string;
    className?: string;
}

export function FormSelect({
    label,
    value,
    onChange,
    options,
    placeholder = "Select an option",
    error,
    className
}: FormSelectProps) {
    return (
        <div className={`space-y-2 ${className}`}>
            <FormLabel>{label}</FormLabel>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className={`h-11 ${error ? "border-destructive" : ""}`}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
           <ErrorMessage message={error}/>
        </div>
    );
}
