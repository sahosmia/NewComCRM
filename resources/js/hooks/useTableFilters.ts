import { useState, useEffect, useCallback, useMemo } from 'react';
import { router, usePage } from '@inertiajs/react';
import { PaginationType } from '@/types';

interface UseTableFiltersProps<T> {
    data: PaginationType<T>;
    routeName: string;
}

export const useTableFilters = <T extends { id: number }>({
    data,
    routeName,
}: UseTableFiltersProps<T>) => {

    const { url } = usePage();

    // ✅ Memoize query parsing (IMPORTANT)
    const queryParams = useMemo(() => {
        return new URLSearchParams(url.split('?')[1] || '');
    }, [url]);

    const paramsObject = useMemo(() => {
        return Object.fromEntries(queryParams.entries());
    }, [queryParams]);

    // ✅ Initialize state from URL (once)
    const [perPage, setPerPage] = useState(() =>
        queryParams.get('per_page') || String(data.per_page || '10')
    );

    const [search, setSearch] = useState(() =>
        queryParams.get('search') || ""
    );

    // ✅ Use Set instead of Array (O(1) lookup)
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

    const perPageOptions = ['5', '10', '20', '50'];

    // ✅ Centralized filter apply
    const applyFilters = useCallback(
        (newFilters: { search?: string; per_page?: string; page?: number }) => {

            const params: Record<string, any> = {
                ...paramsObject, // ✅ preserve other filters
                search: newFilters.search ?? search,
                per_page: newFilters.per_page ?? perPage,
                page: newFilters.page,
            };

            // ✅ clean params
            if (!params.search) delete params.search;
            if (params.per_page === '10') delete params.per_page;

            router.get(route(routeName), params, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        },
        [perPage, search, routeName, paramsObject]
    );

    // ✅ Debounced search (fixed deps)
    useEffect(() => {
        if (search === "" && !queryParams.has('search')) return;

        const timeout = setTimeout(() => {
            applyFilters({ search });
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, applyFilters, queryParams]);

    // ✅ Sync state when URL changes (VERY IMPORTANT)
    useEffect(() => {
        setSearch(queryParams.get('search') || "");
        setPerPage(queryParams.get('per_page') || String(data.per_page || '10'));
    }, [queryParams, data.per_page]);

    // ✅ Pagination
    const handlePageChange = useCallback((url: string | null) => {
        if (!url) return;

        const urlParams = new URLSearchParams(url.split('?')[1]);
        const page = urlParams.get('page');

        applyFilters({ page: page ? Number(page) : undefined });
    }, [applyFilters]);

    // ✅ Handlers
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, []);

    const handlePerPageChange = useCallback((value: string) => {
        setPerPage(value);
        applyFilters({ per_page: value, page: 1 });
    }, [applyFilters]);

    // ✅ Selection (optimized)
    const handleSelectItem = useCallback((id: number) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    }, []);

    const handleSelectAllItems = useCallback(() => {
        setSelectedItems(prev => {
            if (prev.size === data.data.length) return new Set();
            return new Set(data.data.map(item => item.id));
        });
    }, [data.data]);

    const resetFilters = () => {
        router.get(route(route().current() as string), {}, {
            replace: true,
            preserveState: false,
        });
    };

    return {
        queryParams: paramsObject,
        perPage,
        perPageOptions,
        search,
        selectedItems: Array.from(selectedItems), // UI compatibility
        setSelectedItems,
        applyFilters,
        handlePageChange,
        handleSearchChange,
        handlePerPageChange,
        handleSelectItem,
        handleSelectAllItems,
        resetFilters,
    };
};
