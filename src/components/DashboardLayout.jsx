import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  ClipboardCheck,
  Users,
  Settings,
  LogOut,
  Shield,
  BookOpen,
  BarChart3,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar.jsx";
import { NavLink } from "@/components/NavLink.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { supabase } from "@/supabaseClient.js";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "New Application", url: "/dashboard/new-application", icon: FilePlus },
  { title: "My Applications", url: "/dashboard/applications", icon: FileText },
];

const scrutinyItems = [
  { title: "Scrutiny Queue", url: "/dashboard/scrutiny", icon: ClipboardCheck },
];

const momItems = [
  { title: "Meeting Queue", url: "/dashboard/meetings", icon: BookOpen },
];

const adminItems = [
  { title: "User Management", url: "/dashboard/users", icon: Users },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  const renderGroup = (label, items) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  end
                  className="hover:bg-muted/50"
                  activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                >
                  <item.icon className="mr-2 h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4 flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground leading-none">EC Portal</span>
              <span className="text-[10px] text-muted-foreground mt-0.5">Environmental Clearance</span>
            </div>
          )}
        </div>
        <Separator />
        {renderGroup("Applications", navItems)}
        {renderGroup("Scrutiny", scrutinyItems)}
        {renderGroup("Minutes of Meeting", momItems)}
        {renderGroup("Administration", adminItems)}

        <div className="mt-auto p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <button 
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.href = "/";
                  }}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground w-full"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="text-sm">Sign Out</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const userEmail = user?.email?.split("@")[0] || "User";
  const initials = userEmail.substring(0, 2).toUpperCase();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border bg-card px-4 gap-4">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground leading-none">{userEmail}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{user?.email}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                {initials}
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
