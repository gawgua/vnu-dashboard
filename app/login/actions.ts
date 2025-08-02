"use server";

import { cookies } from "next/headers";
import { APIHandler } from "@/lib/APIHandler";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData): Promise<void> {
	const apiHandler = new APIHandler();
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;
	const remember = formData.get("remember") === "on";
	
	try {
		const response = await apiHandler.signin(username, password);
		const cookieStore = await cookies();

		cookieStore.set("accessToken", response.accessToken, {
			...(!remember && { maxAge: 3600 }), //spread the object when remember is false
			httpOnly: true,
		});
		cookieStore.set("refreshToken", response.refreshToken, {
			...(!remember && { maxAge: 3600 }),
			httpOnly: true,
		});
		cookieStore.set("remember", remember ? "true" : "false");
	} catch (error) {
		console.error("Login failed:", error);
		throw new Error("Login failed");
	}
	
	redirect("/");
}
