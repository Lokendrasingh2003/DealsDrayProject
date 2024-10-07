import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, Stack, Heading, useColorModeValue, Text } from '@chakra-ui/react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple login validation (can be replaced with real authentication logic)
    if (username === 'admin' && password === 'password') {
      onLogin();
    } else {
      alert('Invalid login credentials');
    }
  };

  // Theme-aware colors
  const bg = useColorModeValue('gray.50', 'gray.800');
  const formBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box minH="100vh" bg={bg} display="flex" alignItems="center" justifyContent="center">
      <Box
        maxW="sm"
        w="full"
        bg={formBg}
        p={8}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Stack spacing={6} align="center">
          {/* Login Heading */}
          <Heading fontSize="2xl" color={textColor}>Login to Admin Dashboard</Heading>

          {/* Login Form */}
          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter your username" 
                focusBorderColor="teal.500"
              />
            </FormControl>

            <FormControl isRequired mt={4}>
              <FormLabel>Password</FormLabel>
              <Input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
                focusBorderColor="teal.500"
              />
            </FormControl>

            <Button 
              colorScheme="teal" 
              mt={6} 
              w="full" 
              type="submit"
              _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
            >
              Login
            </Button>
          </form>

          {/* Optional help text */}
          <Text fontSize="sm" color="gray.500" textAlign="center">
            Use <strong>admin</strong> as username and <strong>password</strong> to login.
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
