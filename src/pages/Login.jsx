import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { useToast } from "@/hooks/use-toast.js";
import { supabase } from "@/supabaseClient.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: "Validation Error", description: "All fields are required.", variant: "destructive" });
      return;
    }
    if (!email.includes("@")) {
      toast({ title: "Validation Error", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Authentication Failed",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (data?.session) {
        toast({
          title: "Authentication Successful",
          description: "Redirecting to your dashboard.",
        });
        navigate("/dashboard");
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
            Environmental Clearance<br />Lifecycle Management
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/70 leading-relaxed max-w-sm">
            Secure access for Government Officials, Scrutiny Officers, MoM Team members, and Project Proponents.
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

          <h1 className="text-2xl font-bold text-foreground">Sign In</h1>
          <p className="text-sm text-muted-foreground mt-1 mb-8">
            Enter your credentials to access the portal.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
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
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account? <Link to="/register" className="text-primary hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
