export interface PublicService {
  id: string;
  name: string;
  type: 'hospital' | 'school' | 'police' | 'fire' | 'library' | 'community_center';
  address: string;
  phone: string;
  hours: string;
  status: 'operational' | 'maintenance' | 'closed';
  rating: number;
  description: string;
}

export interface Infrastructure {
  id: string;
  name: string;
  type: 'road' | 'bridge' | 'utility' | 'transportation' | 'parking' | 'waste_management';
  location: string;
  status: 'good' | 'fair' | 'poor' | 'under_construction';
  lastMaintenance: string;
  nextMaintenance: string;
  cost: number;
  description: string;
}

export interface Amenity {
  id: string;
  name: string;
  type: 'park' | 'recreation' | 'shopping' | 'dining' | 'entertainment' | 'sports';
  address: string;
  hours: string;
  amenities: string[];
  rating: number;
  description: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  type: 'public_service' | 'infrastructure' | 'amenity';
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  reportedBy: string;
  reportedAt: string;
  location: string;
}

export interface Feedback {
  id: string;
  type: 'complaint' | 'suggestion' | 'compliment';
  subject: string;
  message: string;
  category: string;
  submittedBy: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'responded';
}

export const mockPublicServices: PublicService[] = [
  {
    id: '1',
    name: 'Central Hospital',
    type: 'hospital',
    address: '123 Medical Drive, Downtown',
    phone: '(555) 123-4567',
    hours: '24/7',
    status: 'operational',
    rating: 4.5,
    description: 'Full-service hospital with emergency care, surgery, and specialist departments.'
  },
  {
    id: '2',
    name: 'Roosevelt Elementary School',
    type: 'school',
    address: '456 Education Blvd, West Side',
    phone: '(555) 234-5678',
    hours: '7:30 AM - 3:30 PM',
    status: 'operational',
    rating: 4.2,
    description: 'K-5 elementary school serving the west side community with excellent academic programs.'
  },
  {
    id: '3',
    name: 'Downtown Police Station',
    type: 'police',
    address: '789 Safety Street, Downtown',
    phone: '(555) 911-0000',
    hours: '24/7',
    status: 'operational',
    rating: 4.0,
    description: 'Main police headquarters providing law enforcement and community safety services.'
  },
  {
    id: '4',
    name: 'Fire Station #1',
    type: 'fire',
    address: '321 Fire Lane, Central',
    phone: '(555) 345-6789',
    hours: '24/7',
    status: 'operational',
    rating: 4.8,
    description: 'Primary fire station with emergency response, fire prevention, and rescue services.'
  },
  {
    id: '5',
    name: 'Public Library Main Branch',
    type: 'library',
    address: '654 Book Avenue, Downtown',
    phone: '(555) 456-7890',
    hours: '9:00 AM - 8:00 PM',
    status: 'maintenance',
    rating: 4.3,
    description: 'Central library with extensive collection, computer access, and community programs.'
  }
];

export const mockInfrastructure: Infrastructure[] = [
  {
    id: '1',
    name: 'Main Street Bridge',
    type: 'bridge',
    location: 'Main Street over River',
    status: 'good',
    lastMaintenance: '2024-06-15',
    nextMaintenance: '2025-06-15',
    cost: 150000,
    description: 'Major bridge connecting downtown to residential areas.'
  },
  {
    id: '2',
    name: 'Downtown Water System',
    type: 'utility',
    location: 'Downtown District',
    status: 'fair',
    lastMaintenance: '2024-03-20',
    nextMaintenance: '2024-12-20',
    cost: 250000,
    description: 'Water distribution network serving downtown business district.'
  },
  {
    id: '3',
    name: 'Metro Bus Route 15',
    type: 'transportation',
    location: 'East-West Corridor',
    status: 'good',
    lastMaintenance: '2024-08-10',
    nextMaintenance: '2025-02-10',
    cost: 75000,
    description: 'Public bus route connecting residential areas to business district.'
  },
  {
    id: '4',
    name: 'Highway 101 Expansion',
    type: 'road',
    location: 'North Highway Corridor',
    status: 'under_construction',
    lastMaintenance: 'N/A',
    nextMaintenance: '2025-12-01',
    cost: 2500000,
    description: 'Major highway expansion project to reduce traffic congestion.'
  },
  {
    id: '5',
    name: 'Central Parking Garage',
    type: 'parking',
    location: '789 Downtown Plaza',
    status: 'poor',
    lastMaintenance: '2023-11-30',
    nextMaintenance: '2024-11-30',
    cost: 180000,
    description: 'Multi-level parking facility serving downtown area.'
  }
];

