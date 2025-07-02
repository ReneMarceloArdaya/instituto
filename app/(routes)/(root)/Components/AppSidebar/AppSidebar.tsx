"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { routes, rutesTeacher } from "./AppSidebar.Data";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function AppSidebar() {
  const { state } = useSidebar();
  const [privateMeta, setPrivateMeta] = useState<any>(null);

  useEffect(() => {
    fetch("/api/get-private-metadata")
      .then((res) => res.json())
      .then((data) => setPrivateMeta(data.privateMetadata))
      .catch(console.error);
  }, []);

  
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white">
        <SidebarHeader>
          <Link href="/" className="flex flex-row items-center">
            <Image
              src="/logo.png"
              alt="Logo Academia"
              width={55}
              height={55}
              style={{ borderRadius: "20%", paddingRight: "5px" }}
            />
            {state === "expanded" && (
              <span className="text-xl font-semibold text-gray-800 tracking-wide">
                {" "}
                Academia MDG
              </span>
            )}
          </Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
          <SidebarMenu className="space-y-2">
            {routes.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <div className="p-1 rounded-lg text-white bg-violet-400">
                      <item.icon className="w-4 h-4" />
                    </div>
                    {state === "expanded" && <span>{item.title}</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          {privateMeta?.isProfesor && (
            <SidebarMenu className="mt-4">
              <SidebarGroupLabel>Profesor</SidebarGroupLabel>
              <SidebarMenuItem>
                <SidebarMenuSub>
                  {rutesTeacher.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton
                        href={item.url}
                        className="hover:bg-muted transition"
                      >
                        <div className="p-1 rounded-lg text-white bg-slate-400">
                          <item.icon className="w-4 h-4" />
                        </div>
                        {item.title}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
