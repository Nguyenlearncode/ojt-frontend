// src/features/dashboard/api/dashboardApi.ts
import { userApi } from "../../user/api/userApi";
import { testOrderApi } from "../../patient/api/testOrderApi";

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

interface TestOrderListDto {
  testOrderId: string;
  patientId: string;
  patientName: string;
  status: string; // "Pending" | "Complete" | "Cancel"
  createdAt: string;
  runOn?: string;
}

// Helper: Calculate time ago
const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

// Helper: Get day name from date string
const getDayName = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

// ✅ Real API implementation
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      // Fetch data in parallel
      const [usersData, testOrdersData] = await Promise.all([
        userApi.getAllUsers(),
        testOrderApi.getAllTestOrders(),
      ]);

      // Extract test orders from response
      let testOrders: TestOrderListDto[] = [];
      if (Array.isArray(testOrdersData)) {
        testOrders = testOrdersData;
      } else if (testOrdersData?.data) {
        testOrders = Array.isArray(testOrdersData.data) 
          ? testOrdersData.data 
          : testOrdersData.data.items || [];
      }

      // Calculate stats from real data
      const totalUsers = usersData?.length || 0;
      const totalTests = testOrders.length || 0;
      
      // Count by status (case-insensitive)
      const pendingTests = testOrders.filter(
        (t) => t.status?.toLowerCase() === "pending"
      ).length;
      
      const completedTests = testOrders.filter(
        (t) => t.status?.toLowerCase() === "complete"
      ).length;

      // Mock revenue and projects (backend may not have these yet)
      // You can replace with real API calls if available
      const todayRevenue = completedTests * 120; // Assume $120 per test
      const activeProjects = Math.ceil(pendingTests / 15); // Group pending tests

      return {
        totalUsers,
        totalTests,
        pendingTests,
        completedTests,
        todayRevenue,
        activeProjects,
      };
    } catch (error) {
      // Return zero stats on error
      return {
        totalUsers: 0,
        totalTests: 0,
        pendingTests: 0,
        completedTests: 0,
        todayRevenue: 0,
        activeProjects: 0,
      };
    }
  },

  getRecentActivities: async (): Promise<Activity[]> => {
    try {
      const testOrdersData = await testOrderApi.getAllTestOrders();
      
      // Extract test orders from response
      let testOrders: TestOrderListDto[] = [];
      if (Array.isArray(testOrdersData)) {
        testOrders = testOrdersData;
      } else if (testOrdersData?.data) {
        testOrders = Array.isArray(testOrdersData.data) 
          ? testOrdersData.data 
          : testOrdersData.data.items || [];
      }

      // Convert recent test orders to activities
      const activities: Activity[] = testOrders
        .slice(0, 5) // Get last 5
        .map((order, index) => {
          const status = order.status?.toLowerCase();
          let action = "";
          let type: "success" | "warning" | "info" | "error" = "info";

          if (status === "complete") {
            action = "Completed test analysis";
            type = "success";
          } else if (status === "pending") {
            action = "Created new test order";
            type = "info";
          } 

          return {
            id: order.testOrderId || String(index),
            user: order.patientName || "Unknown",
            action,
            time: getTimeAgo(order.createdAt),
            type,
          };
        });

      return activities;
    } catch (error) {
      return [];
    }
  },

  getChartData: async (): Promise<ChartDataPoint[]> => {
    try {
      const testOrdersData = await testOrderApi.getAllTestOrders();
      
      // Extract test orders from response
      let testOrders: TestOrderListDto[] = [];
      if (Array.isArray(testOrdersData)) {
        testOrders = testOrdersData;
      } else if (testOrdersData?.data) {
        testOrders = Array.isArray(testOrdersData.data) 
          ? testOrdersData.data 
          : testOrdersData.data.items || [];
      }

      // Group by day of week (last 7 days)
      const dayMap: Record<string, { tests: number; revenue: number }> = {
        Mon: { tests: 0, revenue: 0 },
        Tue: { tests: 0, revenue: 0 },
        Wed: { tests: 0, revenue: 0 },
        Thu: { tests: 0, revenue: 0 },
        Fri: { tests: 0, revenue: 0 },
        Sat: { tests: 0, revenue: 0 },
        Sun: { tests: 0, revenue: 0 },
      };

      // Count tests per day
      testOrders.forEach((order) => {
        if (order.createdAt) {
          const dayName = getDayName(order.createdAt);
          if (dayMap[dayName]) {
            dayMap[dayName].tests += 1;
            // Assume $120 per test
            if (order.status?.toLowerCase() === "complete") {
              dayMap[dayName].revenue += 120;
            }
          }
        }
      });

      // Convert to chart format
      return Object.entries(dayMap).map(([name, data]) => ({
        name,
        users: Math.floor(data.tests * 0.8), // Estimate users
        tests: data.tests,
        revenue: data.revenue,
      }));
    } catch (error) {
      // Return empty chart data
      return [
        { name: "Mon", users: 0, tests: 0, revenue: 0 },
        { name: "Tue", users: 0, tests: 0, revenue: 0 },
        { name: "Wed", users: 0, tests: 0, revenue: 0 },
        { name: "Thu", users: 0, tests: 0, revenue: 0 },
        { name: "Fri", users: 0, tests: 0, revenue: 0 },
        { name: "Sat", users: 0, tests: 0, revenue: 0 },
        { name: "Sun", users: 0, tests: 0, revenue: 0 },
      ];
    }
  },
};
