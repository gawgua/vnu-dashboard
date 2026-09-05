"use server";

import { withAuth } from "@/lib/APIHandler";
import { ThoiKhoaBieuResponse } from "@/types/ResponseTypes";
import { cookies } from "next/headers";

export async function getScheduleFromSemester(id: string): Promise<ThoiKhoaBieuResponse[]> {
	return await withAuth(async (apiHandler) => {
		return await apiHandler.getThoiKhoaBieuHocKy(id);
	});
}

export async function saveCustomPeriodTime(periodTime: { start: string, end: string }[]) {
	const cookieStore = await cookies();
	cookieStore.set("customPeriodTime", JSON.stringify(periodTime));
}