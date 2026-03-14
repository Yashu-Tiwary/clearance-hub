import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Lock, Download, Edit3 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout.jsx";
import { StatusBadge } from "@/components/StatusBadge.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { useToast } from "@/hooks/use-toast.js";

const meetingItems = [
  {
    id: "EC-2025-08468",
    project: "Highway Expansion NH-48",
    sector: "Infrastructure",
    proponent: "NHAI",
    referredDate: "2025-03-07",
    gistGenerated: true,
  },
  {
    id: "EC-2025-08455",
    project: "Cement Plant Expansion",
    sector: "Industry (Category A)",
    proponent: "UltraTech Cement",
    referredDate: "2025-02-28",
    gistGenerated: true,
  },
];

export default function MeetingQueue() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [momContent, setMomContent] = useState(
    `MINUTES OF THE MEETING\n\nApplication ID: EC-2025-08468\nProject: Highway Expansion NH-48\nProponent: NHAI\nSector: Infrastructure\n\nDate of Meeting: 14 March 2025\n\nMembers Present:\n1. Chairperson — Dr. R. Sharma\n2. Member Secretary — Shri P. Kumar\n3. Expert Member — Dr. A. Verma\n\nDiscussion:\nThe committee reviewed the Environmental Impact Assessment submitted by NHAI for the proposed highway expansion along NH-48. The committee noted that all requisite documents have been verified by the Scrutiny Team.\n\nKey observations:\n- Forest clearance obtained for 12.5 hectares\n- Wildlife corridor mitigation plan reviewed and found adequate\n- Public hearing conducted on 15 February 2025\n\nDecision:\nThe committee recommends grant of Environmental Clearance subject to the following conditions:\n1. Compensatory afforestation to be completed within 6 months\n2. Quarterly environmental monitoring reports to be submitted\n3. Noise barriers to be installed near residential zones`
  );
  const [locked, setLocked] = useState(false);
  const { toast } = useToast();

  const handleFinalize = () => {
    setLocked(true);
    toast({
      title: "Minutes of Meeting Finalized",
      description: "MoM has been locked and is now available for download. No further edits are permitted.",
    });
  };

  if (selectedApp) {
    return (
      <DashboardLayout>
        <div className="space-y-6 max-w-4xl">
          <Button variant="ghost" size="sm" onClick={() => { setSelectedApp(null); setLocked(false); }} className="gap-2 -ml-2">
            ← Back to Queue
          </Button>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-mono text-muted-foreground">{selectedApp}</p>
              <h1 className="text-2xl font-bold text-foreground mt-1">Minutes of Meeting Editor</h1>
            </div>
            <StatusBadge status={locked ? "FINALIZED" : "MOM_GENERATED"} />
          </div>

          <div className="surface-card overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                {locked ? <Lock className="h-4 w-4 text-muted-foreground" /> : <Edit3 className="h-4 w-4 text-primary" />}
                <h2 className="font-semibold text-foreground">
                  {locked ? "Finalized Document (Read-Only)" : "Editable Draft"}
                </h2>
              </div>
              {locked && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1"><Download className="h-3.5 w-3.5" /> DOCX</Button>
                  <Button variant="outline" size="sm" className="gap-1"><Download className="h-3.5 w-3.5" /> PDF</Button>
                </div>
              )}
            </div>
            <div className="p-5">
              <Textarea
                value={momContent}
                onChange={(e) => setMomContent(e.target.value)}
                readOnly={locked}
                rows={20}
                className={`font-mono text-sm leading-relaxed ${locked ? "bg-muted/30 cursor-not-allowed" : ""}`}
              />
            </div>
          </div>

          {!locked && (
            <div className="flex justify-end gap-3">
              <Button variant="outline">Save Draft</Button>
              <Button onClick={handleFinalize} className="gap-2">
                <Lock className="h-4 w-4" /> Finalize MoM
              </Button>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Meeting Queue</h1>
          <p className="text-sm text-muted-foreground mt-1">Applications referred for meeting documentation</p>
        </div>

        <div className="space-y-3">
          {meetingItems.map((app, i) => (
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
                  <StatusBadge status="REFERRED" />
                </div>
                <p className="font-medium text-foreground truncate">{app.project}</p>
                <p className="text-sm text-muted-foreground">{app.proponent} · {app.sector}</p>
              </div>
              <div className="flex items-center gap-2">
                {app.gistGenerated && (
                  <span className="text-xs text-primary font-medium flex items-center gap-1">
                    <FileText className="h-3.5 w-3.5" /> Gist Ready
                  </span>
                )}
                <Button variant="outline" size="sm">Open</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
