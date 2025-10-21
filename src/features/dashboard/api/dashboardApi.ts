// src/features/dashboard/api/dashboardApi.ts
export interface DashboardStats {
  totalUsers: number;
  totalTests: number;
  pendingTests: number;
  completedTests: number;
  todayRevenue: number;
  activeProjects: number;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  time: string;
  type: "success" | "warning" | "info" | "error";
}

export interface ChartDataPoint {
  name: string;
  users: number;
  tests: number;
  revenue: number;
}

// Mock data - replace with real API calls
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    return {
      totalUsers: 1247,
      totalTests: 3845,
      pendingTests: 234,
      completedTests: 3611,
      todayRevenue: 45678,
      activeProjects: 18,
    };
  },

  getRecentActivities: async (): Promise<Activity[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    return [
      {
        id: "1",
        user: "System Admin",
        action: "Created new user account",
        time: "2 minutes ago",
        type: "success",
      },
      {
        id: "2",
        user: "John Doe",
        action: "Completed blood test analysis",
        time: "5 minutes ago",
        type: "info",
      },
      {
        id: "3",
        user: "Jane Smith",
        action: "Updated patient records",
        time: "10 minutes ago",
        type: "warning",
      },
      {
        id: "4",
        user: "Lab Tech",
        action: "Started DNA sequencing",
        time: "15 minutes ago",
        type: "info",
      },
      {
        id: "5",
        user: "System",
        action: "Automated backup completed",
        time: "30 minutes ago",
        type: "success",
      },
    ];
  },

  getChartData: async (): Promise<ChartDataPoint[]> => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    
    return [
      { name: "Mon", users: 45, tests: 120, revenue: 4200 },
      { name: "Tue", users: 52, tests: 145, revenue: 5100 },
      { name: "Wed", users: 48, tests: 132, revenue: 4800 },
      { name: "Thu", users: 61, tests: 168, revenue: 6300 },
      { name: "Fri", users: 55, tests: 155, revenue: 5500 },
      { name: "Sat", users: 38, tests: 98, revenue: 3200 },
      { name: "Sun", users: 42, tests: 110, revenue: 3900 },
    ];
  },
};
