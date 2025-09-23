'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Grid,
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
} from '@chakra-ui/react';
import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiSearch,
  FiClock,
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
  isAvailable: boolean;
  rating: number;
  driver?: {
    id: string;
    firstName: string;
    lastName: string;
    rating: number;
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

export default function CarBookingPage() {
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
  });
  const router = useRouter();
  const urlSearchParams = useSearchParams();
  const toast = useToast();

  const bg = 'gray.50';
  const cardBg = 'white';

  useEffect(() => {
    const from = urlSearchParams.get('from') || '';
    const to = urlSearchParams.get('to') || '';
    const date = urlSearchParams.get('date') || '';
    const passengers = parseInt(urlSearchParams.get('passengers') || '1');

    setSearchParams({ from, to, date, passengers });
    fetchVehicles();
  }, [urlSearchParams]);

  const fetchVehicles = async () => {
    try {
      const mockVehicles: Vehicle[] = [
        {
          id: '1',
          name: 'Toyota Sienna Standard',
          description: 'Comfortable inter-state transportation with modern amenities',
          type: 'sienna',
          capacity: 8,
          pricePerTrip: 5000,
          features: ['Air Conditioning', 'WiFi', 'Comfortable Seats'],
          images: ['/sienna.jpg'],
          isAvailable: true,
          rating: 4.5,
          driver: {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            rating: 4.8,
          },
          routes: [
            {
              id: '1',
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
        },
        {
          id: '2',
          name: 'Toyota Sienna Executive',
          description: 'Premium inter-state transportation with luxury features',
          type: 'sienna_executive',
          capacity: 8,
          pricePerTrip: 12000,
          features: ['Premium Interior', 'Enhanced AC', 'Leather Seats'],
          images: ['/sienna2.jpg'],
          isAvailable: true,
          rating: 4.8,
          driver: {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            rating: 4.9,
          },
          routes: [
            {
              id: '2',
              name: 'Lagos to Abuja Executive',
              departureCity: 'Lagos',
              arrivalCity: 'Abuja',
              departureTime: '10:00',
              arrivalTime: '16:00',
              price: 12000,
              distance: 750,
              estimatedDuration: 360,
              isAvailable: true,
            },
          ],
        },
      ];
      setVehicles(mockVehicles);
      setFilteredVehicles(mockVehicles);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch vehicles',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered = vehicles;

    if (searchParams.from && searchParams.to) {
      filtered = vehicles.filter(vehicle =>
        vehicle.routes?.some(route =>
          route.departureCity.toLowerCase().includes(searchParams.from.toLowerCase()) &&
          route.arrivalCity.toLowerCase().includes(searchParams.to.toLowerCase())
        )
      );
    }

    if (searchParams.passengers) {
      filtered = filtered.filter(vehicle => vehicle.capacity >= searchParams.passengers);
    }

    setFilteredVehicles(filtered);
  };

  const handleVehicleSelect = (vehicle: Vehicle, route: Route) => {
    const params = new URLSearchParams({
      vehicleId: vehicle.id,
      routeId: route.id,
      from: searchParams.from,
      to: searchParams.to,
      date: searchParams.date,
      passengers: searchParams.passengers.toString(),
    });
    router.push(`/car-booking/details?${params.toString()}`);
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="primary.500" />
      </Center>
    );
  }

  return (
    <Box bg={bg} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Card bg={cardBg} mb={8}>
          <CardHeader>
            <Heading size="md">Search for Your Perfect Ride</Heading>
            <Text color="gray.600">Find the best Sienna vehicle for your journey</Text>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
              <FormControl>
                <FormLabel>From</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FiMapPin} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    placeholder="Departure city"
                    value={searchParams.from}
                    onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>To</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FiMapPin} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    placeholder="Destination city"
                    value={searchParams.to}
                    onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FiCalendar} color="gray.400" />
                  </InputLeftElement>
                  <Input
                    type="date" 
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Passengers</FormLabel>
                <NumberInput
                  min={1}
                  max={8}
                  value={searchParams.passengers}
                  onChange={(value) => setSearchParams({ ...searchParams, passengers: parseInt(value) })}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Grid>
            <Button
              colorScheme="primary"
              leftIcon={<Icon as={FiSearch} />}
              onClick={handleSearch}
              mt={4}
              w="full"
            >
              Search Vehicles
            </Button>
          </CardBody>
        </Card>

        <VStack spacing={6} align="stretch">
          <HStack justify="space-between">
            <Heading size="lg">Available Vehicles</Heading>
            <Text color="gray.600">
              {filteredVehicles.length} vehicle(s) found
            </Text>
          </HStack>

          {filteredVehicles.length === 0 ? (
            <Card bg={cardBg}>
              <CardBody>
                <Center py={8}>
                  <VStack>
                    <Icon as={FiSearch} boxSize={12} color="gray.400" />
                    <Text color="gray.600">No vehicles found for your search criteria</Text>
                    <Button
                      colorScheme="primary"
                      variant="outline"
                      onClick={() => {
                        setSearchParams({ from: '', to: '', date: '', passengers: 1 });
                        setFilteredVehicles(vehicles);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </VStack>
                </Center>
              </CardBody>
            </Card>
          ) : (
            <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
              {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id} bg={cardBg}>
                  <CardBody>
                    <VStack align="stretch" spacing={4}>
                  <Image
                        src={vehicle.images[0] || '/sienna.jpg'}
                        alt={vehicle.name}
                        borderRadius="lg"
                        h="200px"
                        w="full"
                        objectFit="cover"
                      />
                      <VStack align="start" spacing={2}>
                        <HStack justify="space-between" w="full">
                          <Heading size="md">{vehicle.name}</Heading>
                          <Badge colorScheme="green" variant="subtle">
                            {vehicle.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </HStack>
                        <Text color="gray.600">{vehicle.description}</Text>
                        {vehicle.driver && (
                          <HStack>
                            <Icon as={FiUsers} color="gray.500" />
                            <Text fontSize="sm" color="gray.600">
                              Driver: {vehicle.driver.firstName} {vehicle.driver.lastName}
                            </Text>
                          </HStack>
                        )}
                        <Divider />
                        <VStack align="stretch" spacing={3}>
                          <Text fontWeight="semibold">Available Routes:</Text>
                          {vehicle.routes?.map((route) => (
                            <Card key={route.id} variant="outline" size="sm">
                              <CardBody>
                                <VStack align="stretch" spacing={2}>
                                  <HStack justify="space-between">
                                    <Text fontWeight="medium">
                                      {route.departureCity} → {route.arrivalCity}
                                    </Text>
                                    <Text fontWeight="bold" color="primary.500">
                                      ₦{route.price.toLocaleString()}
                                    </Text>
                                  </HStack>
                                  <HStack justify="space-between" fontSize="sm" color="gray.600">
                                    <HStack>
                                      <Icon as={FiClock} />
                                      <Text>{route.departureTime}</Text>
                                    </HStack>
                                    {route.estimatedDuration && (
                                      <Text>{Math.floor(route.estimatedDuration / 60)}h {route.estimatedDuration % 60}m</Text>
                                    )}
                                    {route.distance && (
                                      <Text>{route.distance}km</Text>
                                    )}
                                  </HStack>
                                  <Button
                                    colorScheme="primary"
                                    size="sm"
                                    onClick={() => handleVehicleSelect(vehicle, route)}
                                  >
                                    Book This Route
                                  </Button>
                                </VStack>
                              </CardBody>
                            </Card>
                          ))}
                        </VStack>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
