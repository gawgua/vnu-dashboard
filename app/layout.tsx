import "@/app/globals.css";

import { Metadata } from "next";
import { cookies } from "next/headers";
import SideBar from "./components/SideBar";
import { APIHandler } from "@/lib/APIHandler";

export const metadata: Metadata = {
	title: "VNU Dashboard",
	description: "A dashboard for VNU students",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
	const token = (await cookies()).get("accessToken")?.value;
	const refreshToken = (await cookies()).get("refreshToken")?.value;
	let isSignedIn = false;
	let username = "";
	if (token) {
		isSignedIn = true;

		const apiHandler = new APIHandler(token, refreshToken);
		const info = await apiHandler.getInfoSinhVien();
		username = info.hoVaTen;
	}

	return (
		<html lang="vi">
			<body>
				<div className="flex min-h-screen bg-gray-50">
					<SideBar isSignIn={isSignedIn} username={ username ? username : ""}/>
					<main className="flex-1 ml-[22rem] overflow-y-auto p-6 flex justify-center items-center">
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
