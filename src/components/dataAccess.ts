import { 
  mockPublicServices, 
  mockInfrastructure, 
  mockAmenities, 
  mockIssues, 
  mockFeedback,
  type PublicService,
  type Infrastructure,
  type Amenity,
  type Issue,
  type Feedback
} from './mockData';

// Re-export types from mockData for convenience
export type { PublicService, Infrastructure, Amenity, Issue, Feedback };

// Public-facing versions of the data types (what users see)
export interface PublicServiceView {
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

export interface InfrastructureView {
  id: string;
  name: string;
  type: 'road' | 'bridge' | 'utility' | 'transportation' | 'parking' | 'waste_management';
  location: string;
  status: 'good' | 'fair' | 'poor' | 'under_construction';
  description: string;
}

export interface AmenityView {
  id: string;
  name: string;
  type: 'park' | 'recreation' | 'shopping' | 'dining' | 'entertainment' | 'sports';
  address: string;
  hours: string;
  amenities: string[];
  rating: number;
  description: string;
}

// Data access functions based on user role
export function getPublicServices(userRole: 'admin' | 'user'): PublicService[] | PublicServiceView[] {
  if (userRole === 'admin') {
    return mockPublicServices;
  }
  
  // Return filtered data for regular users (remove sensitive admin info)
  return mockPublicServices.map(service => ({
    id: service.id,
    name: service.name,
    type: service.type,
    address: service.address,
    phone: service.phone,
    hours: service.hours,
    status: service.status,
    rating: service.rating,
    description: service.description
  }));
}

export function getInfrastructure(userRole: 'admin' | 'user'): Infrastructure[] | InfrastructureView[] {
  if (userRole === 'admin') {
    return mockInfrastructure;
  }
  
  // Return filtered data for regular users (remove cost, maintenance details)
  return mockInfrastructure
    .filter(item => item.status !== 'under_construction') // Hide construction projects from public view
    .map(item => ({
      id: item.id,
      name: item.name,
      type: item.type,
      location: item.location,
      status: item.status,
      description: item.description
    }));
}

export function getAmenities(userRole: 'admin' | 'user'): Amenity[] | AmenityView[] {
  if (userRole === 'admin') {
    return mockAmenities;
  }
  
  // Return filtered data for regular users
  return mockAmenities.map(amenity => ({
    id: amenity.id,
    name: amenity.name,
    type: amenity.type,
    address: amenity.address,
    hours: amenity.hours,
    amenities: amenity.amenities,
    rating: amenity.rating,
    description: amenity.description
  }));
}

export function getIssues(userRole: 'admin' | 'user'): Issue[] {
  if (userRole === 'admin') {
    return mockIssues;
  }
  
  // Users cannot access issue management data
  return [];
}

export function getFeedback(userRole: 'admin' | 'user'): Feedback[] {
  if (userRole === 'admin') {
    return mockFeedback;
  }
  
  // Users cannot access feedback management data
  return [];
}

// Helper function to check if user has admin privileges
export function hasAdminAccess(userRole: 'admin' | 'user'): boolean {
  return userRole === 'admin';
}

// Public statistics that users can see
export function getPublicStats(userRole: 'admin' | 'user') {
  const services = getPublicServices(userRole) as PublicServiceView[];
  const infrastructure = getInfrastructure(userRole) as InfrastructureView[];
  const amenities = getAmenities(userRole) as AmenityView[];

  if (userRole === 'user') {
    return {
      totalServices: services.length,
      operationalServices: services.filter(s => s.status === 'operational').length,
      totalInfrastructure: infrastructure.length,
      totalAmenities: amenities.length
    };
  }

  // Admin gets full statistics
  const adminServices = services as PublicService[];
  const adminInfrastructure = infrastructure as Infrastructure[];
  const issues = getIssues(userRole);
  const feedback = getFeedback(userRole);

  return {
    totalServices: adminServices.length,
    operationalServices: adminServices.filter(s => s.status === 'operational').length,
    totalInfrastructure: adminInfrastructure.length,
    goodInfrastructure: adminInfrastructure.filter(i => i.status === 'good').length,
    openIssues: issues.filter(i => i.status === 'open').length,
    urgentIssues: issues.filter(i => i.priority === 'urgent').length,
    newFeedback: feedback.filter(f => f.status === 'new').length,
    totalAmenities: amenities.length
  };
}