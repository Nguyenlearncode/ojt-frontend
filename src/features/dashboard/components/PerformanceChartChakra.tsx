import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { ChartDataPoint } from "../api/dashboardApi";

const MotionBox = motion(Box);

interface PerformanceChartChakraProps {
  data: ChartDataPoint[];
}

const PerformanceChartChakra: React.FC<PerformanceChartChakraProps> = ({ data }) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Box
        bg="white"
        p={6}
        borderRadius="xl"
        boxShadow="md"
        _hover={{ boxShadow: "lg" }}
        transition="all 0.3s"
      >
        <Heading size="md" mb={6} color="gray.700">
          Weekly Performance
        </Heading>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3182CE" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3182CE" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorTests" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38A169" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#38A169" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="name" stroke="#718096" />
            <YAxis stroke="#718096" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#3182CE"
              fillOpacity={1}
              fill="url(#colorUsers)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="tests"
              stroke="#38A169"
              fillOpacity={1}
              fill="url(#colorTests)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </MotionBox>
  );
};

export default PerformanceChartChakra;

