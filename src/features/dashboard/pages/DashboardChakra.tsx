import React from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiUsers, FiActivity, FiClock, FiCheckCircle, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import { useDashboard } from "../hooks/useDashboard";
import StatCardChakra from "../components/StatCardChakra";
import RecentActivityChakra from "../components/RecentActivityChakra";
import QuickActionsChakra from "../components/QuickActionsChakra";
import PerformanceChartChakra from "../components/PerformanceChartChakra";

const MotionBox = motion(Box);

const DashboardChakra: React.FC = () => {
  const { stats, activities, chartData, loading, error } = useDashboard();

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center" direction="column" gap={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
        <Text color="gray.600">Loading dashboard...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Container maxW="container.md" py={10}>
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          borderRadius="xl"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <Text mt={4} mb={1} fontSize="lg" fontWeight="bold">
            {error}
          </Text>
          <Button
            colorScheme="red"
            mt={4}
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Box minH="100vh" py={8}>
      <Container maxW="container.xl">
        {/* Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          mb={8}
        >
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <VStack align="flex-start" spacing={1}>
              <Heading 
                size="xl" 
                bgGradient="linear(to-r, pink.300, white, blue.300)"
                bgClip="text"
                fontWeight="extrabold"
              >
                Laboratory Dashboard
              </Heading>
              <Text 
                bgGradient="linear(to-r, whiteAlpha.900, pink.200)"
                bgClip="text"
                fontSize="md"
                fontWeight="medium"
              >
                Welcome back! Here's what's happening in your lab today.
              </Text>
            </VStack>
            <Text 
              color="whiteAlpha.800" 
              fontSize="sm"
              textShadow="0px 1px 2px rgba(0,0,0,0.2)"
            >
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Text>
          </Flex>
        </MotionBox>

        {/* Stats Grid */}
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
          mb={8}
        >
          <StatCardChakra
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={FiUsers}
            color="blue.500"
            trend={{ value: 12.5, isUp: true }}
            delay={0}
          />
          <StatCardChakra
            title="Total Tests"
            value={stats?.totalTests || 0}
            icon={FiActivity}
            color="green.500"
            trend={{ value: 8.3, isUp: true }}
            delay={0.1}
          />
          <StatCardChakra
            title="Pending Tests"
            value={stats?.pendingTests || 0}
            icon={FiClock}
            color="orange.500"
            trend={{ value: 3.2, isUp: false }}
            delay={0.2}
          />
          <StatCardChakra
            title="Completed Tests"
            value={stats?.completedTests || 0}
            icon={FiCheckCircle}
            color="purple.500"
            trend={{ value: 15.7, isUp: true }}
            delay={0.3}
          />
          <StatCardChakra
            title="Active Projects"
            value={stats?.activeProjects || 0}
            icon={FiTrendingUp}
            color="pink.500"
            trend={{ value: 5.1, isUp: true }}
            delay={0.4}
          />
          <StatCardChakra
            title="Today's Revenue"
            value={stats?.todayRevenue || 0}
            icon={FiDollarSign}
            color="cyan.500"
            prefix="$"
            trend={{ value: 18.2, isUp: true }}
            delay={0.5}
          />
        </Grid>

        {/* Main Content Grid */}
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "2fr 1fr",
          }}
          gap={6}
        >
          {/* Left Column */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              <PerformanceChartChakra data={chartData} />
              <QuickActionsChakra />
            </VStack>
          </GridItem>

          {/* Right Column */}
          <GridItem>
            <RecentActivityChakra activities={activities} />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardChakra;

