import { Button } from "@/components/ui/button";

interface SummaryProps {
    subTotal: number;
    vatAmount: number;
    aitAmount:number;
    grandTotal: number;
    totalCosting?: number;
    vatPercentage: number;
    processing: boolean;
    isEdit: boolean;
}

export const FormSummaryFooter = ({ subTotal, vatAmount, aitAmount, grandTotal, totalCosting = 0, vatPercentage, processing, isEdit }: SummaryProps) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_0_rgba(0,0,0,0.05)] py-4 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-8 w-full md:w-auto">
                    <div className="hidden sm:flex flex-col gap-0.5 text-slate-500 font-medium">
                        <div className="text-[10px] uppercase tracking-wider">Financial Breakdown</div>
                        <div className="text-xs">
                            <span className="opacity-70">Sub-Total:</span> <span className="font-bold">৳{subTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                         {totalCosting > 0 && (
                            <div className="text-xs">
                                <span className="opacity-70">Total Costing:</span> <span className="font-bold">৳{totalCosting.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            </div>
                        )}
                        {vatPercentage > 0 && (
                            <div className="text-xs">
                                <span className="opacity-70">VAT ({vatPercentage}%):</span> <span className="font-bold">৳{vatAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                            </div>
                        )}
                    </div>

                    <div className="h-10 w-px bg-slate-200 hidden sm:block" />

                    <div className="flex flex-col">
                        <p className="text-[10px] font-black uppercase text-primary/60 tracking-widest leading-none mb-1">Estimated Grand Total</p>
                        <h2 className="text-2xl md:text-3xl font-black text-primary tracking-tighter leading-none">
                            ৳{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button
                        type="submit"
                        size="lg"
                        className="w-full md:w-64 h-12 text-md font-bold shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        disabled={processing}
                    >
                        {processing ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Processing...
                            </span>
                        ) : isEdit ? "Update Requirement" : "Create Requirement"}
                    </Button>
                </div>
            </div>
        </div>
    );
};
