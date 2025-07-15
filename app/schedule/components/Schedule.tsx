'use client';

import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThoiKhoaBieuTheoHocKy } from "../page";
import Timetable from "./Timetable";

export default function Schedule({ data }: { data: ThoiKhoaBieuTheoHocKy[] }) {
	const [selectedId, setSelectedId] = useState<string>("");

	const currentHocKy = data.find((hocKy) => hocKy.id === selectedId)!;

	return (
		<div className="w-full space-y-4">
			<Select onValueChange={setSelectedId}>
				<SelectTrigger className="w-full bg-white">
					<SelectValue placeholder="Chọn học kỳ" />
				</SelectTrigger>
				<SelectContent>
					{data.map((hocKy) => (
						<SelectItem key={hocKy.id} value={hocKy.id}>
							{hocKy.tenHocKy}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{selectedId && (
				<ScrollArea className="h-[calc(100vh-7rem)] w-full rounded-3xl [&>[data-slot=scroll-area-scrollbar]]:hidden">
					<Timetable data={currentHocKy.thoiKhoaBieu}/>
				</ScrollArea>
			)}
		</div>
	);
}