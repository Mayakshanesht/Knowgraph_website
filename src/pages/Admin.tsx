import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Download, RefreshCw, Users, TrendingUp, LogOut, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface BetaSignup {
  id: string;
  name: string;
  email: string;
  role: string;
  interested_plans: string[];
  message: string | null;
  created_at: string;
}

export default function Admin() {
  const { user, isAdmin, isLoading: authLoading, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const [signups, setSignups] = useState<BetaSignup[]>([]);
  const [filteredSignups, setFilteredSignups] = useState<BetaSignup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const roles = ["student", "researcher", "engineer", "educator", "professional", "other"];
  const plans = ["free", "learner", "professional", "student-pro", "creator", "enterprise"];

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/admin/login");
    } else if (!authLoading && user && !isAdmin) {
      navigate("/admin/login");
    }
  }, [authLoading, user, isAdmin, navigate]);

  const fetchSignups = async () => {
    if (!isAdmin) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("beta_signups")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSignups(data || []);
    } catch (error) {
      console.error("Error fetching signups:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchSignups();
    }
  }, [isAdmin]);

  useEffect(() => {
    let filtered = [...signups];

    if (roleFilter !== "all") {
      filtered = filtered.filter((s) => s.role === roleFilter);
    }

    if (planFilter !== "all") {
      filtered = filtered.filter((s) => s.interested_plans.includes(planFilter));
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(term) ||
          s.email.toLowerCase().includes(term)
      );
    }

    setFilteredSignups(filtered);
  }, [signups, roleFilter, planFilter, searchTerm]);

  const exportCSV = () => {
    const headers = ["Name", "Email", "Role", "Interested Plans", "Message", "Signed Up"];
    const rows = filteredSignups.map((s) => [
      s.name,
      s.email,
      s.role,
      s.interested_plans.join("; "),
      s.message || "",
      format(new Date(s.created_at), "yyyy-MM-dd HH:mm"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `beta-signups-${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
  };

  // Calculate stats
  const totalSignups = signups.length;
  const thisWeekSignups = signups.filter((s) => {
    const signupDate = new Date(s.created_at);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return signupDate > weekAgo;
  }).length;

  const roleStats = roles.reduce((acc, role) => {
    acc[role] = signups.filter((s) => s.role === role).length;
    return acc;
  }, {} as Record<string, number>);

  const planStats = plans.reduce((acc, plan) => {
    acc[plan] = signups.filter((s) => s.interested_plans.includes(plan)).length;
    return acc;
  }, {} as Record<string, number>);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <section className="pt-28 md:pt-36 pb-8 hero-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Beta Signups Admin
            </h1>
              <p className="text-white/70">
                View and manage beta signup requests
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={signOut} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </section>

      <Section className="py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalSignups}</p>
                <p className="text-xs text-muted-foreground">Total Signups</p>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-teal" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{thisWeekSignups}</p>
                <p className="text-xs text-muted-foreground">This Week</p>
              </div>
            </div>
          </div>
          <div className="col-span-2 p-4 rounded-xl bg-card border border-border">
            <p className="text-xs text-muted-foreground mb-2">Top Roles</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(roleStats)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 4)
                .map(([role, count]) => (
                  <span
                    key={role}
                    className="px-2 py-1 rounded-full bg-muted text-xs text-foreground"
                  >
                    {role}: {count}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Plan Interest Stats */}
        <div className="p-4 rounded-xl bg-card border border-border mb-8">
          <p className="text-sm font-medium text-foreground mb-3">Plan Interest Distribution</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {Object.entries(planStats).map(([plan, count]) => (
              <div key={plan} className="text-center p-2 rounded-lg bg-muted/50">
                <p className="text-lg font-bold text-foreground">{count}</p>
                <p className="text-xs text-muted-foreground capitalize">{plan}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={planFilter} onValueChange={setPlanFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              {plans.map((plan) => (
                <SelectItem key={plan} value={plan}>
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm" onClick={fetchSignups}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={exportCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Interested Plans</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Signed Up</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : filteredSignups.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No signups found
                  </TableCell>
                </TableRow>
              ) : (
                filteredSignups.map((signup) => (
                  <TableRow key={signup.id}>
                    <TableCell className="font-medium">{signup.name}</TableCell>
                    <TableCell>{signup.email}</TableCell>
                    <TableCell className="capitalize">{signup.role}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {signup.interested_plans.map((plan) => (
                          <span
                            key={plan}
                            className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs"
                          >
                            {plan}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {signup.message || "-"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(signup.created_at), "MMM d, yyyy")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Showing {filteredSignups.length} of {signups.length} signups
        </p>
      </Section>
    </Layout>
  );
}
