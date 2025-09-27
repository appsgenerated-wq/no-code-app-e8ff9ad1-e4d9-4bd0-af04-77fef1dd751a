import React, { useState } from 'react';

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuthAction = (e) => {
    e.preventDefault();
    if (isLoginView) {
      onLogin(email, password);
    } else {
      onSignup(name, email, password);
    }
  };
  
  const loginAsDemo = () => {
    onLogin('diner@manifest.build', 'password');
  }

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      <div className="lg:w-1/2 w-full flex items-center justify-center p-8 lg:p-12 bg-gray-50">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">FoodFinder</h1>
          <p className="text-gray-600 mb-8">Discover and review the best restaurants.</p>
          
          <form onSubmit={handleAuthAction} className="space-y-4">
            {!isLoginView && (
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
              {isLoginView ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center my-4">
            <button onClick={loginAsDemo} className="w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
              Try Demo User
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            {isLoginView ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-blue-600 hover:underline ml-1">
              {isLoginView ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
      <div className="lg:w-1/2 w-full bg-cover bg-center hidden lg:block" style={{backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')"}}>
      </div>
    </div>
  );
};

export default LandingPage;
