'use client';

import { useStyleContext } from '@/lib/picker/style-context';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Search,
  Bell,
  Settings,
  Home,
  FileText,
  MessageSquare,
  PieChart,
  ChevronDown,
} from 'lucide-react';

// ─── Mini stat card ───────────────────────────────────────────────
function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ElementType;
}) {
  return (
    <div className="style-card p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium">{title}</span>
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <div className="text-xl font-bold tracking-tight">{value}</div>
      <div className="flex items-center gap-1 text-xs">
        {positive ? (
          <ArrowUpRight className="w-3 h-3 text-emerald-500" />
        ) : (
          <ArrowDownRight className="w-3 h-3 text-red-400" />
        )}
        <span className={positive ? 'text-emerald-500' : 'text-red-400'}>{change}</span>
        <span className="text-muted-foreground">vs last month</span>
      </div>
    </div>
  );
}

// ─── Mini chart (decorative SVG) ──────────────────────────────────
function MiniLineChart() {
  return (
    <svg viewBox="0 0 200 60" className="w-full h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0.2" />
          <stop offset="100%" className="[stop-color:hsl(var(--primary))]" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,45 L20,42 L40,38 L60,40 L80,32 L100,28 L120,30 L140,22 L160,18 L180,15 L200,10"
        fill="none"
        className="[stroke:hsl(var(--primary))]"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M0,45 L20,42 L40,38 L60,40 L80,32 L100,28 L120,30 L140,22 L160,18 L180,15 L200,10 L200,60 L0,60 Z"
        fill="url(#chartGrad)"
      />
    </svg>
  );
}

function MiniBarChart() {
  const bars = [35, 52, 45, 60, 48, 72, 55, 68, 62, 80, 70, 75];
  return (
    <svg viewBox="0 0 200 60" className="w-full h-16" preserveAspectRatio="none">
      {bars.map((h, i) => (
        <rect
          key={i}
          x={i * 17}
          y={60 - (h * 60) / 100}
          width="12"
          height={(h * 60) / 100}
          rx="1"
          className="[fill:hsl(var(--primary))]"
          opacity={0.5 + (i / bars.length) * 0.5}
        />
      ))}
    </svg>
  );
}

// ─── Nav item ─────────────────────────────────────────────────────
function NavItem({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium cursor-default transition-colors',
        active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span>{label}</span>
    </div>
  );
}

// ─── Activity row ─────────────────────────────────────────────────
function ActivityRow({
  name,
  action,
  time,
  amount,
}: {
  name: string;
  action: string;
  time: string;
  amount?: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 text-xs">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-semibold text-muted-foreground">
          {name[0]}
        </div>
        <div>
          <span className="font-medium text-foreground">{name}</span>
          <span className="text-muted-foreground"> {action}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {amount && <span className="font-medium">{amount}</span>}
        <span className="text-muted-foreground">{time}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
//  Main Dashboard Preview
// ═══════════════════════════════════════════════════════════════════

export default function DashboardPreview() {
  const { activeStyle, profile } = useStyleContext();

  return (
    <div
      className={cn(
        'style-preview-container w-full min-h-[500px] bg-background text-foreground overflow-hidden',
        'border border-border rounded-lg'
      )}
      data-style={activeStyle}
    >
      {/* ── Top Chrome Bar ──────────────────────────────────── */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/50 border-b border-border">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <div className="flex-1 mx-8">
          <div className="max-w-xs mx-auto h-5 rounded bg-muted/80 px-2 flex items-center">
            <span className="text-[9px] text-muted-foreground">app.theem.dev/dashboard</span>
          </div>
        </div>
      </div>

      <div className="flex min-h-[460px]">
        {/* ── Sidebar ───────────────────────────────────────── */}
        <div className="w-44 border-r border-border bg-card/50 p-3 flex flex-col gap-4 shrink-0">
          {/* Logo */}
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <span className="text-[9px] font-bold text-primary-foreground">T</span>
            </div>
            <span className="text-xs font-bold">Dashboard</span>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-0.5">
            <NavItem icon={Home} label="Overview" active />
            <NavItem icon={BarChart3} label="Analytics" />
            <NavItem icon={FileText} label="Reports" />
            <NavItem icon={MessageSquare} label="Messages" />
            <NavItem icon={PieChart} label="Charts" />
            <NavItem icon={Settings} label="Settings" />
          </nav>

          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex items-center gap-2 px-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[9px] font-semibold text-primary">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium truncate">Jane Doe</div>
                <div className="text-[9px] text-muted-foreground truncate">jane@theem.dev</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content ──────────────────────────────────── */}
        <div className="flex-1 p-4 space-y-4 overflow-hidden">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold">Dashboard Overview</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Welcome back, Jane</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center">
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center">
                <Bell className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-3">
            <StatCard icon={DollarSign} title="Revenue" value="$18.5K" change="+12.5%" positive />
            <StatCard icon={Users} title="Users" value="2,847" change="+8.2%" positive />
            <StatCard icon={TrendingUp} title="Growth" value="23.1%" change="+2.4%" positive />
            <StatCard icon={BarChart3} title="Bounce" value="42.3%" change="-3.1%" positive={false} />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-3 style-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">Revenue Trend</span>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <span>Last 12 months</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>
              <MiniLineChart />
            </div>
            <div className="col-span-2 style-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold">Traffic</span>
                <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <MiniBarChart />
            </div>
          </div>

          {/* Activity feed */}
          <div className="style-card p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold">Recent Activity</span>
              <span className="text-[10px] text-primary cursor-pointer">View all</span>
            </div>
            <div className="divide-y divide-border">
              <ActivityRow name="Alex" action="purchased Pro plan" time="2m ago" amount="$49.00" />
              <ActivityRow name="Maria" action="submitted a report" time="15m ago" />
              <ActivityRow name="James" action="upgraded account" time="1h ago" amount="$99.00" />
              <ActivityRow name="Sarah" action="left a review" time="3h ago" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <div className="border-t border-border px-4 py-1.5 flex items-center justify-center">
        <span className="text-[9px] text-muted-foreground tracking-wide uppercase">
          {profile.name} Preview
        </span>
      </div>
    </div>
  );
}
