import React from "react";
import { Box, Heading, VStack, Flex, Text, Icon, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiXCircle } from "react-icons/fi";
import type { Activity } from "../api/dashboardApi";

const MotionFlex = motion(Flex);

interface RecentActivityChakraProps {
  activities: Activity[];
}

const RecentActivityChakra: React.FC<RecentActivityChakraProps> = ({ activities }) => {
  const getIcon = (type: Activity["type"]) => {
    switch (type) {
      case "success":
        return { icon: FiCheckCircle, color: "green.500" };
      case "warning":
        return { icon: FiAlertCircle, color: "orange.500" };
      case "error":
        return { icon: FiXCircle, color: "red.500" };
      default:
        return { icon: FiInfo, color: "blue.500" };
    }
  };

  const getBadgeColor = (type: Activity["type"]) => {
    switch (type) {
      case "success":
        return "green";
      case "warning":
        return "orange";
      case "error":
        return "red";
      default:
        return "blue";
    }
  };

  return (
    <Box
      bg="white"
      p={6}
      borderRadius="xl"
      boxShadow="md"
      h="full"
      _hover={{ boxShadow: "lg" }}
      transition="all 0.3s"
    >
      <Heading size="md" mb={6} color="gray.700">
        Recent Activity
      </Heading>
      <VStack spacing={4} align="stretch">
        {activities.map((activity, index) => {
          const { icon, color } = getIcon(activity.type);
          return (
            <MotionFlex
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              align="flex-start"
              gap={3}
              p={3}
              borderRadius="lg"
              _hover={{ bg: "gray.50" }}
              cursor="pointer"
              position="relative"
            >
              {/* Icon */}
              <Flex
                bg={`${color.split('.')[0]}.50`}
                color={color}
                p={2}
                borderRadius="lg"
                flexShrink={0}
              >
                <Icon as={icon} boxSize={5} />
              </Flex>

              {/* Content */}
              <Box flex={1}>
                <Flex justify="space-between" align="flex-start" mb={1}>
                  <Text fontWeight="600" color="gray.800" fontSize="sm">
                    {activity.user}
                  </Text>
                  <Badge
                    colorScheme={getBadgeColor(activity.type)}
                    fontSize="xs"
                    px={2}
                  >
                    {activity.type}
                  </Badge>
                </Flex>
                <Text fontSize="sm" color="gray.600" mb={1}>
                  {activity.action}
                </Text>
                <Text fontSize="xs" color="gray.400">
                  {activity.time}
                </Text>
              </Box>
            </MotionFlex>
          );
        })}
      </VStack>
    </Box>
  );
};

export default RecentActivityChakra;

