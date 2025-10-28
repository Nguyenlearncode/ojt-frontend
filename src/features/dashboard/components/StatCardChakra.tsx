import React from "react";
import { Box, Flex, Text, Icon, HStack, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const MotionBox = motion(Box);

interface StatCardChakraProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  prefix?: string;
  suffix?: string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  delay?: number;
}

const StatCardChakra: React.FC<StatCardChakraProps> = ({
  title,
  value,
  icon,
  color,
  prefix = "",
  suffix = "",
  trend,
  delay = 0,
}) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "xl" }}
    >
      <Box
        bg="white"
        p={6}
        borderRadius="xl"
        boxShadow="md"
        position="relative"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{
          transform: "translateY(-4px)",
          boxShadow: "2xl",
        }}
      >
        {/* Gradient Background Accent */}
        <Box
          position="absolute"
          top={0}
          right={0}
          width="100px"
          height="100px"
          bgGradient={`linear(to-br, ${color}, transparent)`}
          opacity={0.1}
          borderRadius="full"
          transform="translate(30%, -30%)"
        />

        <Flex align="center" justify="space-between" position="relative">
          {/* Icon */}
          <Flex
            bg={`${color.split('.')[0]}.50`}
            color={color}
            p={4}
            borderRadius="xl"
            boxShadow="sm"
          >
            <Icon as={icon} boxSize={7} />
          </Flex>

          {/* Value */}
          <VStack align="flex-end" spacing={0}>
            <Text fontSize="3xl" fontWeight="bold" color="gray.800">
              <CountUp
                start={0}
                end={value}
                duration={2}
                separator=","
                prefix={prefix}
                suffix={suffix}
                delay={delay}
              />
            </Text>
            <Text fontSize="sm" color="gray.600" fontWeight="medium">
              {title}
            </Text>
          </VStack>
        </Flex>

        {/* Trend */}
        {trend && (
          <HStack
            mt={4}
            pt={4}
            borderTop="1px"
            borderColor="gray.100"
            spacing={2}
          >
            <Flex
              align="center"
              gap={1}
              color={trend.isUp ? "green.500" : "red.500"}
              fontWeight="600"
              fontSize="sm"
            >
              <Icon as={trend.isUp ? FiTrendingUp : FiTrendingDown} />
              <Text>{trend.value}%</Text>
            </Flex>
            <Text fontSize="xs" color="gray.500">
              vs last month
            </Text>
          </HStack>
        )}
      </Box>
    </MotionBox>
  );
};

export default StatCardChakra;

