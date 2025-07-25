"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
	BookOpenCheck,
	GraduationCap, 
	House, 
	CalendarCheck2, 
	CircleUser,
	LogOut
} from "lucide-react";
import { 
	Sidebar, 
	SidebarContent, 
	SidebarFooter, 
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarTrigger,
	useSidebar
} from "@/components/ui/sidebar";
import { 
	Tooltip, 
	TooltipContent, 
	TooltipTrigger 
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import vnuLogo from "@/public/vnu_logo.png";
import { logoutAction } from "../actions";

const routes = [
	{ href: "/", label: "Trang chủ", icon: House },
	{ href: "/gpa", label: "Điểm", icon: GraduationCap },
	{ href: "/schedule", label: "Thời khóa biểu", icon: CalendarCheck2 },
	{ href: "/exam", label: "Lịch thi", icon: BookOpenCheck },
];

export default function SideBar({ isSignIn,	username }: { isSignIn: boolean, username: string }) {
	const pathname = usePathname();
	const { isMobile, open } = useSidebar();

	return (
		<>
			{isMobile && <SidebarTrigger className="hover:bg-primary">a</SidebarTrigger>}
			<Sidebar variant="floating" collapsible="icon">
				<SidebarHeader className="flex items-center justify-center">
					{open && (
						<Image
							src={vnuLogo}
							alt="VNU Logo"
							width={480}
							height={480}
							className="mb-1.5 w-30 h-30 select-none"
							draggable={false}
						/>
					)}
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild className="hover:bg-transparent active:bg-transparent">
								<div className="flex items-center gap-2">
									<CircleUser size={32} />
									<span className="text-lg font-semibold">
										{isSignIn ? username : "Hello!"}
									</span>
								</div>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarHeader>
				<Separator />
				<SidebarContent>
					<SidebarMenu>
						{routes.map((route) => (
							<SidebarMenuItem key={route.href}>
								<SidebarMenuButton
									asChild
									isActive={pathname === route.href}
									className="hover:bg-primary"
								>
									<Link href={route.href}>
										<route.icon size={20} />
										<span>{route.label}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarContent>
				<Separator />
				<SidebarFooter>
					{!isMobile && (
						<div className="flex justify-end">
							<Tooltip>
								<TooltipTrigger asChild>
									<SidebarTrigger className="hover:bg-primary" />
								</TooltipTrigger>
								<TooltipContent side="right">
									{open ? "Đóng thanh công cụ" : "Mở thanh công cụ"}
								</TooltipContent>
							</Tooltip>
						</div>
					)}
					{isSignIn && (
						<Button
							variant="outline"
							className="hover:bg-primary hover:text-white"
							onClick={() => logoutAction()}
						>
							{open ? "Đăng xuất" : <LogOut />}
						</Button>
					)}
				</SidebarFooter>
			</Sidebar>
		</>
	);
}
