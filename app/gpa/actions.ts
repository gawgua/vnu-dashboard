"use server";

import { APIHandler } from "@/lib/APIHandler";
import { cookies } from "next/headers";

export async function getSubjectDetails(idHocPhan: string, hocKyId: string) {
	const token = (await cookies()).get("accessToken")?.value;
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	
	const apiHandler = new APIHandler(token, refreshToken);
	const scores = await apiHandler.getDiemHocPhanHocKy(idHocPhan, hocKyId);
	scores.sort((a, b) => Number.parseFloat(a.trongSo) - Number.parseFloat(b.trongSo));
	
	return scores;
}
