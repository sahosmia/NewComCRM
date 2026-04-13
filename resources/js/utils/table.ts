import { router } from "@inertiajs/react";

interface ActionOptions {
    onSuccess?: () => void;
    onError?: (errors: any) => void;
    redirectTo?: string;
}

interface BulkDeleteOptions {
    onSuccess?: () => void;
    onError?: (errors: any) => void;
}

export const handleDelete = (
    id: number | string,
    routeName: string,
    options?: ActionOptions
) => {
    router.delete(route(routeName, id), {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
            options?.onSuccess?.();

            if (options?.redirectTo) {
                router.get(route(options.redirectTo));
            }
        },
        onError: options?.onError,
    });
};


export const handleBulkDelete = (
    ids: number[],
    routeName: string,
    options?: BulkDeleteOptions
) => {
    if (!ids.length) return;

    router.delete(route(routeName), {
        data: { ids },
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
            options?.onSuccess?.();
        },
        onError: options?.onError,
    });
};

export const handleToggleStatus = (id: number, newStatus: boolean, url: string) => {
    router.put(
        route(url, id),
        { is_active: newStatus },
        {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                // toast({
                //     title: "Success!",
                //     description: `User ${newStatus ? 'activated' : 'deactivated'} successfully!`,
                //     className: "bg-green-500 text-white",
                // });
            },
            onError: (errors) => {
                console.error('Error toggling item status:', errors);
                // toast({
                //     title: "Error!",
                //     description: "Failed to update user status. Please try again.",
                //     variant: "destructive",
                // });
            }
        }
    );
}




