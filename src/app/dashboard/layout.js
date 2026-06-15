import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex bg-stone-50">
      <Sidebar />
      <main className="h-screen flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
