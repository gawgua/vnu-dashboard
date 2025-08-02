"use server";

import { withAuth } from "@/lib/APIHandler";

export async function getSubjectDetails(idHocPhan: string, hocKyId: string) {
	return await withAuth(async (apiHandler) => {
		const scores = await apiHandler.getDiemHocPhanHocKy(idHocPhan, hocKyId);
		scores.sort((a, b) => Number.parseFloat(a.trongSo) - Number.parseFloat(b.trongSo));
		
		return scores;
	});
}