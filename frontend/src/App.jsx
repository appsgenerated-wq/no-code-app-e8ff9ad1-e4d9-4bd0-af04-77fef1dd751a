import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest();

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);

      if (result.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          setCurrentScreen('dashboard');
        } catch (error) {
          setUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', result.error);
      }
    };

    checkConnectionAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const loggedInUser = await manifest.from('User').me();
      setUser(loggedInUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      await manifest.from('User').signup({ name, email, password });
      await handleLogin(email, password);
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed. The user might already exist.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setRestaurants([]);
    setCurrentScreen('landing');
  };

  const loadRestaurants = async () => {
    try {
      const response = await manifest.from('Restaurant').find({
        include: ['reviews', 'reviews.author'],
        sort: { createdAt: 'desc' },
      });
      setRestaurants(response.data);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
  };

  const createRestaurant = async (restaurantData) => {
    try {
      const newRestaurant = await manifest.from('Restaurant').create(restaurantData);
      setRestaurants([newRestaurant, ...restaurants]);
      loadRestaurants(); // Reload to get reviews etc.
    } catch(error) {
      console.error('Failed to create restaurant:', error);
      alert('Failed to create restaurant.');
    }
  };

  const createReview = async (reviewData) => {
    try {
      await manifest.from('Review').create(reviewData);
      loadRestaurants(); // Refresh all data to show the new review
    } catch (error) {
      console.error('Failed to create review:', error);
      alert('Failed to post review.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-sm font-medium ${backendConnected ? 'text-gray-700' : 'text-red-700'}`}>
          {backendConnected ? 'Backend Connected' : 'Connection Failed'}
        </span>
      </div>

      {currentScreen === 'landing' || !user ? (
        <LandingPage onLogin={handleLogin} onSignup={handleSignup} />
      ) : (
        <DashboardPage
          user={user}
          restaurants={restaurants}
          onLogout={handleLogout}
          onLoadRestaurants={loadRestaurants}
          onCreateRestaurant={createRestaurant}
          onCreateReview={createReview}
        />
      )}
    </div>
  );
}

export default App;
