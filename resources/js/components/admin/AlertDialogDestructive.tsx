import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface Props {
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export function AlertDialogDestructive({
  onConfirm,
  title = "Delete record?",
  description = "This action cannot be undone. This will permanently delete the data from our servers."
}: Props) {
  return (
    <AlertDialog>
      {/* We use asChild and a DropdownMenuItem here so it fits inside your menu perfectly */}
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) => e.preventDefault()} // CRITICAL: Prevents menu from closing before dialog opens
          className="text-red-600 focus:text-red-600 cursor-pointer"
        >
          <Trash2Icon className="w-4 h-4 mr-2 text-red-600 focus:text-red-600 cursor-pointer" />
          <span>Delete</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* Call the onConfirm function when clicked */}
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
