"use client";

import { ThoiKhoaBieuResponse } from "@/types/ResponseTypes";
import { Card, CardContent } from "@/components/ui/card";
import { EventInfo } from "./Timetable";
import SubjectPopup from "./SubjectPopup";
import { periodTime } from "@/lib/constants";

function getEventPosition(event: ThoiKhoaBieuResponse): { top: string; height: string } {
	const {startTime, endTime} = getPeriodTime(Number.parseInt(event.tietBatDau), Number.parseInt(event.tietKetThuc));

	const startHour = Number.parseInt(startTime.split(":")[0]);
	const startMinute = Number.parseInt(startTime.split(":")[1]);
	const endHour = Number.parseInt(endTime.split(":")[0]);
	const endMinute = Number.parseInt(endTime.split(":")[1]);

	const startPosition = ((startHour - 6) * 60 + startMinute) / 60;
	const duration =
		((endHour - 6) * 60 + endMinute - (startHour - 6) * 60 - startMinute) /
		60;

	return {
		top: `${startPosition * 60}px`,
		height: `${duration * 60}px`,
	};
}

export function getPeriodTime(start: number, end: number): { startTime: string; endTime: string } {
	return {
		startTime: periodTime[start - 1].start,
		endTime: periodTime[end - 1].end,
	}
}

export default function SubjectCard({ eventInfo }: { eventInfo: EventInfo }) {
	const position = getEventPosition(eventInfo.event);

	const cardClassName = eventInfo.isOverlapped 
		? (eventInfo.isSameTime
			? "absolute bg-primary border-1 shadow-lg z-20 py-0"
			: (eventInfo.isMainOverlap 
				? "absolute left-1 right-1 bg-primary border-0 shadow-sm z-10 py-0"
				: "absolute bg-primary border-1 shadow-lg z-20 py-0"))
		: "absolute left-1 right-1 bg-primary border-0 shadow-sm z-10 py-0";

	const cardStyle = {
		top: position.top,
		height: position.height,
		minHeight: "80px",
		left: eventInfo.isOverlapped && eventInfo.isSameTime && eventInfo.isMainOverlap ? "50%" : (eventInfo.isOverlapped && eventInfo.isSameTime && !eventInfo.isMainOverlap ? "4px" : undefined),
		right: eventInfo.isOverlapped && eventInfo.isSameTime && eventInfo.isMainOverlap ? "4px" : (eventInfo.isOverlapped && eventInfo.isSameTime && !eventInfo.isMainOverlap ? "50%" : (eventInfo.isOverlapped && !eventInfo.isSameTime && !eventInfo.isMainOverlap ? "4px" : undefined)),
		width: eventInfo.isOverlapped && !eventInfo.isSameTime && !eventInfo.isMainOverlap ? "75%" : undefined,
	};

	return (
		<SubjectPopup subject={eventInfo.event}>
			<Card
			key={`${eventInfo.event.maHocPhan}-${eventInfo.event.ngayTrongTuan}-${eventInfo.event.tietBatDau}`}
			className={cardClassName}
			style={cardStyle}
			>
				<CardContent className="p-2 h-full flex flex-col justify-start overflow-hidden">
					<div className="text-white text-xs font-medium leading-tight text-left">
						<div className="mb-1">{eventInfo.event.tenHocPhan + ` (${(eventInfo.event.nhom == "0" ? "CL" : `Nhóm ${eventInfo.event.nhom}`)})`}</div>
						<div className="opacity-90 truncate">
							{(() => {
								const { startTime, endTime } = getPeriodTime(Number.parseInt(eventInfo.event.tietBatDau),	Number.parseInt(eventInfo.event.tietKetThuc));
								return `${startTime} - ${endTime}`;
							})()}
						</div>
						<div className="opacity-90 truncate">{eventInfo.event.tenPhong}</div>
					</div>
				</CardContent>
			</Card>
		</SubjectPopup>
	)
}