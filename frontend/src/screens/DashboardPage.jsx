import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, restaurants, onLogout, onLoadRestaurants, onCreateRestaurant, onCreateReview }) => {
  const [newRestaurant, setNewRestaurant] = useState({ name: '', description: '', cuisine: 'Italian' });
  const [newReview, setNewReview] = useState({}); // key will be restaurant.id

  useEffect(() => {
    onLoadRestaurants();
  }, []);

  const handleCreateRestaurant = (e) => {
    e.preventDefault();
    onCreateRestaurant(newRestaurant);
    setNewRestaurant({ name: '', description: '', cuisine: 'Italian' });
  };

  const handleCreateReview = (e, restaurantId) => {
    e.preventDefault();
    const reviewData = newReview[restaurantId];
    if (reviewData && reviewData.rating && reviewData.comment) {
      onCreateReview({ ...reviewData, restaurantId });
      setNewReview({ ...newReview, [restaurantId]: { rating: 1, comment: '' } });
    }
  };

  const handleReviewChange = (restaurantId, field, value) => {
    setNewReview({
      ...newReview,
      [restaurantId]: {
        ...newReview[restaurantId],
        [field]: value
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FoodFinder</h1>
            <p className="text-gray-600">Welcome, {user.name}!</p>
          </div>
          <div className="space-x-4">
            <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
              Admin Panel
            </a>
            <button onClick={onLogout} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a New Restaurant</h2>
          <form onSubmit={handleCreateRestaurant} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <input type="text" placeholder="Restaurant Name" value={newRestaurant.name} onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})} className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required />
            <input type="text" placeholder="Description" value={newRestaurant.description} onChange={(e) => setNewRestaurant({...newRestaurant, description: e.target.value})} className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" required />
            <select value={newRestaurant.cuisine} onChange={(e) => setNewRestaurant({...newRestaurant, cuisine: e.target.value})} className="w-full p-2 border rounded-md bg-white focus:ring-blue-500 focus:border-blue-500">
              {['Italian', 'Mexican', 'Japanese', 'American', 'Indian'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button type="submit" className="md:col-span-3 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Add Restaurant</button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Restaurants</h2>
          {restaurants.length === 0 ? (
            <p className="text-gray-500">No restaurants found. Add one above to get started!</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {restaurants.map(restaurant => (
                <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
                    <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{restaurant.cuisine}</span>
                    <p className="text-gray-600 mt-2">{restaurant.description}</p>
                  </div>
                  <div className="bg-gray-50 p-6 border-t">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Reviews ({restaurant.reviews.length})</h4>
                    <div className="space-y-4 mb-6 max-h-48 overflow-y-auto">
                      {restaurant.reviews.length > 0 ? restaurant.reviews.map(review => (
                        <div key={review.id} className="text-sm">
                          <p className="font-semibold text-gray-800">{review.author?.name || 'Anonymous'} <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span></p>
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      )) : <p className="text-sm text-gray-500">No reviews yet.</p>}
                    </div>
                    <form onSubmit={(e) => handleCreateReview(e, restaurant.id)} className="space-y-3">
                      <h5 className="font-semibold text-gray-700">Leave a review</h5>
                      <div>
                         <label className="text-sm font-medium text-gray-600">Rating</label>
                         <select value={newReview[restaurant.id]?.rating || 1} onChange={(e) => handleReviewChange(restaurant.id, 'rating', parseInt(e.target.value))} className="w-full mt-1 p-2 border rounded-md bg-white focus:ring-blue-500 focus:border-blue-500">
                           {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Star{n>1 && 's'}</option>)}
                         </select>
                      </div>
                      <textarea placeholder="Your comments..." value={newReview[restaurant.id]?.comment || ''} onChange={(e) => handleReviewChange(restaurant.id, 'comment', e.target.value)} className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" rows="2" required></textarea>
                      <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition">Submit Review</button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
