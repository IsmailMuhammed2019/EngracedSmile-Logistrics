'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  useColorModeValue,
  Spinner,
  Center,
  Badge,
  Image,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Divider,
  Textarea,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiClock,
  FiStar,
  FiShield,
  FiWifi,
  FiWind,
  FiNavigation,
  FiUser,
  FiPhone,
  FiMail,
} from 'react-icons/fi';

interface Vehicle {
  id: string;
  name: string;
  description: string;
  type: string;
  capacity: number;
  pricePerTrip: number;
  features: string[];
  images: string[];
  plateNumber?: string;
  year?: number;
  color?: string;
  isAvailable: boolean;
  rating: number;
  totalTrips: number;
  driver?: {
    id: string;
    firstName: string;
    lastName: string;
    rating: number;
    yearsOfExperience: number;
    phone: string;
    email: string;
  };
  routes?: Route[];
}

interface Route {
  id: string;
  name: string;
  departureCity: string;
  arrivalCity: string;
  departureTime: string;
  arrivalTime?: string;
  price: number;
  distance?: number;
  estimatedDuration?: number;
  isAvailable: boolean;
}

export default function VehicleDetailPage() {
  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [bookingData, setBookingData] = useState({
    passengerName: '',
    passengerEmail: '',
    passengerPhone: '',
    specialRequests: '',
    emergencyContact: '',
    emergencyPhone: '',
  });
  const [isBooking, setIsBooking] = useState(false);
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const toast = useToast();

  const bg = 'gray.50';
  const cardBg = 'white';

  useEffect(() => {
    const vehicleId = urlSearchParams.get('vehicleId');
    const routeId = urlSearchParams.get('routeId');
    
    if (vehicleId && routeId) {
      fetchVehicleDetails(vehicleId, routeId);
    } else {
      router.push('/car-booking');
    }
  }, [urlSearchParams, router]);

  const fetchVehicleDetails = async (vehicleId: string, routeId: string) => {
    try {
      // This would be replaced with actual API call
      const mockVehicle: Vehicle = {
        id: vehicleId,
        name: 'Toyota Sienna Standard',
        description: 'Comfortable inter-state transportation with modern amenities and professional service',
        type: 'sienna',
        capacity: 8,
        pricePerTrip: 5000,
        features: ['Air Conditioning', 'WiFi', 'Comfortable Seats', 'Entertainment System', 'Professional Driver'],
        images: ['/sienna.jpg', '/sienna2.jpg', '/sienna3.jpg'],
        plateNumber: 'ABC-123-XY',
        year: 2022,
        color: 'White',
        isAvailable: true,
        rating: 4.5,
        totalTrips: 150,
        driver: {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          rating: 4.8,
          yearsOfExperience: 5,
          phone: '+234 801 234 5678',
          email: 'john.doe@engraced.com',
        },
        routes: [
          {
            id: routeId,
            name: 'Lagos to Abuja',
            departureCity: 'Lagos',
            arrivalCity: 'Abuja',
            departureTime: '08:00',
            arrivalTime: '14:00',
            price: 5000,
            distance: 750,
            estimatedDuration: 360,
            isAvailable: true,
          },
        ],
      };
      
      setVehicle(mockVehicle);
      setSelectedRoute(mockVehicle.routes?.find(route => route.id === routeId) || null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch vehicle details',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!vehicle || !selectedRoute) return;

    // Validate required fields
    if (!bookingData.passengerName || !bookingData.passengerEmail || !bookingData.passengerPhone) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsBooking(true);

    try {
      // This would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      toast({
        title: 'Booking Successful!',
        description: 'Your booking has been confirmed. You will receive a confirmation email shortly.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Redirect to booking success page
      router.push('/booking/success');
    } catch (error) {
      toast({
        title: 'Booking Failed',
        description: 'There was an error processing your booking. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsBooking(false);
    }
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'air conditioning':
        return FiWind;
      case 'wifi':
        return FiWifi;
      case 'entertainment system':
        return FiStar;
      case 'professional driver':
        return FiUser;
      default:
        return FiStar;
    }
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="primary.500" />
      </Center>
    );
  }

  if (!vehicle || !selectedRoute) {
    return (
      <Center h="100vh">
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Vehicle not found!</AlertTitle>
          <AlertDescription>The requested vehicle could not be found.</AlertDescription>
        </Alert>
      </Center>
    );
  }

  return (
    <Box bg={bg} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          {/* Vehicle Details */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Vehicle Images */}
              <Card bg={cardBg}>
                <CardBody>
                  <Image
                    src={vehicle.images[0] || '/sienna.jpg'}
                    alt={vehicle.name}
                    borderRadius="lg"
                    h="400px"
                    w="full"
                    objectFit="cover"
                  />
                </CardBody>
              </Card>

              {/* Vehicle Information */}
              <Card bg={cardBg}>
                <CardHeader>
                  <HStack justify="space-between">
                    <Heading size="lg">{vehicle.name}</Heading>
                    <Badge colorScheme="green" variant="subtle" size="lg">
                      {vehicle.type.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </HStack>
                </CardHeader>
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <Text color="gray.600" fontSize="lg">
                      {vehicle.description}
                    </Text>

                    {/* Vehicle Stats */}
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                      <VStack>
                        <Text fontSize="sm" color="gray.500">Capacity</Text>
                        <Text fontWeight="bold">{vehicle.capacity} Passengers</Text>
                      </VStack>
                      <VStack>
                        <Text fontSize="sm" color="gray.500">Rating</Text>
                        <HStack>
                          <Icon as={FiStar} color="yellow.400" />
                          <Text fontWeight="bold">{vehicle.rating}</Text>
                        </HStack>
                      </VStack>
                      <VStack>
                        <Text fontSize="sm" color="gray.500">Total Trips</Text>
                        <Text fontWeight="bold">{vehicle.totalTrips}</Text>
                      </VStack>
                    </Grid>

                    <Divider />

                    {/* Features */}
                    <VStack align="stretch" spacing={3}>
                      <Heading size="md">Features & Amenities</Heading>
                      <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                        {vehicle.features.map((feature, index) => (
                          <HStack key={index} spacing={3}>
                            <Icon as={getFeatureIcon(feature)} color="primary.500" />
                            <Text>{feature}</Text>
                          </HStack>
                        ))}
                      </Grid>
                    </VStack>

                    <Divider />

                    {/* Driver Information */}
                    {vehicle.driver && (
                      <VStack align="stretch" spacing={3}>
                        <Heading size="md">Your Driver</Heading>
                        <Card variant="outline">
                          <CardBody>
                            <HStack spacing={4}>
                              <Box
                                w="60px"
                                h="60px"
                                bg="primary.100"
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Icon as={FiUser} boxSize={6} color="primary.500" />
                              </Box>
                              <VStack align="start" spacing={1}>
                                <Text fontWeight="bold">
                                  {vehicle.driver.firstName} {vehicle.driver.lastName}
                                </Text>
                                <HStack>
                                  <Icon as={FiStar} color="yellow.400" />
                                  <Text fontSize="sm">{vehicle.driver.rating} Rating</Text>
                                </HStack>
                                <Text fontSize="sm" color="gray.600">
                                  {vehicle.driver.yearsOfExperience} years experience
                                </Text>
                                <HStack spacing={4}>
                                  <HStack spacing={1}>
                                    <Icon as={FiPhone} boxSize={3} color="gray.500" />
                                    <Text fontSize="sm">{vehicle.driver.phone}</Text>
                                  </HStack>
                                  <HStack spacing={1}>
                                    <Icon as={FiMail} boxSize={3} color="gray.500" />
                                    <Text fontSize="sm">{vehicle.driver.email}</Text>
                                  </HStack>
                                </HStack>
                              </VStack>
                            </HStack>
                          </CardBody>
                        </Card>
                      </VStack>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </GridItem>

          {/* Booking Form */}
          <GridItem>
            <Card bg={cardBg} position="sticky" top="20px">
              <CardHeader>
                <Heading size="md">Book Your Trip</Heading>
                <Text color="gray.600">Complete your booking details</Text>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {/* Route Information */}
                  <Card variant="outline" bg="primary.50">
                    <CardBody>
                      <VStack align="stretch" spacing={2}>
                        <HStack justify="space-between">
                          <Text fontWeight="bold">
                            {selectedRoute.departureCity} → {selectedRoute.arrivalCity}
                          </Text>
                          <Text fontWeight="bold" color="primary.500" fontSize="lg">
                            ₦{selectedRoute.price.toLocaleString()}
                          </Text>
                        </HStack>
                        <HStack justify="space-between" fontSize="sm" color="gray.600">
                          <HStack>
                            <Icon as={FiClock} />
                            <Text>Departure: {selectedRoute.departureTime}</Text>
                          </HStack>
                          {selectedRoute.arrivalTime && (
                            <Text>Arrival: {selectedRoute.arrivalTime}</Text>
                          )}
                        </HStack>
                        {selectedRoute.distance && (
                          <Text fontSize="sm" color="gray.600">
                            Distance: {selectedRoute.distance}km
                          </Text>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>

                  {/* Booking Form */}
                  <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                      <FormLabel>Full Name</FormLabel>
                      <Input
                        placeholder="Enter your full name"
                        value={bookingData.passengerName}
                        onChange={(e) => setBookingData({ ...bookingData, passengerName: e.target.value })}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={bookingData.passengerEmail}
                        onChange={(e) => setBookingData({ ...bookingData, passengerEmail: e.target.value })}
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        placeholder="Enter your phone number"
                        value={bookingData.passengerPhone}
                        onChange={(e) => setBookingData({ ...bookingData, passengerPhone: e.target.value })}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Emergency Contact Name</FormLabel>
                      <Input
                        placeholder="Emergency contact name"
                        value={bookingData.emergencyContact}
                        onChange={(e) => setBookingData({ ...bookingData, emergencyContact: e.target.value })}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Emergency Contact Phone</FormLabel>
                      <Input
                        placeholder="Emergency contact phone"
                        value={bookingData.emergencyPhone}
                        onChange={(e) => setBookingData({ ...bookingData, emergencyPhone: e.target.value })}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Special Requests</FormLabel>
                      <Textarea
                        placeholder="Any special requests or notes..."
                        value={bookingData.specialRequests}
                        onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                      />
                    </FormControl>

                    <Button
                      colorScheme="primary"
                      size="lg"
                      onClick={handleBooking}
                      isLoading={isBooking}
                      loadingText="Processing Booking..."
                    >
                      Confirm Booking - ₦{selectedRoute.price.toLocaleString()}
                    </Button>

                    <Text fontSize="sm" color="gray.600" textAlign="center">
                      By booking, you agree to our terms and conditions
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
