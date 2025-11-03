import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { 
  getPublicServices,
  getInfrastructure,
  getAmenities,
  getIssues,
  getFeedback,
  getPublicStats
} from './dataAccess';
import { 
  BarChart3, 
  Building2, 
  Construction, 
  MapPin, 
  AlertTriangle, 
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Users,
  Activity
} from 'lucide-react';

export function AdminDashboard({ userRole }) {
  const [services, setServices] = useState(getPublicServices(userRole));
  const [infrastructure, setInfrastructure] = useState(getInfrastructure(userRole));
  const [amenities, setAmenities] = useState(getAmenities(userRole));
  const [issues, setIssues] = useState(getIssues(userRole));
  const [feedback, setFeedback] = useState(getFeedback(userRole));

  const stats = getPublicStats(userRole);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
      case 'good':
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
      case 'fair':
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
      case 'poor':
      case 'open':
        return 'bg-red-100 text-red-800';
      case 'under_construction':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-medium">Admin Dashboard</h2>
          <p className="text-muted-foreground">Manage city services, infrastructure, and respond to citizen needs</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-medium">{stats.operationalServices}/{stats.totalServices}</p>
                <p className="text-sm text-muted-foreground">Services Operational</p>
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
                <p className="text-2xl font-medium">{stats.goodInfrastructure}/{stats.totalInfrastructure}</p>
                <p className="text-sm text-muted-foreground">Good Infrastructure</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-medium">{stats.openIssues}</p>
                <p className="text-sm text-muted-foreground">Open Issues</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MessageSquare className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-medium">{stats.newFeedback}</p>
                <p className="text-sm text-muted-foreground">New Feedback</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="services">Public Services</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Public Services Management</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
          
          <div className="grid gap-4">
            {services.map((service) => (
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
                      <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Address:</strong> {service.address}</p>
                          <p><strong>Phone:</strong> {service.phone}</p>
                        </div>
                        <div>
                          <p><strong>Hours:</strong> {service.hours}</p>
                          <p><strong>Rating:</strong> {service.rating}/5</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Infrastructure Management</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Infrastructure
            </Button>
          </div>
          
          <div className="grid gap-4">
            {infrastructure.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{item.name}</h4>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {item.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Location:</strong> {item.location}</p>
                          <p><strong>Last Maintenance:</strong> {item.lastMaintenance}</p>
                        </div>
                        <div>
                          <p><strong>Next Maintenance:</strong> {item.nextMaintenance}</p>
                          <p><strong>Cost:</strong> ${item.cost.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Amenities Management</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Amenity
            </Button>
          </div>
          
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
                      <p className="text-sm text-muted-foreground mb-2">{amenity.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Address:</strong> {amenity.address}</p>
                          <p><strong>Hours:</strong> {amenity.hours}</p>
                        </div>
                        <div>
                          <p><strong>Rating:</strong> {amenity.rating}/5</p>
                          <p><strong>Features:</strong> {amenity.amenities.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Issue Management</h3>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Issues</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-4">
            {issues.map((issue) => (
              <Card key={issue.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{issue.title}</h4>
                        <Badge className={getStatusColor(issue.status)}>
                          {issue.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getPriorityColor(issue.priority)}>
                          {issue.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Location:</strong> {issue.location}</p>
                          <p><strong>Category:</strong> {issue.category}</p>
                        </div>
                        <div>
                          <p><strong>Reported by:</strong> {issue.reportedBy}</p>
                          <p><strong>Date:</strong> {new Date(issue.reportedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Select value={issue.status} onValueChange={(value) => {
                        setIssues(issues.map(i => i.id === issue.id ? { ...i, status: value } : i));
                      }}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in_progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-medium">Citizen Feedback</h3>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Feedback</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-4">
            {feedback.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{item.subject}</h4>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.message}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Category:</strong> {item.category.replace('_', ' ')}</p>
                          <p><strong>Submitted by:</strong> {item.submittedBy}</p>
                        </div>
                        <div>
                          <p><strong>Date:</strong> {new Date(item.submittedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Select value={item.status} onValueChange={(value) => {
                        setFeedback(feedback.map(f => f.id === item.id ? { ...f, status: value } : f));
                      }}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="responded">Responded</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        Respond
                      </Button>
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
