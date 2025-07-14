"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	HomeRounded,
	SchoolRounded,
	CalendarMonthRounded,
	QuizRounded,
	AccountCircleRounded,
} from "@mui/icons-material";
import { logoutAction } from "../actions";
import { usePathname } from "next/navigation";

const routes = [
	{ href: "/", label: "Trang chủ", icon: HomeRounded },
	{ href: "/gpa", label: "Điểm", icon: SchoolRounded },
	{ href: "/schedule", label: "Thời khóa biểu", icon: CalendarMonthRounded },
	{ href: "/exam", label: "Lịch thi", icon: QuizRounded },
];

export default function SideBar({ isSignIn,	username }: { isSignIn: boolean, username: string }) {
	const pathname = usePathname();

	return (
		<div className="fixed m-6 w-80 h-[calc(100vh-3rem)] bg-primary rounded-[3rem] p-8 flex flex-col justify-between z-50">
			<div>
				<h2 className="text-2xl font-bold text-black mb-16">
					<AccountCircleRounded fontSize="large" className="mr-5"/>
					{username ? `Hello, ${username}!` : "Hello!"}
				</h2>
				<div className="space-y-8">
					{routes.map((route) => (
						<div key={route.href.replace("/", "")} className="text-xl font-semibold text-black cursor-pointer">
							<Link
								prefetch={true}
								key={route.href}
								href={route.href}
								className={cn(
									"block px-3 py-2 rounded-md text-sm font-medium transition-colors",
									pathname === route.href
									? "bg-accent text-white"
									: "hover:bg-muted"
								)}
								>
								<route.icon key={route.href + "-icon"} className="mr-5" />
								{route.label}
							</Link>
						</div>
					))}
				</div>
			</div>
			{
				isSignIn &&
				<form action={logoutAction}>
					<Button
						type="submit"
						variant="secondary"
						className="bg-white text-black hover:bg-gray-100 rounded-2xl py-6 text-lg font-semibold"
					>
						Đăng xuất
					</Button>
				</form>
			}	
		</div>
	);
}
