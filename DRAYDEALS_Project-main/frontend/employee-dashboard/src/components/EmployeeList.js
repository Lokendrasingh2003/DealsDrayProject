import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Image, useToast, Box, Heading, Spinner, Text, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { getEmployees, deleteEmployee } from '../services/api';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash } from 'react-icons/fi';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  
  // Responsive button size
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });

  const fetchEmployees = async () => {
    try {
      const { data } = await getEmployees();
      setEmployees(data);
    } catch (error) {
      toast({
        title: 'Error fetching employees',
        description: 'Unable to fetch employee data. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      toast({
        title: 'Employee Deleted',
        description: 'Employee has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchEmployees(); // Refresh the employee list
    } catch (error) {
      toast({
        title: 'Error Deleting Employee',
        description: 'There was an error deleting the employee. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="80vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (employees.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="80vh">
        <Text fontSize="lg" color="gray.500">No employees found</Text>
      </Box>
    );
  }

  return (
    <Box maxW="7xl" mx="auto" mt={8} p={4}>
      <Heading as="h2" size="lg" mb={6} textAlign="center" color="teal.600">Employee List</Heading>
      <Table variant="simple" size="md" boxShadow="lg" borderRadius="md" overflowX="auto">
        <Thead bg="gray.100">
          <Tr>
            <Th>Image</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Mobile No</Th>
            <Th>Designation</Th>
            <Th>Gender</Th>
            <Th>Courses</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees.map((employee) => (
            <Tr key={employee._id} _hover={{ bg: 'gray.50' }}>
              <Td>
                {employee.img && (
                  <Image
                    src={`http://localhost:5000/${employee.img}`}
                    alt={employee.name}
                    boxSize="50px"
                    objectFit="cover"
                    borderRadius="full"
                    border="2px"
                    borderColor="teal.500"
                  />
                )}
              </Td>
              <Td>{employee.name}</Td>
              <Td>{employee.email}</Td>
              <Td>{employee.mobileNo}</Td>
              <Td>{employee.designation}</Td>
              <Td>{employee.gender}</Td>
              <Td>{employee.courses.join(', ')}</Td>
              <Td>
                <IconButton
                  as={Link}
                  to={`/edit/${employee._id}`}
                  icon={<FiEdit />}
                  size={buttonSize}
                  colorScheme="blue"
                  mr={2}
                  aria-label="Edit Employee"
                />
                <IconButton
                  icon={<FiTrash />}
                  size={buttonSize}
                  colorScheme="red"
                  onClick={() => handleDelete(employee._id)}
                  aria-label="Delete Employee"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EmployeeList;
