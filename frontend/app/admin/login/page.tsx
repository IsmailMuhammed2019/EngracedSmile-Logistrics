'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowLeft,
} from 'react-icons/fi';

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // For demo purposes, we'll use hardcoded admin credentials
      // In production, this would make an API call to your backend
      if (formData.email === 'admin@engraced.com' && formData.password === 'admin123') {
        // Store admin authentication
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_user', JSON.stringify({
          id: '1',
          name: 'Admin User',
          email: 'admin@engraced.com',
          role: 'ADMIN',
        }));

        toast({
          title: 'Login Successful!',
          description: 'Welcome to the admin dashboard',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        // Redirect to admin dashboard
        router.push('/admin/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
        toast({
          title: 'Login Failed',
          description: 'Invalid credentials. Please check your email and password.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
      toast({
        title: 'Login Error',
        description: 'Something went wrong. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <Container maxW="md">
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="primary.500">
              Admin Login
            </Heading>
            <Text color="gray.600">
              Sign in to access the admin dashboard
            </Text>
          </VStack>

          {/* Login Form */}
          <Card bg="white" boxShadow="lg">
            <CardHeader>
              <Heading size="md" textAlign="center">
                Welcome Back
              </Heading>
              <Text color="gray.600" textAlign="center" fontSize="sm">
                Enter your credentials to continue
              </Text>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleLogin}>
                <VStack spacing={4} align="stretch">
                  {error && (
                    <Alert status="error">
                      <AlertIcon />
                      <AlertTitle>Login Failed!</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <VStack spacing={4} align="stretch">
                    <Box>
                      <Text fontSize="sm" fontWeight="medium" mb={2}>
                        Email Address
                      </Text>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiUser} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </InputGroup>
                    </Box>

                    <Box>
                      <Text fontSize="sm" fontWeight="medium" mb={2}>
                        Password
                      </Text>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FiLock} color="gray.400" />
                        </InputLeftElement>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          position="absolute"
                          right="0"
                          top="0"
                          height="100%"
                          px={3}
                        >
                          <Icon as={showPassword ? FiEyeOff : FiEye} />
                        </Button>
                      </InputGroup>
                    </Box>
                  </VStack>

                  <Button
                    type="submit"
                    colorScheme="primary"
                    size="lg"
                    isLoading={loading}
                    loadingText="Signing in..."
                    w="full"
                  >
                    Sign In
                  </Button>
                </VStack>
              </form>
            </CardBody>
          </Card>

          {/* Demo Credentials */}
          <Card bg="blue.50" borderColor="blue.200">
            <CardBody>
              <VStack spacing={2} align="start">
                <Text fontWeight="semibold" color="blue.800">
                  Demo Credentials:
                </Text>
                <Text fontSize="sm" color="blue.700">
                  Email: admin@engraced.com
                </Text>
                <Text fontSize="sm" color="blue.700">
                  Password: admin123
                </Text>
              </VStack>
            </CardBody>
          </Card>

          {/* Back to Home */}
          <HStack justify="center">
            <Button
              variant="outline"
              leftIcon={<Icon as={FiArrowLeft} />}
              onClick={() => router.push('/')}
            >
              Back to Home
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}