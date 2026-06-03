export default function FormLabel({ children, required = false }: { children: React.ReactNode; required?: boolean }) {
    return (

        <label className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {children}
            {required && <span className="text-red-500 pl-1 ">*</span>}
        </label>
    );
}
