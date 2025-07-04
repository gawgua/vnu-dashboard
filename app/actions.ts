"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function logoutAction(): Promise<void> {
	try {
		const cookieStore = await cookies();
		cookieStore.delete("accessToken");
		cookieStore.delete("refreshToken");

		revalidateTag("user-data");
	} catch (error) {
		console.error("Logout failed:", error);
	} finally {
		redirect("/login");
	}
}
