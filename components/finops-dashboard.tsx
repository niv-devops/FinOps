"use client"

import { useState } from "react"
import {
  BarChart3,
  Cloud,
  DollarSign,
  TrendingUp,
  Database,
  Server,
  Globe,
  Cpu,
  Network,
  CheckCircle,
  Filter,
  Download,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Activity,
  Target,
  Lightbulb,
  RefreshCw,
  AlertTriangle,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

// Mock data
const costData = [
  { month: "Jan", aws: 12500, gcp: 8300, total: 20800 },
  { month: "Feb", aws: 13200, gcp: 9100, total: 22300 },
  { month: "Mar", aws: 11800, gcp: 8800, total: 20600 },
  { month: "Apr", aws: 14500, gcp: 9500, total: 24000 },
  { month: "May", aws: 15200, gcp: 10200, total: 25400 },
  { month: "Jun", aws: 16800, gcp: 11500, total: 28300 },
]

const resources = [
  {
    id: "1",
    name: "Production EKS Cluster",
    provider: "AWS",
    service: "EKS",
    region: "us-east-1",
    cost: 2840,
    status: "running",
    utilization: 78,
  },
  {
    id: "2",
    name: "Data Warehouse",
    provider: "GCP",
    service: "BigQuery",
    region: "us-central1",
    cost: 1920,
    status: "running",
    utilization: 65,
  },
  {
    id: "3",
    name: "Web App Load Balancer",
    provider: "AWS",
    service: "ALB",
    region: "us-east-1",
    cost: 340,
    status: "running",
    utilization: 45,
  },
  {
    id: "4",
    name: "ML Training Cluster",
    provider: "GCP",
    service: "GKE",
    region: "us-west1",
    cost: 4200,
    status: "running",
    utilization: 92,
  },
  {
    id: "5",
    name: "Database Cluster",
    provider: "AWS",
    service: "RDS",
    region: "us-east-1",
    cost: 1680,
    status: "running",
    utilization: 58,
  },
  {
    id: "6",
    name: "CDN Distribution",
    provider: "AWS",
    service: "CloudFront",
    region: "global",
    cost: 280,
    status: "running",
    utilization: 34,
  },
]

const recommendations = [
  {
    id: "1",
    title: "Right-size EC2 instances",
    description: "3 instances are over-provisioned and can be downsized",
    savings: 1240,
    impact: "high",
    effort: "low",
    provider: "AWS",
  },
  {
    id: "2",
    title: "Enable GCP Committed Use Discounts",
    description: "Save 57% on compute by committing to 1-year usage",
    savings: 2800,
    impact: "high",
    effort: "medium",
    provider: "GCP",
  },
  {
    id: "3",
    title: "Optimize storage classes",
    description: "Move infrequently accessed data to cheaper storage tiers",
    savings: 680,
    impact: "medium",
    effort: "low",
    provider: "AWS",
  },
  {
    id: "4",
    title: "Schedule non-production workloads",
    description: "Auto-stop dev/test environments during off-hours",
    savings: 920,
    impact: "medium",
    effort: "medium",
    provider: "Both",
  },
]

const menuItems = [
  { title: "Overview", icon: BarChart3, id: "overview" },
  { title: "Cost Analysis", icon: DollarSign, id: "costs" },
  { title: "Resources", icon: Server, id: "resources" },
  { title: "Recommendations", icon: Lightbulb, id: "recommendations" },
  { title: "Budgets & Alerts", icon: Bell, id: "budgets" },
  { title: "Reports", icon: Download, id: "reports" },
]

export function FinOpsDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeSection, setActiveSection] = useState("overview")
  const [timeRange, setTimeRange] = useState("30d")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
    toast({
      title: "Data refreshed",
      description: "Cost and resource data has been updated.",
    })
  }

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your report will be ready for download shortly.",
    })
  }

  const handleImplementRecommendation = (recId: string, title: string) => {
    toast({
      title: "Implementation started",
      description: `Working on: ${title}`,
    })
  }

  const handleResourceAction = (resourceName: string, action: string) => {
    toast({
      title: `${action} initiated`,
      description: `Action performed on ${resourceName}`,
    })
  }

  return (
    <div className="min-h-screen futuristic-bg">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse"></div>
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 glass-header">
        <div className="container mx-auto px-6 font-serif">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
                  <Cloud className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl font-bold glow-text text-cyan-400 truncate">Plutus Cloud</h1>
                  <p className="text-xs text-fuchsia-500 truncate">Cloud Cost Intelligence</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden md:flex items-center justify-center flex-1 max-w-md mx-8">
              <div className="flex items-center space-x-1 bg-white/5 rounded-lg p-1 backdrop-blur-sm border border-white/10">
                <Button
                  variant="ghost"
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md ${
                    activeSection === "overview"
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/25"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setActiveSection("overview")}
                >
                  <BarChart3 className="h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant="ghost"
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md ${
                    activeSection === "budgets"
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/25"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setActiveSection("budgets")}
                >
                  <Bell className="h-4 w-4" />
                  Budgets & Alerts
                </Button>
                <Button
                  variant="ghost"
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md ${
                    activeSection === "reports"
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30 shadow-lg shadow-cyan-500/25"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setActiveSection("reports")}
                >
                  <Download className="h-4 w-4" />
                  Reports
                </Button>
              </div>
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Cloud Provider Status */}
              <div className="hidden lg:flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-orange-500/20 text-orange-300 border border-orange-500/30 px-3 py-1"
                >
                  AWS $16.8K
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1">
                  GCP $11.5K
                </Badge>
              </div>

              {/* Search */}
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64 glass-input border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-500/50 focus:ring-cyan-500/25 transition-all duration-300"
                />
              </div>

              {/* Time Range Selector */}
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 glass-select border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-dropdown border-white/10">
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>

              {/* Action Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 relative"
              >
                <Bell className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                      <span className="text-sm font-semibold text-white">JD</span>
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium">John Doe</p>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass-dropdown border-white/10">
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-white/10 py-4">
              <nav className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium justify-start transition-all duration-300 ${
                    activeSection === "overview"
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => {
                    setActiveSection("overview")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <BarChart3 className="h-4 w-4" />
                  Overview
                </Button>
                <Button
                  variant="ghost"
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium justify-start transition-all duration-300 ${
                    activeSection === "budgets"
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => {
                    setActiveSection("budgets")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Bell className="h-4 w-4" />
                  Budgets & Alerts
                </Button>
                <Button
                  variant="ghost"
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium justify-start transition-all duration-300 ${
                    activeSection === "reports"
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => {
                    setActiveSection("reports")
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <Download className="h-4 w-4" />
                  Reports
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8 font-serif">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="glass-tabs border border-white/20 grid w-full grid-cols-4 text-white font-bold leading-8">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:glass-tab-active data-[state=active]:text-white transition-all duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="costs"
              className="data-[state=active]:glass-tab-active data-[state=active]:text-white transition-all duration-300"
            >
              Cost Analysis
            </TabsTrigger>
            <TabsTrigger
              value="resources"
              className="data-[state=active]:glass-tab-active data-[state=active]:text-white transition-all duration-300"
            >
              Resources
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="data-[state=active]:glass-tab-active data-[state=active]:text-white transition-all duration-300"
            >
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Cost Overview Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="glass-card border-white/20 hover:border-cyan-500/50 transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Total Monthly Cost
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
                    <DollarSign className="h-4 w-4 text-green-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white glow-text">$28,300</div>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-red-400" />
                    +12.3% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20 hover:border-blue-500/50 transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Potential Savings
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                    <Target className="h-4 w-4 text-blue-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white glow-text">$5,640</div>
                  <p className="text-xs text-gray-400">20% cost reduction available</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20 hover:border-purple-500/50 transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Active Resources
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                    <Server className="h-4 w-4 text-purple-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white glow-text">247</div>
                  <p className="text-xs text-gray-400">Across AWS & GCP</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20 hover:border-orange-500/50 transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Avg Utilization
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-orange-500/20 group-hover:bg-orange-500/30 transition-colors">
                    <Activity className="h-4 w-4 text-orange-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white glow-text">64%</div>
                  <p className="text-xs text-gray-400">Room for optimization</p>
                </CardContent>
              </Card>
            </div>

            {/* Cost Trend Chart */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white glow-text">Cost Trends</CardTitle>
                    <CardDescription className="text-gray-400">Monthly spending across cloud providers</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="glass-button border-white/20 text-gray-300 hover:text-white hover:border-cyan-500/50 bg-transparent"
                    onClick={handleExport}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end justify-between gap-4 p-4">
                  {costData.map((data, index) => (
                    <div key={data.month} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                      <div className="flex flex-col gap-1 w-full transition-all duration-300 group-hover:scale-105">
                        <div
                          className="bg-gradient-to-t from-orange-500 to-orange-400 rounded-t shadow-lg shadow-orange-500/25 transition-all duration-300 group-hover:shadow-orange-500/50"
                          style={{ height: `${(data.aws / 20000) * 200}px` }}
                        />
                        <div
                          className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-b shadow-lg shadow-blue-500/25 transition-all duration-300 group-hover:shadow-blue-500/50"
                          style={{ height: `${(data.gcp / 20000) * 200}px` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                        {data.month}
                      </span>
                      <span className="text-xs text-white font-medium glow-text">
                        ${(data.total / 1000).toFixed(1)}K
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-orange-500 to-orange-400 shadow-lg shadow-orange-500/25" />
                    <span className="text-sm text-gray-300">AWS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg shadow-blue-500/25" />
                    <span className="text-sm text-gray-300">GCP</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Resources */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white glow-text">Top Cost Resources</CardTitle>
                <CardDescription className="text-gray-400">Highest spending resources this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resources.slice(0, 5).map((resource) => (
                    <div
                      key={resource.id}
                      className="flex items-center justify-between p-4 rounded-lg glass-item border border-white/10 hover:border-white/20 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            resource.provider === "AWS"
                              ? "bg-orange-500/20 group-hover:bg-orange-500/30 shadow-lg shadow-orange-500/25"
                              : "bg-blue-500/20 group-hover:bg-blue-500/30 shadow-lg shadow-blue-500/25"
                          }`}
                        >
                          {resource.service === "EKS" || resource.service === "GKE" ? (
                            <Cpu className="h-4 w-4" />
                          ) : resource.service === "BigQuery" ? (
                            <Database className="h-4 w-4" />
                          ) : resource.service === "RDS" ? (
                            <Database className="h-4 w-4" />
                          ) : resource.service === "ALB" ? (
                            <Network className="h-4 w-4" />
                          ) : (
                            <Globe className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white group-hover:text-cyan-300 transition-colors">
                            {resource.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {resource.provider} • {resource.service}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <p className="font-medium text-white glow-text">${resource.cost}</p>
                          <div className="flex items-center gap-2">
                            <Progress value={resource.utilization} className="w-16 h-2 glass-progress" />
                            <span className="text-xs text-gray-400">{resource.utilization}%</span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="glass-dropdown border-white/10">
                            <DropdownMenuItem onClick={() => handleResourceAction(resource.name, "View Details")}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleResourceAction(resource.name, "Optimize")}>
                              Optimize
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleResourceAction(resource.name, "Stop")}>
                              <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
                              Stop Resource
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="space-y-8">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white glow-text">Cost Analysis</CardTitle>
                <CardDescription className="text-gray-400">Detailed cost breakdown and analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Cost analysis features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-8">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white glow-text">Resource Inventory</CardTitle>
                    <CardDescription className="text-gray-400">
                      All active cloud resources and their costs
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-button border-white/20 text-gray-300 hover:text-white hover:border-cyan-500/50 bg-transparent"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-button border-white/20 text-gray-300 hover:text-white hover:border-cyan-500/50 bg-transparent"
                      onClick={handleExport}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-white/5">
                      <TableHead className="text-cyan-300 font-semibold">Resource</TableHead>
                      <TableHead className="text-cyan-300 font-semibold">Provider</TableHead>
                      <TableHead className="text-cyan-300 font-semibold">Service</TableHead>
                      <TableHead className="text-cyan-300 font-semibold">Region</TableHead>
                      <TableHead className="text-cyan-300 font-semibold">Status</TableHead>
                      <TableHead className="text-cyan-300 font-semibold">Utilization</TableHead>
                      <TableHead className="text-cyan-300 font-semibold text-right">Monthly Cost</TableHead>
                      <TableHead className="text-cyan-300 font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources.map((resource) => (
                      <TableRow
                        key={resource.id}
                        className="border-white/10 hover:bg-white/5 transition-all duration-300 group"
                      >
                        <TableCell className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                          {resource.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={
                              resource.provider === "AWS"
                                ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                                : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            }
                          >
                            {resource.provider}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">{resource.service}</TableCell>
                        <TableCell className="text-gray-300">{resource.region}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-green-400 capitalize">{resource.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={resource.utilization} className="w-16 h-2 glass-progress" />
                            <span className="text-gray-300 text-sm">{resource.utilization}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-white font-medium glow-text">${resource.cost}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                              >
                                <Settings className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="glass-dropdown border-white/10">
                              <DropdownMenuItem onClick={() => handleResourceAction(resource.name, "View Details")}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleResourceAction(resource.name, "Optimize")}>
                                Optimize
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleResourceAction(resource.name, "Stop")}>
                                <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
                                Stop Resource
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-8">
            <div className="grid gap-6">
              {recommendations.map((rec) => (
                <Card
                  key={rec.id}
                  className="glass-card border-white/20 hover:border-yellow-500/50 transition-all duration-300 group"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-yellow-500/20 group-hover:bg-yellow-500/30 transition-colors shadow-lg shadow-yellow-500/25">
                          <Lightbulb className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg group-hover:text-yellow-300 transition-colors glow-text">
                            {rec.title}
                          </CardTitle>
                          <CardDescription className="text-gray-400 mt-1">{rec.description}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          rec.provider === "AWS"
                            ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                            : rec.provider === "GCP"
                              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                              : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                        }
                      >
                        {rec.provider}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-400 glow-text">${rec.savings}</p>
                          <p className="text-xs text-gray-400">Monthly Savings</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <Badge
                              variant={
                                rec.impact === "high"
                                  ? "destructive"
                                  : rec.impact === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="mb-1"
                            >
                              {rec.impact} impact
                            </Badge>
                            <p className="text-xs text-gray-400">Impact</p>
                          </div>
                          <div className="text-center">
                            <Badge
                              variant={
                                rec.effort === "low" ? "secondary" : rec.effort === "medium" ? "default" : "destructive"
                              }
                              className="mb-1"
                            >
                              {rec.effort} effort
                            </Badge>
                            <p className="text-xs text-gray-400">Effort</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="glass-button border-white/20 text-gray-300 hover:text-white hover:border-cyan-500/50 bg-transparent"
                        >
                          Learn More
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/25 transition-all duration-300"
                          onClick={() => handleImplementRecommendation(rec.id, rec.title)}
                        >
                          Implement
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-8">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white glow-text">Budgets & Alerts</CardTitle>
                <CardDescription className="text-gray-400">Manage your budgets and set up alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Budget management and alerting features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-8">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white glow-text">Reports</CardTitle>
                <CardDescription className="text-gray-400">Generate and download detailed reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">Reporting and analytics features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
