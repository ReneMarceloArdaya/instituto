"use client"
import { Button } from "@/components/ui/button";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BellRing, LogIn} from "lucide-react";

export function Navbar(){
    return(
       <div className="flex justify-between p-4 border-b bg-white h-16">
          <SidebarTrigger/>
          <div className="flex gap-4 items-center">
                <Button variant="outline">
                    <BellRing/>
                </Button>
                <SignedOut>
                    <SignInButton>
                        <Button>
                            <LogIn/>
                            Iniciar Sesión
                        </Button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
        </div>
    );
   
}