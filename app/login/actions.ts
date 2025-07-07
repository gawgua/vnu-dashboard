"use server";

import { cookies } from "next/headers";
import { APIHandler } from "@/lib/APIHandler";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData): Promise<void> {
	const apiHandler = new APIHandler();
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;
	try {
		const response = await apiHandler.signin(username, password);
		const cookieStore = await cookies();

		cookieStore.set("accessToken", response.accessToken, {
			maxAge: 60 * 60, // 1 hour
			httpOnly: true,
		});
		cookieStore.set("refreshToken", response.refreshToken, {
			maxAge: 60 * 60, // 1 hour
			httpOnly: true,
		});

		redirect("/");
	} catch (error) {
		console.error("Login failed:", error);
		throw new Error();
	}
}
