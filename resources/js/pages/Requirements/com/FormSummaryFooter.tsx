import { Button } from "@/components/ui/button";

interface SummaryProps {
    subTotal: number;
    vatAmount: number;
    aitAmount: number;
    grandTotal: number;
    vatPercentage: number;
    aitPercentage: number;
    processing: boolean;
    isEdit: boolean;
}

export const FormSummaryFooter = ({ subTotal, vatAmount, aitAmount, grandTotal, vatPercentage, aitPercentage, processing, isEdit }: SummaryProps) => {
    return (
        <div className="bg-muted/40 p-6 border rounded-xl border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                <div className="flex flex-col gap-1 text-right text-xs text-muted-foreground font-medium">
                    <div>Sub-Total: {subTotal.toLocaleString()}</div>
                    {vatPercentage > 0 && <div>VAT ({vatPercentage}%): {vatAmount.toLocaleString()}</div>}
                    {/* {aitPercentage > 0 && <div>Total AIT ({aitPercentage}%): {aitAmount.toLocaleString()}</div>} */}
                </div>
                <div className="text-right mt-2">
                    <p className="text-[10px] font-black uppercase text-muted-foreground">Grand Total</p>
                    <h2 className="text-3xl font-black text-primary tracking-tighter">
                        ৳{grandTotal.toLocaleString()}
                    </h2>
                </div>
            </div>
            <Button type="submit" size="lg" className="w-full md:w-64 h-14 text-lg font-bold" disabled={processing}>
                {processing ? "Saving..." : isEdit ? "Update Requirement" : "Create Requirement"}
            </Button>
        </div>
    );
};
