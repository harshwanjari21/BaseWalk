'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
  id: string;
  fitbitUserId: string | null;
  tokenExpiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminCleanupPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/cleanup');
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm(`Delete user ${userId}? This will remove all their data.`)) {
      return;
    }

    try {
      const response = await fetch('/api/admin/cleanup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIdToDelete: userId })
      });

      if (response.ok) {
        alert('User deleted successfully');
        fetchUsers(); // Refresh the list
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Database Cleanup - Admin</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Connected Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p>No users found in database.</p>
          ) : (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded">
                  <div>
                    <p><strong>User ID:</strong> {user.id}</p>
                    <p><strong>Fitbit ID:</strong> {user.fitbitUserId || 'None'}</p>
                    <p><strong>Token Expires:</strong> {user.tokenExpiresAt ? new Date(user.tokenExpiresAt).toLocaleString() : 'Never'}</p>
                    <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleString()}</p>
                  </div>
                  <Button 
                    variant="destructive" 
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
        <Button onClick={fetchUsers} variant="outline">
          Refresh List
        </Button>
      </div>
    </div>
  );
}