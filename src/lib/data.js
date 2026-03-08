// ============================================================
// DESIGN SYSTEM
// ============================================================
//@ts-nocheck
export const DS = {
  colors: {
    bg: "#0A0E1A",
    surface: "#0F1628",
    surfaceHigh: "#141C35",
    border: "#1E2A4A",
    borderLight: "#263354",
    accent: "#3B82F6",
    accentGlow: "#3B82F640",
    accentHover: "#2563EB",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#06B6D4",
    purple: "#8B5CF6",
    pink: "#EC4899",
    text: "#F1F5F9",
    textMuted: "#64748B",
    textDim: "#94A3B8",
  },
};

export const ROLES = [
  "Super Admin",
  "National Head",
  "Project Head",
  "NOC Team",
  "State Planner",
  "L1 Support",
  "L2 Engineer",
  "L3 Engineer",
  "Site Engineer",
  "Customer",
];

export const MOCK_TICKETS = Array.from({ length: 40 }, (_, i) => ({
  id: `TKT-${String(2024001 + i).padStart(7, "0")}`,
  title: [
    "Network Device Failure",
    "Card Reader Offline",
    "Server Connectivity Issue",
    "Power Supply Fault",
    "Software Crash",
    "Display Not Working",
    "Printer Jam",
    "Database Error",
    "Sensor Malfunction",
    "Router Down",
  ][i % 10],
  priority: ["Critical", "High", "Medium", "Low"][i % 4],
  status: ["Open", "In Progress", "Pending", "Resolved", "Closed"][i % 5],
  state: [
    "Maharashtra",
    "Delhi",
    "Karnataka",
    "Tamil Nadu",
    "Gujarat",
    "Rajasthan",
    "UP",
    "MP",
  ][i % 8],
  city: [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Bhopal",
  ][i % 8],
  customer: ["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank", "PNB"][i % 5],
  project: [
    "Metro Rail AFC",
    "Bus Rapid Transit",
    "Airport Ticketing",
    "Railway Stations",
    "City Buses",
  ][i % 5],
  engineer:
    i % 3 === 0
      ? null
      : ["Rajesh Kumar", "Priya Sharma", "Amit Singh", "Sunita Patel"][i % 4],
  created: new Date(Date.now() - i * 86400000 * 2).toISOString().split("T")[0],
  sla: i % 7 === 0 ? "Breached" : "On Track",
  remarks: [],
}));

export const MOCK_ENGINEERS = Array.from({ length: 12 }, (_, i) => ({
  id: `ENG-${String(100 + i).padStart(4, "0")}`,
  name: [
    "Rajesh Kumar",
    "Priya Sharma",
    "Amit Singh",
    "Sunita Patel",
    "Vivek Rao",
    "Meera Nair",
    "Kiran Das",
    "Pooja Mehta",
    "Suresh Iyer",
    "Anita Gupta",
    "Deepak Joshi",
    "Ritu Singh",
  ][i],
  email: `engineer${i + 1}@company.com`,
  phone: `+91 98${String(10000000 + i * 1234567).slice(0, 8)}`,
  skills: [
    ["Hardware", "Networking"],
    ["Software", "Database"],
    ["Networking", "RF"],
    ["Hardware", "Power"],
    ["Software", "Hardware"],
  ][i % 5],
  state: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat"][i % 5],
  city: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Ahmedabad"][i % 5],
  status: i % 4 === 0 ? "Offline" : i % 4 === 1 ? "Busy" : "Online",
  activeTickets: i % 5,
  totalResolved: 45 + i * 12,
  slaCompliance: 85 + (i % 15),
  avgResolution: `${2 + (i % 6)}h ${(i * 17) % 60}m`,
}));

export const MOCK_CUSTOMERS = Array.from({ length: 8 }, (_, i) => ({
  id: `CUST-${String(1001 + i)}`,
  name: [
    "HDFC Bank",
    "SBI",
    "ICICI Bank",
    "Axis Bank",
    "PNB",
    "Canara Bank",
    "BOB",
    "Union Bank",
  ][i],
  contact: [
    "Rahul Verma",
    "Sanjay Gupta",
    "Ananya Roy",
    "Vikram Nair",
    "Preethi Das",
    "Sunil Kumar",
    "Kavita Shah",
    "Mohan Lal",
  ][i],
  email: `contact${i + 1}@bank.com`,
  projects: 2 + (i % 4),
  tickets: 15 + i * 8,
  status: i % 5 === 0 ? "Inactive" : "Active",
}));

export const MOCK_INVENTORY = Array.from({ length: 15 }, (_, i) => ({
  id: `INV-${String(5001 + i)}`,
  device: [
    "Card Reader",
    "Validator",
    "Server",
    "Router",
    "Switch",
    "UPS",
    "Camera",
    "Printer",
    "Display",
    "Sensor",
  ][i % 10],
  serial: `SN-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
  stock: 5 + i * 3,
  state: ["Maharashtra", "Delhi", "Karnataka"][i % 3],
  status: i % 4 === 0 ? "Faulty" : i % 4 === 1 ? "In Transit" : "Available",
}));

export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "tickets", label: "Tickets", icon: "🎫" },
  { id: "bulk-upload", label: "Bulk Upload", icon: "📥" },
  { id: "customers", label: "Customers", icon: "🏦" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "engineers", label: "Engineers", icon: "👷" },
  { id: "inventory", label: "Inventory", icon: "📦" },
  { id: "reports", label: "Reports", icon: "📈" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

export const ROLE_PAGES = {
  "Super Admin": [
    "dashboard",
    "tickets",
    "bulk-upload",
    "customers",
    "projects",
    "engineers",
    "inventory",
    "reports",
    "settings",
  ],
  "National Head": [
    "dashboard",
    "tickets",
    "customers",
    "projects",
    "engineers",
    "reports",
  ],
  "Project Head": ["dashboard", "tickets", "customers", "projects", "reports"],
  "NOC Team": ["dashboard", "tickets", "bulk-upload", "engineers"],
  "State Planner": ["dashboard", "tickets", "engineers", "reports"],
  "L1 Support": ["dashboard", "tickets"],
  "L2 Engineer": ["dashboard", "tickets", "reports"],
  "L3 Engineer": ["dashboard", "tickets", "reports"],
  "Site Engineer": ["dashboard", "tickets"],
  Customer: ["dashboard", "tickets", "reports"],
};

export const priorityColor = (p) =>
  ({ Critical: "red", High: "yellow", Medium: "blue", Low: "green" })[p] ||
  "gray";
export const statusColor = (s) =>
  ({
    Open: "blue",
    "In Progress": "purple",
    Pending: "yellow",
    Resolved: "green",
    Closed: "gray",
  })[s] || "gray";
export const engineerStatusColor = (s) =>
  ({ Online: "green", Busy: "yellow", Offline: "gray" })[s] || "gray";
