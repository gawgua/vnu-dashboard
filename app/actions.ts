"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAction(): Promise<void> {
	try {
		const cookieStore = await cookies();
		cookieStore.delete("accessToken");
		cookieStore.delete("refreshToken");
	} catch (error) {
		console.error("Logout failed:", error);
	} finally {
		redirect("/login");
	}
}
