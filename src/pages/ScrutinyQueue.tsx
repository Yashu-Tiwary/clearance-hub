import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, FileText, Eye } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { StatusBadge, type ApplicationStatus } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const queueItems: {
  id: string;
  project: string;
  sector: string;
  proponent: string;
  status: ApplicationStatus;
  date: string;
}[] = [
  { id: "EC-2025-08472", project: "Iron Ore Mining Extension", sector: "Mining (Category A)", proponent: "Vedanta Resources", status: "SUBMITTED", date: "2025-03-10" },
  { id: "EC-2025-08471", project: "Thermal Power Plant Phase II", sector: "Thermal Power", proponent: "NTPC Limited", status: "SUBMITTED", date: "2025-03-09" },
  { id: "EC-2025-08469", project: "Coastal Road Project", sector: "Infrastructure", proponent: "BMC", status: "SCRUTINY", date: "2025-03-08" },
];

const documents = [
  { name: "Environmental Impact Assessment.pdf", size: "4.2 MB", type: "EIA Report" },
  { name: "Site Layout Plan.pdf", size: "2.1 MB", type: "Site Plan" },
  { name: "Consent to Establish.pdf", size: "1.8 MB", type: "Consent Document" },
  { name: "Water Usage Analysis.xlsx", size: "890 KB", type: "Supporting Data" },
];

export default function ScrutinyQueue() {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [verified, setVerified] = useState<Record<string, boolean>>({});
  const [edsComment, setEdsComment] = useState("");
  const { toast } = useToast();

  const toggleVerify = (docName: string) => {
    setVerified((v) => ({ ...v, [docName]: !v[docName] }));
  };

  const allVerified = documents.every((d) => verified[d.name]);
  const verifiedCount = documents.filter((d) => verified[d.name]).length;

  const handleRefer = () => {
    toast({
      title: "Application Referred",
      description: "Application referred to MoM Team. Meeting gist generation initiated.",
    });
    setSelectedApp(null);
  };

  const handleEDS = () => {
    if (!edsComment.trim()) {
      toast({ title: "Comment Required", description: "Provide remarks for the Essential Document Sought notice.", variant: "destructive" });
      return;
    }
    toast({
      title: "EDS Raised",
      description: "Essential Document Sought notice sent to proponent. Application status updated.",
    });
    setSelectedApp(null);
  };

  if (selectedApp) {
    const app = queueItems.find((a) => a.id === selectedApp)!;
    return (
      <DashboardLayout>
        <div className="space-y-6 max-w-4xl">
          <Button variant="ghost" size="sm" onClick={() => setSelectedApp(null)} className="gap-2 -ml-2">
            ← Back to Queue
          </Button>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-mono text-muted-foreground">{app.id}</p>
              <h1 className="text-2xl font-bold text-foreground mt-1">{app.project}</h1>
              <p className="text-sm text-muted-foreground mt-1">{app.sector} · {app.proponent}</p>
            </div>
            <StatusBadge status={app.status} />
          </div>

          {/* Document verification */}
          <div className="surface-card overflow-hidden">
            <div className="p-5 border-b border-border">
              <h2 className="font-semibold text-foreground">Document Verification</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {verifiedCount} of {documents.length} documents verified
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(verifiedCount / documents.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="divide-y divide-border">
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className={`flex items-center justify-between px-5 py-4 transition-default ${
                    verified[doc.name] ? "bg-emerald-50/30" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={false}
                      animate={{ scale: verified[doc.name] ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {verified[doc.name] && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    </motion.div>
                    {!verified[doc.name] && <FileText className="h-4 w-4 text-muted-foreground" />}
                    <div>
                      <p className="text-sm font-medium text-foreground">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.type} · {doc.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="gap-1">
                      <Eye className="h-3.5 w-3.5" /> Preview
                    </Button>
                    <Button
                      variant={verified[doc.name] ? "outline" : "default"}
                      size="sm"
                      onClick={() => toggleVerify(doc.name)}
                    >
                      {verified[doc.name] ? "Undo" : "Verify"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="surface-card p-5">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-accent" /> Raise Essential Document Sought
              </h3>
              <Textarea
                value={edsComment}
                onChange={(e) => setEdsComment(e.target.value)}
                placeholder="Specify deficient documents and required actions…"
                rows={3}
                className="mb-3"
              />
              <Button variant="outline" onClick={handleEDS} className="w-full">
                Raise EDS Notice
              </Button>
            </div>
            <div className="surface-card p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Refer to Meeting
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  All documents must be verified before referring. This action will trigger automatic meeting gist generation.
                </p>
              </div>
              <Button onClick={handleRefer} disabled={!allVerified} className="w-full">
                Proceed to Refer
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Scrutiny Queue</h1>
          <p className="text-sm text-muted-foreground mt-1">Applications pending verification and review</p>
        </div>

        <div className="space-y-3">
          {queueItems.map((app, i) => (
            <motion.div
              key={app.id}
              className="surface-card p-5 flex items-center justify-between gap-4 cursor-pointer hover:shadow-md transition-default"
              onClick={() => setSelectedApp(app.id)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-mono text-muted-foreground">{app.id}</span>
                  <StatusBadge status={app.status} />
                </div>
                <p className="font-medium text-foreground truncate">{app.project}</p>
                <p className="text-sm text-muted-foreground">{app.proponent} · {app.sector}</p>
              </div>
              <Button variant="outline" size="sm">Review</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
