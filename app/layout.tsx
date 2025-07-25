import "@/app/globals.css";

import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { cookies } from "next/headers";
import SideBar from "./components/SideBar";
import { APIHandler } from "@/lib/APIHandler";
import { Suspense } from "react";
import Loading from "./loading";
import { SidebarProvider } from "@/components/ui/sidebar";

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
				<div className="min-h-screen bg-background">
					<SidebarProvider>
						<SideBar isSignIn={isSignedIn} username={username ? username : ""} />
						<main className="flex justify-center items-center w-full min-h-screen overflow-y-auto">
							<Suspense fallback={<Loading />}>
								{children}
							</Suspense>
						</main>
					</SidebarProvider>
				</div>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
