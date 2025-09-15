import { ReactNode } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { HubSidebar } from "@/components/hub/HubSidebar";
import { HubHeader } from "@/components/hub/HubHeader";

interface HubLayoutProps {
  children: ReactNode;
}

const HubLayout = ({ children }: HubLayoutProps) => {
  return (
    <>
      <HubSidebar />
      <div className="flex-1 flex flex-col">
        <HubHeader />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </>
  );
};

export default HubLayout;