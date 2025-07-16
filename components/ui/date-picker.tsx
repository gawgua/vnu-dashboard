"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"

function DatePicker({
	date,
	setDate,
	className,
	align = "center",
}: {
	date?: Date;
	setDate: (date: Date | undefined) => void;
	className?: string;
	align?: "start" | "center" | "end";
}) {
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button className={className}>
					{date ? date.toLocaleDateString() : "Chọn ngày"}
					<ChevronDownIcon />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align={align}>
				<Calendar
					mode="single"
					selected={date}
					captionLayout="dropdown"
					onSelect={(date) => {
						setOpen(false);
						setDate(date);
					}}
				/>
			</PopoverContent>
		</Popover>
	);
}

export { DatePicker }