import { motion } from "framer-motion";
import { FileText, Clock, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { StatusBadge, type ApplicationStatus } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Applications", value: "24", icon: FileText, trend: "+3 this month" },
  { label: "Under Scrutiny", value: "8", icon: Clock, trend: "2 require action" },
  { label: "Finalized", value: "12", icon: CheckCircle2, trend: "Last: 2 days ago" },
  { label: "EDS Raised", value: "4", icon: AlertTriangle, trend: "Pending response" },
];

const recentApplications: {
  id: string;
  project: string;
  sector: string;
  status: ApplicationStatus;
  date: string;
}[] = [
  { id: "EC-2025-08472", project: "Iron Ore Mining Extension", sector: "Mining (Category A)", status: "SCRUTINY", date: "2025-03-10" },
  { id: "EC-2025-08471", project: "Thermal Power Plant Phase II", sector: "Thermal Power", status: "SUBMITTED", date: "2025-03-09" },
  { id: "EC-2025-08468", project: "Highway Expansion NH-48", sector: "Infrastructure", status: "REFERRED", date: "2025-03-07" },
  { id: "EC-2025-08465", project: "Chemical Processing Unit", sector: "Industry (Category B)", status: "EDS", date: "2025-03-05" },
  { id: "EC-2025-08460", project: "Solar Farm Installation", sector: "Renewable Energy", status: "FINALIZED", date: "2025-03-01" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Environmental Clearance Application Overview</p>
          </div>
          <Link to="/dashboard/new-application">
            <Button className="gap-2">
              <FileText className="h-4 w-4" /> New Application
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="surface-card p-5"
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              </div>
              <p className="text-sm font-medium text-foreground">{stat.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.trend}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Applications */}
        <div className="surface-card overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Recent Applications</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Latest environmental clearance submissions</p>
            </div>
            <Link to="/dashboard/applications">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Application ID</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Project Name</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3 hidden md:table-cell">Sector</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3 hidden sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app, i) => (
                  <motion.tr
                    key={app.id}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-default cursor-pointer"
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                  >
                    <td className="px-5 py-3.5 text-sm font-mono text-foreground">{app.id}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-foreground">{app.project}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground hidden md:table-cell">{app.sector}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={app.status} /></td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground hidden sm:table-cell">{app.date}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
