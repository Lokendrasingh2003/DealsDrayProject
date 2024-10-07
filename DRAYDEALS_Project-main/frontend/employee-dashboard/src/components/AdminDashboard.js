import React, { useState } from 'react';
import { Box, Button, Flex, Text, VStack, useBreakpointValue, useColorModeValue, Stack } from '@chakra-ui/react';
import AddEmployeeForm from './AddEmployeeForm';
import EmployeeList from './EmployeeList';

const AdminDashboard = () => {
  const [view, setView] = useState('list');

  // Responsive button size
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });

  // Theme-aware background and text colors
  const bg = useColorModeValue('gray.50', 'gray.800');
  const headerBg = useColorModeValue('teal.500', 'teal.600');
  const boxBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box minH="100vh" bg={bg}>
      {/* Header */}
      <Flex 
        as="header" 
        justify="space-between" 
        align="center" 
        p={4} 
        bg={headerBg} 
        color="white"
        boxShadow="lg"
      >
        <Text fontSize="2xl" fontWeight="bold">Admin Dashboard</Text>
      </Flex>

      {/* Content Section */}
      <Box p={6} maxW="7xl" mx="auto">
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={6} align="center">
          <Button 
            onClick={() => setView('add')} 
            colorScheme="teal" 
            size={buttonSize} 
            boxShadow="md"
            _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
          >
            Add Employee
          </Button>
          <Button 
            onClick={() => setView('list')} 
            colorScheme="blue" 
            size={buttonSize} 
            boxShadow="md"
            _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
          >
            Show All Employees
          </Button>
        </Stack>

        {/* Conditional content rendering */}
        <Box 
          borderRadius="lg" 
          borderWidth={1} 
          borderColor={borderColor} 
          p={6} 
          bg={boxBg} 
          boxShadow="md"
        >
          {view === 'add' && <AddEmployeeForm />}
          {view === 'list' && <EmployeeList />}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
