import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { label: "Sector", description: "Select category" },
  { label: "Project Info", description: "Details & location" },
  { label: "Documents", description: "Upload files" },
  { label: "Payment", description: "Fee processing" },
  { label: "Review", description: "Final submission" },
];

const sectors = [
  "Mining (Category A)",
  "Mining (Category B)",
  "Thermal Power",
  "Infrastructure",
  "Industry (Category A)",
  "Industry (Category B)",
  "Renewable Energy",
  "Construction",
];

export default function NewApplication() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({
    sector: "",
    projectName: "",
    location: "",
    investment: "",
    description: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const next = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };
  const prev = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted",
      description: "Your application has been filed. It is now visible to the Scrutiny Team.",
    });
    navigate("/dashboard/applications");
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">New Application</h1>
          <p className="text-sm text-muted-foreground mt-1">Submit an Environmental Clearance application</p>
        </div>

        {/* Step indicator */}
        <div className="surface-card p-5">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 flex-1 last:flex-initial">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-default ${
                    i < currentStep
                      ? "bg-primary text-primary-foreground"
                      : i === currentStep
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < currentStep ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </div>
                <div className="hidden sm:block min-w-0">
                  <p className={`text-xs font-medium truncate ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-2 ${i < currentStep ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="surface-card p-6"
        >
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Select Sector & Category</h2>
              <p className="text-sm text-muted-foreground">Choose the applicable sector for your project.</p>
              <div className="space-y-2 max-w-md">
                <Label>Sector Category</Label>
                <Select value={form.sector} onValueChange={(v) => update("sector", v)}>
                  <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
                  <SelectContent>
                    {sectors.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Project Information</h2>
              <p className="text-sm text-muted-foreground">Provide essential details about the project.</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input value={form.projectName} onChange={(e) => update("projectName", e.target.value)} placeholder="e.g. Iron Ore Mining Extension" />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="District, State" />
                </div>
                <div className="space-y-2">
                  <Label>Estimated Investment (₹)</Label>
                  <Input value={form.investment} onChange={(e) => update("investment", e.target.value)} placeholder="e.g. 50,00,00,000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Project Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Brief description of the project scope, capacity, and environmental considerations"
                  rows={4}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Document Upload</h2>
              <p className="text-sm text-muted-foreground">Upload required documents. Allowed: PDF, DOCX, XLSX, PNG, JPG. Max 20MB per file.</p>
              {["Environmental Impact Assessment", "Site Layout Plan", "Consent Documents", "Project Feasibility Report"].map((doc) => (
                <div key={doc} className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
                  <div>
                    <p className="text-sm font-medium text-foreground">{doc}</p>
                    <p className="text-xs text-muted-foreground">PDF, DOCX — Max 20MB</p>
                  </div>
                  <Button variant="outline" size="sm">Upload</Button>
                </div>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Fee Payment</h2>
              <p className="text-sm text-muted-foreground">Complete application fee payment to proceed.</p>
              <div className="surface-elevated p-6 text-center max-w-sm mx-auto">
                <p className="text-sm text-muted-foreground">Application Fee</p>
                <p className="text-3xl font-bold text-foreground mt-1">₹25,000</p>
                <p className="text-xs text-muted-foreground mt-2 mb-6">Inclusive of all processing charges</p>
                <Button className="w-full">Proceed to Payment Gateway</Button>
                <p className="text-xs text-muted-foreground mt-3">Supports UPI, Net Banking, and QR Code</p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Review & Submit</h2>
              <p className="text-sm text-muted-foreground">Verify all information before final submission. Once submitted, the application cannot be edited.</p>
              <div className="space-y-3">
                {[
                  { label: "Sector", value: form.sector || "—" },
                  { label: "Project Name", value: form.projectName || "—" },
                  { label: "Location", value: form.location || "—" },
                  { label: "Investment", value: form.investment ? `₹${form.investment}` : "—" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prev} disabled={currentStep === 0} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={next} className="gap-2">
              Proceed <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="gap-2">
              <Check className="h-4 w-4" /> Submit Application
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
