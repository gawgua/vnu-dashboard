import { ThoiKhoaBieuResponse } from "@/types/ResponseTypes";
import { getPeriodTime } from "@/app/schedule/components/SubjectCard";
import { createEvents, EventAttributes } from "ics";
import { PeriodTime } from "./constants";

const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
const SEC_PER_DAY = 24 * 60 * 60;

export function toCalendar(data: ThoiKhoaBieuResponse[], startDate: Date, totalWeeks: number, periodTime: PeriodTime[]): string {
	const events: EventAttributes[] = [];

	for (const event of data) {
		const { startTime, endTime } = getPeriodTime(Number.parseInt(event.tietBatDau), Number.parseInt(event.tietKetThuc), periodTime);
		let startDay = startDate.getDay();
		if (startDay === 0) {
			startDay = 7;
		}
		let delta = Number.parseInt(event.ngayTrongTuan) - startDay;
		if (delta < 0) {
			delta += 7;
		}
		
		const endDate = new Date(startDate.getTime() + (totalWeeks * 7 - 1) * SEC_PER_DAY * 1000);
		let endDateStr = endDate.toISOString();
		endDateStr = endDateStr.replaceAll("-", "").replaceAll(":", "").slice(0, endDateStr.length - 9) + "Z"; 
		const e: EventAttributes = {
			title: event.tenHocPhan + (event.nhom === "0"? "" : ` (Nhóm ${event.nhom})`),
			location: event.tenPhong,
			start: new Date(startDate.getTime() + delta * SEC_PER_DAY * 1000).setHours(
				Number.parseInt(startTime.split(":")[0]),
				Number.parseInt(startTime.split(":")[1])
			),
			startInputType: "local",
			startOutputType: "utc",
			end: new Date(startDate.getTime() + delta * SEC_PER_DAY * 1000).setHours(
				Number.parseInt(endTime.split(":")[0]),
				Number.parseInt(endTime.split(":")[1])
			),
			endInputType: "local",
			endOutputType: "utc",
			recurrenceRule: `FREQ=WEEKLY;BYDAY=${days[Number.parseInt(event.ngayTrongTuan) - 1]};UNTIL=${endDateStr}`,
		}
		events.push(e);
	}

	const { error, value } = createEvents(events);
	if (error) {
		throw new Error(`Error creating calendar events: ${error}`);
	}

	return value || '';
}