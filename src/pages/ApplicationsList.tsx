import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { StatusBadge, type ApplicationStatus } from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const applications: {
  id: string;
  project: string;
  sector: string;
  proponent: string;
  status: ApplicationStatus;
  date: string;
  investment: string;
}[] = [
  { id: "EC-2025-08472", project: "Iron Ore Mining Extension", sector: "Mining (Category A)", proponent: "Vedanta Resources", status: "SCRUTINY", date: "2025-03-10", investment: "₹450 Cr" },
  { id: "EC-2025-08471", project: "Thermal Power Plant Phase II", sector: "Thermal Power", proponent: "NTPC Limited", status: "SUBMITTED", date: "2025-03-09", investment: "₹1,200 Cr" },
  { id: "EC-2025-08468", project: "Highway Expansion NH-48", sector: "Infrastructure", proponent: "NHAI", status: "REFERRED", date: "2025-03-07", investment: "₹800 Cr" },
  { id: "EC-2025-08465", project: "Chemical Processing Unit", sector: "Industry (Category B)", proponent: "Tata Chemicals", status: "EDS", date: "2025-03-05", investment: "₹120 Cr" },
  { id: "EC-2025-08460", project: "Solar Farm Installation", sector: "Renewable Energy", proponent: "Adani Green", status: "FINALIZED", date: "2025-03-01", investment: "₹350 Cr" },
  { id: "EC-2025-08455", project: "Cement Plant Expansion", sector: "Industry (Category A)", proponent: "UltraTech Cement", status: "MOM_GENERATED", date: "2025-02-28", investment: "₹600 Cr" },
  { id: "EC-2025-08450", project: "Wind Energy Corridor", sector: "Renewable Energy", proponent: "Suzlon Energy", status: "DRAFT", date: "2025-02-25", investment: "₹200 Cr" },
];

export default function ApplicationsList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.project.toLowerCase().includes(search.toLowerCase()) ||
      app.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Applications</h1>
          <p className="text-sm text-muted-foreground mt-1">All environmental clearance applications</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID or project name"
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Statuses</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="SUBMITTED">Submitted</SelectItem>
              <SelectItem value="SCRUTINY">Under Scrutiny</SelectItem>
              <SelectItem value="EDS">EDS Raised</SelectItem>
              <SelectItem value="REFERRED">Referred</SelectItem>
              <SelectItem value="MOM_GENERATED">MoM Generated</SelectItem>
              <SelectItem value="FINALIZED">Finalized</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="surface-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Application ID</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Project</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3 hidden lg:table-cell">Proponent</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3 hidden md:table-cell">Sector</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3 hidden sm:table-cell">Investment</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3 hidden sm:table-cell">Filed</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app, i) => (
                  <motion.tr
                    key={app.id}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-default cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <td className="px-5 py-3.5 text-sm font-mono text-foreground">{app.id}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-foreground">{app.project}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground hidden lg:table-cell">{app.proponent}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground hidden md:table-cell">{app.sector}</td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground hidden sm:table-cell">{app.investment}</td>
                    <td className="px-5 py-3.5"><StatusBadge status={app.status} /></td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground hidden sm:table-cell">{app.date}</td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-sm text-muted-foreground">
                      No applications match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
