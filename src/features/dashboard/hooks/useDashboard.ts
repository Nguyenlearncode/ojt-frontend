// src/features/dashboard/hooks/useDashboard.ts
import { useState, useEffect } from "react";
import { dashboardApi, type DashboardStats, type Activity, type ChartDataPoint } from "../api/dashboardApi";

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data in parallel
        const [statsData, activitiesData, chartDataResult] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getRecentActivities(),
          dashboardApi.getChartData(),
        ]);

        setStats(statsData);
        setActivities(activitiesData);
        setChartData(chartDataResult);
        setError(null);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { stats, activities, chartData, loading, error };
};

