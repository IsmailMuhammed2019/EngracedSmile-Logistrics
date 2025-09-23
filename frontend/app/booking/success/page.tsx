'use client';

import { useState, useEffect } from 'react';
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
  useColorModeValue,
  Badge,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import {
  FiCheckCircle,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiUser,
  FiTruck,
  FiDownload,
  FiHome,
} from 'react-icons/fi';

export default function BookingSuccessPage() {
  const [bookingDetails, setBookingDetails] = useState({
    bookingId: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    vehicleName: 'Toyota Sienna Standard',
    route: 'Lagos → Abuja',
    departureTime: '08:00',
    arrivalTime: '14:00',
    date: new Date().toLocaleDateString(),
    price: 5000,
    passengerName: 'John Doe',
    driverName: 'John Doe',
    driverPhone: '+234 801 234 5678',
  });
  const router = useRouter();

  const bg = 'gray.50';
  const cardBg = 'white';

  const handleDownloadTicket = () => {
    // Implement ticket download functionality
    console.log('Downloading ticket...');
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const handleViewBookings = () => {
    router.push('/admin/car-bookings');
  };

  return (
    <Box bg={bg} minH="100vh" py={8}>
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          {/* Success Message */}
          <Card bg={cardBg}>
            <CardBody>
              <VStack spacing={6} textAlign="center">
                <Icon as={FiCheckCircle} boxSize={16} color="green.500" />
                <VStack spacing={2}>
                  <Heading size="lg" color="green.500">
                    Booking Confirmed!
                  </Heading>
                  <Text color="gray.600" fontSize="lg">
                    Your trip has been successfully booked. You will receive a confirmation email shortly.
                  </Text>
                </VStack>
                <Badge colorScheme="green" variant="subtle" size="lg">
                  Booking ID: {bookingDetails.bookingId}
                </Badge>
              </VStack>
            </CardBody>
          </Card>

          {/* Booking Details */}
          <Card bg={cardBg}>
            <CardHeader>
              <Heading size="md">Booking Details</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between">
                  <HStack>
                    <Icon as={FiTruck} color="primary.500" />
                    <Text fontWeight="medium">Vehicle</Text>
                  </HStack>
                  <Text>{bookingDetails.vehicleName}</Text>
                </HStack>

                <HStack justify="space-between">
                  <HStack>
                    <Icon as={FiMapPin} color="primary.500" />
                    <Text fontWeight="medium">Route</Text>
                  </HStack>
                  <Text>{bookingDetails.route}</Text>
                </HStack>

                <HStack justify="space-between">
                  <HStack>
                    <Icon as={FiCalendar} color="primary.500" />
                    <Text fontWeight="medium">Date</Text>
                  </HStack>
                  <Text>{bookingDetails.date}</Text>
                </HStack>

                <HStack justify="space-between">
                  <HStack>
                    <Icon as={FiClock} color="primary.500" />
                    <Text fontWeight="medium">Departure Time</Text>
                  </HStack>
                  <Text>{bookingDetails.departureTime}</Text>
                </HStack>

                <HStack justify="space-between">
                  <HStack>
                    <Icon as={FiClock} color="primary.500" />
                    <Text fontWeight="medium">Arrival Time</Text>
                  </HStack>
                  <Text>{bookingDetails.arrivalTime}</Text>
                </HStack>

                <HStack justify="space-between">
                  <HStack>
                    <Icon as={FiUser} color="primary.500" />
                    <Text fontWeight="medium">Driver</Text>
                  </HStack>
                  <VStack align="end" spacing={0}>
                    <Text>{bookingDetails.driverName}</Text>
                    <Text fontSize="sm" color="gray.600">{bookingDetails.driverPhone}</Text>
                  </VStack>
                </HStack>

                <Divider />

                <HStack justify="space-between">
                  <Text fontWeight="bold" fontSize="lg">Total Amount</Text>
                  <Text fontWeight="bold" fontSize="lg" color="primary.500">
                    ₦{bookingDetails.price.toLocaleString()}
                  </Text>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Important Information */}
          <Alert status="info">
            <AlertIcon />
            <Box>
              <AlertTitle>Important Information!</AlertTitle>
              <AlertDescription>
                Please arrive at the departure point 15 minutes before the scheduled departure time. 
                Contact your driver if you have any questions or need assistance.
              </AlertDescription>
            </Box>
          </Alert>

          {/* Action Buttons */}
          <HStack spacing={4} justify="center">
            <Button
              colorScheme="primary"
              leftIcon={<Icon as={FiDownload} />}
              onClick={handleDownloadTicket}
            >
              Download Ticket
            </Button>
            <Button
              variant="outline"
              leftIcon={<Icon as={FiHome} />}
              onClick={handleGoHome}
            >
              Go Home
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}