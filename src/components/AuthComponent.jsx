import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function AuthComponent({ onLogin }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');

  const handleLogin = () => {
    if (name.trim()) {
      onLogin({
        id: Math.random().toString(36).substr(2, 9),
        name: name.trim(),
        role
      });
    }
  };

  const quickLogin = (userName, userRole) => {
    onLogin({
      id: Math.random().toString(36).substr(2, 9),
      name: userName,
      role: userRole
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto">
            <span className="text-primary-foreground text-2xl font-medium">SC</span>
          </div>
          <h1 className="text-3xl font-medium">Smart City Platform</h1>
          <p className="text-muted-foreground">Access city management and services</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Enter your details to access the platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User - Access city information</SelectItem>
                  <SelectItem value="admin">Admin - Manage city data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleLogin} 
              className="w-full"
              disabled={!name.trim()}
            >
              Login
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
            <CardDescription>
              Try the platform with demo accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => quickLogin('City Administrator', 'admin')}
            >
              <div className="text-left">
                <div className="font-medium">Admin Demo</div>
                <div className="text-sm text-muted-foreground">Manage city information</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => quickLogin('City Resident', 'user')}
            >
              <div className="text-left">
                <div className="font-medium">User Demo</div>
                <div className="text-sm text-muted-foreground">Access city services</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
