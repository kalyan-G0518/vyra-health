import Sidebar from "./sidebar";
import MobileNavbar from "./mobilenavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-3xl rounded-full" />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block relative z-10">
        <Sidebar />
      </div>

      <div className="flex-1 relative z-10">
        {/* Mobile Navbar */}
        <MobileNavbar />

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}