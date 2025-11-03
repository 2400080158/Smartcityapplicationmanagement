import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { 
  getPublicServices,
  getInfrastructure,
  getAmenities,
  getPublicStats,
  type PublicServiceView,
  type InfrastructureView,
  type AmenityView
} from './dataAccess';
import { 
  Search, 
  Building2, 
  Construction, 
  MapPin, 
  AlertTriangle, 
  MessageSquare,
  Phone,
  Clock,
  Star
} from 'lucide-react';

interface UserDashboardProps {
  userRole: 'admin' | 'user';
}

export function UserDashboard({ userRole }: UserDashboardProps) {
  const [services, setServices] = useState<PublicServiceView[]>(getPublicServices(userRole) as PublicServiceView[]);
  const [infrastructure, setInfrastructure] = useState<InfrastructureView[]>(getInfrastructure(userRole) as InfrastructureView[]);
  const [amenities, setAmenities] = useState<AmenityView[]>(getAmenities(userRole) as AmenityView[]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Issue report form state
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [issueLocation, setIssueLocation] = useState('');
  const [issueCategory, setIssueCategory] = useState('');
  const [issuePriority, setIssuePriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  
  // Feedback form state
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'complaint' | 'suggestion' | 'compliment'>('suggestion');
  const [feedbackSubject, setFeedbackSubject] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackCategory, setFeedbackCategory] = useState('');

  const stats = getPublicStats(userRole);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'good':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitIssue = () => {
    // In a real app, this would send to backend
    console.log('Issue submitted:', {
      title: issueTitle,
      description: issueDescription,
      location: issueLocation,
      category: issueCategory,
      priority: issuePriority
    });
    
    // Reset form
    setIssueTitle('');
    setIssueDescription('');
    setIssueLocation('');
    setIssueCategory('');
    setIssuePriority('medium');
    setIssueDialogOpen(false);
    
    alert('Thank you! Your issue has been submitted and will be reviewed by our team.');
  };

  const handleSubmitFeedback = () => {
    // In a real app, this would send to backend
    console.log('Feedback submitted:', {
      type: feedbackType,
      subject: feedbackSubject,
      message: feedbackMessage,
      category: feedbackCategory
    });
    
    // Reset form
    setFeedbackType('suggestion');
    setFeedbackSubject('');
    setFeedbackMessage('');
    setFeedbackCategory('');
    setFeedbackDialogOpen(false);
    
    alert('Thank you for your feedback! We appreciate your input.');
  };

  // Filter services based on search and category
  const filteredServices = services.filter(service => {
    const matchesSearch = searchQuery === '' || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || service.type === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-medium">Citizen Portal</h2>
          <p className="text-muted-foreground">Access city services, find information, and get involved</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report an Issue</DialogTitle>
                <DialogDescription>
                  Help us improve our city by reporting problems you encounter
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="issue-title">Title</Label>
                  <Input
                    id="issue-title"
                    placeholder="Brief description of the issue"
                    value={issueTitle}
                    onChange={(e) => setIssueTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issue-location">Location</Label>
                  <Input
                    id="issue-location"
                    placeholder="Where is the issue located?"
                    value={issueLocation}
                    onChange={(e) => setIssueLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issue-category">Category</Label>
                  <Select value={issueCategory} onValueChange={setIssueCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="road">Road</SelectItem>
                      <SelectItem value="lighting">Lighting</SelectItem>
                      <SelectItem value="waste">Waste Management</SelectItem>
                      <SelectItem value="park">Parks & Recreation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issue-priority">Priority</Label>
                  <Select value={issuePriority} onValueChange={(value: 'low' | 'medium' | 'high' | 'urgent') => setIssuePriority(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="issue-description">Description</Label>
                  <Textarea
                    id="issue-description"
                    placeholder="Provide detailed information about the issue"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIssueDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitIssue}
                  disabled={!issueTitle || !issueDescription || !issueLocation || !issueCategory}
                >
                  Submit Issue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Give Feedback
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Feedback</DialogTitle>
                <DialogDescription>
                  Share your thoughts, suggestions, or compliments with us
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="feedback-type">Type</Label>
                  <Select value={feedbackType} onValueChange={(value: 'complaint' | 'suggestion' | 'compliment') => setFeedbackType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="suggestion">Suggestion</SelectItem>
                      <SelectItem value="compliment">Compliment</SelectItem>
                      <SelectItem value="complaint">Complaint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback-category">Category</Label>
                  <Select value={feedbackCategory} onValueChange={setFeedbackCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public_services">Public Services</SelectItem>
                      <SelectItem value="transportation">Transportation</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="parks_recreation">Parks & Recreation</SelectItem>
                      <SelectItem value="emergency_services">Emergency Services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback-subject">Subject</Label>
                  <Input
                    id="feedback-subject"
                    placeholder="Brief summary"
                    value={feedbackSubject}
                    onChange={(e) => setFeedbackSubject(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback-message">Message</Label>
                  <Textarea
                    id="feedback-message"
                    placeholder="Share your feedback in detail"
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitFeedback}
                  disabled={!feedbackSubject || !feedbackMessage || !feedbackCategory}
                >
                  Submit Feedback
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-medium">{stats.operationalServices}/{stats.totalServices}</p>
                <p className="text-sm text-muted-foreground">Services Available</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Construction className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-medium">{stats.totalInfrastructure}</p>
                <p className="text-sm text-muted-foreground">Infrastructure Items</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-medium">{stats.totalAmenities}</p>
                <p className="text-sm text-muted-foreground">City Amenities</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="services">Public Services</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="hospital">Hospitals</SelectItem>
                <SelectItem value="school">Schools</SelectItem>
                <SelectItem value="police">Police</SelectItem>
                <SelectItem value="fire">Fire Stations</SelectItem>
                <SelectItem value="library">Libraries</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredServices.map((service) => (
              <Card key={service.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{service.name}</h4>
                        <Badge className={getStatusColor(service.status)}>
                          {service.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {service.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Address</p>
                            <p className="text-muted-foreground">{service.address}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-muted-foreground">{service.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Hours</p>
                            <p className="text-muted-foreground">{service.hours}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Rating</p>
                            <p className="text-muted-foreground">{service.rating}/5</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4">
          <div className="grid gap-4">
            {infrastructure.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{item.name}</h4>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {item.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-muted-foreground">{item.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-4">
          <div className="grid gap-4">
            {amenities.map((amenity) => (
              <Card key={amenity.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{amenity.name}</h4>
                        <Badge variant="outline" className="capitalize">
                          {amenity.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{amenity.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Address</p>
                            <p className="text-muted-foreground">{amenity.address}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Hours</p>
                            <p className="text-muted-foreground">{amenity.hours}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Star className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Rating</p>
                            <p className="text-muted-foreground">{amenity.rating}/5</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Features</p>
                            <p className="text-muted-foreground">{amenity.amenities.join(', ')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