export const mockAmenities: Amenity[] = [
  {
    id: '1',
    name: 'Central Park',
    type: 'park',
    address: '100 Park Avenue, Central',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Playground', 'Walking trails', 'Picnic areas', 'Duck pond'],
    rating: 4.6,
    description: 'Beautiful 50-acre park with recreational facilities for all ages.'
  },
  {
    id: '2',
    name: 'Community Recreation Center',
    type: 'recreation',
    address: '456 Recreation Drive, North Side',
    hours: '6:00 AM - 10:00 PM',
    amenities: ['Swimming pool', 'Gym', 'Basketball court', 'Meeting rooms'],
    rating: 4.4,
    description: 'Full-service recreation center with fitness and community programs.'
  },
  {
    id: '3',
    name: 'Downtown Shopping District',
    type: 'shopping',
    address: 'Main Street Corridor',
    hours: '10:00 AM - 9:00 PM',
    amenities: ['Retail stores', 'Restaurants', 'Parking', 'Public restrooms'],
    rating: 4.1,
    description: 'Vibrant shopping area with local businesses and dining options.'
  },
  {
    id: '4',
    name: 'Sports Complex',
    type: 'sports',
    address: '789 Athletic Way, South Side',
    hours: '5:00 AM - 11:00 PM',
    amenities: ['Soccer fields', 'Baseball diamonds', 'Tennis courts', 'Track'],
    rating: 4.7,
    description: 'Modern sports facility hosting local leagues and tournaments.'
  }
];

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'Large pothole near intersection causing vehicle damage',
    type: 'infrastructure',
    category: 'road',
    priority: 'high',
    status: 'in_progress',
    reportedBy: 'John Smith',
    reportedAt: '2024-09-20T10:30:00Z',
    location: 'Main Street & 1st Avenue'
  },
  {
    id: '2',
    title: 'Broken streetlight in Central Park',
    description: 'Safety concern due to poor lighting on main walking path',
    type: 'amenity',
    category: 'lighting',
    priority: 'medium',
    status: 'open',
    reportedBy: 'Sarah Johnson',
    reportedAt: '2024-09-21T18:45:00Z',
    location: 'Central Park - Main Trail'
  },
  {
    id: '3',
    title: 'Library computer system down',
    description: 'Public computers not working, affecting research and job searches',
    type: 'public_service',
    category: 'technology',
    priority: 'high',
    status: 'resolved',
    reportedBy: 'Mike Davis',
    reportedAt: '2024-09-19T14:20:00Z',
    location: 'Public Library Main Branch'
  }
];

export const mockFeedback: Feedback[] = [
  {
    id: '1',
    type: 'compliment',
    subject: 'Excellent fire department response',
    message: 'The fire department responded incredibly quickly to our emergency. Professional and caring service.',
    category: 'emergency_services',
    submittedBy: 'Lisa Chen',
    submittedAt: '2024-09-22T09:15:00Z',
    status: 'reviewed'
  },
  {
    id: '2',
    type: 'suggestion',
    subject: 'Add more bike lanes',
    message: 'Would love to see more protected bike lanes to encourage cycling and reduce traffic.',
    category: 'transportation',
    submittedBy: 'Tom Wilson',
    submittedAt: '2024-09-21T16:30:00Z',
    status: 'new'
  },
  {
    id: '3',
    type: 'complaint',
    subject: 'Noisy construction hours',
    message: 'Construction starting too early in residential areas, disrupting sleep.',
    category: 'infrastructure',
    submittedBy: 'Maria Rodriguez',
    submittedAt: '2024-09-20T07:45:00Z',
    status: 'responded'
  }
];