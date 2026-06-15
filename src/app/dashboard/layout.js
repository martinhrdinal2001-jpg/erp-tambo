import Sidebar from "@/components/Sidebar";
import DemoBanner from "@/components/DemoBanner";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-stone-50">
      <Sidebar />
      <main className="flex h-screen flex-1 flex-col overflow-hidden">
        <DemoBanner />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
