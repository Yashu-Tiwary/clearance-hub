import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { useToast } from "@/hooks/use-toast.js";
import { supabase } from "@/supabaseClient.js";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast({ title: "Validation Error", description: "All fields are required.", variant: "destructive" });
      return;
    }
    if (form.password.length < 8) {
      toast({ title: "Validation Error", description: "Password must be at least 8 characters.", variant: "destructive" });
      return;
    }
    if (!form.email.includes("@")) {
      toast({ title: "Validation Error", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast({ title: "Validation Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            name: form.name,
          },
        },
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (data?.user) {
        toast({
          title: "Registration Successful",
          description: "Please check your email to verify your account.",
        });
        navigate("/login");
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-primary flex-col justify-between p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/20">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-primary-foreground">EC Portal</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-primary-foreground leading-tight">
            Register as a<br />Project Proponent
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/70 leading-relaxed max-w-sm">
            Create an account to submit Environmental Clearance applications and track their progress through the approval workflow.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/50">
          Government of India — Ministry of Environment
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">EC Portal</span>
          </div>

          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-1 mb-8">
            Register as a Project Proponent to begin.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Enter full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="official@domain.gov.in" autoComplete="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>
              <div className="relative">
                <Input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-default"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                placeholder="Re-enter password"
                autoComplete="new-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating account..." : "Create Account"}</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
