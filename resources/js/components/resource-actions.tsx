import { Link } from '@inertiajs/react';
import { Plus, SquarePen, Trash2 } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';
import { AlertDialogDestructive } from '@/components/admin/AlertDialogDestructive';
import { handleDelete } from '@/utils/table';
import { cn } from '@/lib/utils';

interface AddResourceButtonProps extends ButtonProps {
    href: string;
    label?: string;
}

export function AddResourceButton({ href, label = "Add", className, ...props }: AddResourceButtonProps) {
    return (
        <Button size="sm" asChild className={cn("gap-2", className)} {...props}>
            <Link href={href}>
                <Plus className="h-4 w-4" />
                <span>{label}</span>
            </Link>
        </Button>
    );
}

interface EditResourceButtonProps extends ButtonProps {
    href: string;
    label?: string;
}

export function EditResourceButton({ href, label = "Edit", className, ...props }: EditResourceButtonProps) {
    return (
        <Button variant="outline" size="sm" asChild className={cn("gap-2", className)} {...props}>
            <Link href={href}>
                <SquarePen className="h-4 w-4" />
                <span>{label}</span>
            </Link>
        </Button>
    );
}

interface DeleteResourceButtonProps extends ButtonProps {
    id: number | string;
    routeName: string;
    label: string;
    redirectTo?: string;
    onSuccess?: () => void;
}

export function DeleteResourceButton({ id, routeName, label, redirectTo, onSuccess, className, ...props }: DeleteResourceButtonProps) {
    return (
        <AlertDialogDestructive
            title={`Delete ${label}?`}
            description={`This action cannot be undone. All data for this ${label.toLowerCase()} will be permanently removed.`}
            onConfirm={() => handleDelete(id, routeName, { redirectTo, onSuccess })}
        >
            <Button variant="destructive" size="sm" className={cn("gap-2", className)} {...props}>
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
            </Button>
        </AlertDialogDestructive>
    );
}
