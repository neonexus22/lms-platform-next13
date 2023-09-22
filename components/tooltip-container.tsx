import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

type TooltipContainerProps = {
  text: string;
  children: React.ReactNode;
  icon?: LucideIcon;
};

export function TooltipContainer({
  icon: Icon,
  text,
  children,
}: TooltipContainerProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="flex space-x-2 items-center">
          {Icon && <Icon className="h-3 w-3" />}
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
