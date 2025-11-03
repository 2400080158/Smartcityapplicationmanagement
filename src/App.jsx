import { useState } from 'react';
import { AuthComponent } from './components/AuthComponent';
import { AdminDashboard } from './components/AdminDashboard';
import { UserDashboard } from './components/UserDashboard';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <AuthComponent onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
              <span className="text-primary font-medium">SC</span>
            </div>
            <div>
              <h1 className="text-xl font-medium">Smart City Platform</h1>
              <p className="text-sm opacity-80">Managing city information efficiently</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm opacity-80 capitalize">{user.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-primary-foreground text-primary rounded-lg hover:opacity-90 transition-opacity"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {user.role === 'admin' ? (
          <AdminDashboard userRole={user.role} />
        ) : (
          <UserDashboard userRole={user.role} />
        )}
      </main>
    </div>
  );
}
