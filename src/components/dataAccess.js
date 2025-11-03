import { 
  mockPublicServices, 
  mockInfrastructure, 
  mockAmenities, 
  mockIssues, 
  mockFeedback
} from './mockData';

// Data access functions based on user role
export function getPublicServices(userRole) {
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

export function getInfrastructure(userRole) {
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

export function getAmenities(userRole) {
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

export function getIssues(userRole) {
  if (userRole === 'admin') {
    return mockIssues;
  }
  
  // Users cannot access issue management data
  return [];
}

export function getFeedback(userRole) {
  if (userRole === 'admin') {
    return mockFeedback;
  }
  
  // Users cannot access feedback management data
  return [];
}

// Helper function to check if user has admin privileges
export function hasAdminAccess(userRole) {
  return userRole === 'admin';
}

// Public statistics that users can see
export function getPublicStats(userRole) {
  const services = getPublicServices(userRole);
  const infrastructure = getInfrastructure(userRole);
  const amenities = getAmenities(userRole);

  if (userRole === 'user') {
    return {
      totalServices: services.length,
      operationalServices: services.filter(s => s.status === 'operational').length,
      totalInfrastructure: infrastructure.length,
      totalAmenities: amenities.length
    };
  }

  // Admin gets full statistics
  const issues = getIssues(userRole);
  const feedback = getFeedback(userRole);

  return {
    totalServices: services.length,
    operationalServices: services.filter(s => s.status === 'operational').length,
    totalInfrastructure: infrastructure.length,
    goodInfrastructure: infrastructure.filter(i => i.status === 'good').length,
    openIssues: issues.filter(i => i.status === 'open').length,
    urgentIssues: issues.filter(i => i.priority === 'urgent').length,
    newFeedback: feedback.filter(f => f.status === 'new').length,
    totalAmenities: amenities.length
  };
}
