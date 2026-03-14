import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, FileText, Users, ArrowRight, CheckCircle2, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: FileText,
    title: "Application Lifecycle",
    description: "Submit, track, and manage Environmental Clearance applications through a structured, auditable workflow.",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description: "Strict access controls for Proponents, Scrutiny Officers, MoM Teams, and Administrators.",
  },
  {
    icon: Users,
    title: "Multi-Stakeholder Coordination",
    description: "Seamless handoffs between scrutiny, meeting preparation, and document finalisation.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Tracking",
    description: "Monitor application progress, pending actions, and compliance status at every stage.",
  },
];

const workflowSteps = [
  { label: "Draft", description: "Proponent prepares application" },
  { label: "Submitted", description: "Application filed with documents" },
  { label: "Scrutiny", description: "Officer verification and review" },
  { label: "Referred", description: "Approved for committee meeting" },
  { label: "MoM Generated", description: "Minutes of Meeting documented" },
  { label: "Finalized", description: "Official clearance published" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-sm font-semibold tracking-tight text-foreground">EC Portal</span>
              <span className="ml-2 text-xs text-muted-foreground hidden sm:inline">Environmental Clearance</span>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Register</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border">
        <div className="container py-20 md:py-28">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-sm font-medium text-primary mb-3 tracking-wide uppercase">
              Government of India
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
              Environmental Clearance
              <br />
              Lifecycle Management
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
              A unified platform for submitting, scrutinising, and finalising Environmental Clearance applications with full audit traceability.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register">
                <Button size="lg" className="gap-2">
                  Begin Application <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Officer Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border">
        <div className="container py-16 md:py-20">
          <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">Platform Capabilities</p>
          <h2 className="text-2xl font-bold text-foreground mb-10">Designed for Compliance</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="surface-card p-6 group"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-4 transition-default group-hover:bg-primary/15">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="border-b border-border">
        <div className="container py-16 md:py-20">
          <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wide">Application Lifecycle</p>
          <h2 className="text-2xl font-bold text-foreground mb-10">Linear Workflow Enforcement</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.label}
                className="surface-card p-5 flex items-start gap-4"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{step.label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border">
        <div className="container py-16 md:py-20">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { value: "6-Stage", label: "Enforced Workflow" },
              { value: "100%", label: "Audit Traceability" },
              { value: "4 Roles", label: "Access Control Levels" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">EC Portal</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Environmental Clearance Management System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
