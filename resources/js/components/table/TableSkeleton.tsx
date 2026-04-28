import { TableRow, TableCell } from "@/components/ui/table";

interface Props {
    columns: number;
}

const TableSkeleton = ({ columns }: Props) => {
    return (
        <>
            {Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i}>
                    {Array.from({ length: columns }).map((_, j) => (
                        <TableCell key={j}>
                            <div className="h-4 w-[80%] animate-pulse rounded bg-muted" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
};

export default TableSkeleton;
