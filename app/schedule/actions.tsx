"use server";

import { APIHandler } from "@/lib/APIHandler";
import { ThoiKhoaBieuResponse } from "@/types/ResponseTypes";
import { cookies } from "next/headers";

export async function getScheduleFromSemester(id: string): Promise<ThoiKhoaBieuResponse[]> {
	const token = (await cookies()).get("accessToken")?.value;
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	
	const apiHandler = new APIHandler(token, refreshToken);
	const thoiKhoaBieu = await apiHandler.getThoiKhoaBieuHocKy(id);

	return thoiKhoaBieu;
}