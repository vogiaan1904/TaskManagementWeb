  import { useState, useEffect } from 'react';
  import { Routes, Route, useNavigate } from 'react-router-dom';
  import Login from './components/Login.tsx';
  import Register from './components/Register.tsx';
  import Home from './components/Home.tsx';
  import BoardDetail from './components/BoardDetail.tsx';
  import Index from './components/Index.tsx';
  import api from './utils/api.ts';
  import { User } from './components/type'; // Import the User interface
import { Box } from '@mui/material';

  function App() {
    console.log("App component re-rendered")
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null); // Provide type for user
    const [isLoadingUser, setIsLoadingUser] = useState(true); 
    console.log("loggedIn state:", loggedIn);
    useEffect(() => {
      const storedToken = localStorage.getItem('accessToken');
      if (storedToken) {
        fetchUser(); // Fetch user data if token exists
      }
      console.log("Login effect ran");
      }, []);
    // useEffect(() => {
    //   const storedToken = localStorage.getItem('accessToken');
    //   if (storedToken) {
    //     fetchUser(); // Fetch user data if token exists
    //   }
    //   console.log("Login effect ran");
    // }, []);

    const fetchUser = async () => {
      try {
        const response = await api.get('/user/me');
        setUser(response.data.data);
        console.log("User state updated:", response.data);
        setLoggedIn(true); // Set loggedIn to true after fetching the user
        console.log("loggedIn set to true in fetchUser");
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle the error (e.g., log out the user)
      }
      console.log("fetchUser completed");
    };

    const handleLogin = async (email: string, password: string) => {
      try {
        const response = await api.post('/user/auth/login', { email, password });
        localStorage.setItem('accessToken', response.data.data.accessToken);
        setUser(response.data.data); 
        console.log("User state updated:", user); 
        await fetchUser(); 
        setLoggedIn(true);
        console.log("loggedIn set to true in handleLogin");
        navigate('/');
      } catch (error) {
        console.error('Login error:', error);
        // Handle the error (e.g., display an error message)
      }
    };

    const handleLogout = () => {
      localStorage.removeItem('accessToken');
      setLoggedIn(false);
      setUser(null);
      navigate('/login');
    };

    return (
      <Box sx={{
        width: '100%',
        height: '100vh',
        margin: 0,
      }}>
        <Routes>
          {/* Only render Home and BoardDetail if loggedIn is true and user is not null */}
          {loggedIn && user ? ( 
            <>
              <Route path="/" element={<Home user={user} onLogout={handleLogout} triggerFetchBoard={() => {}} />} />
              <Route
                path="/board/:boardId"
                element={<BoardDetail user={user} onLogout={handleLogout} />}
              />
            </>
          ) : (
            <>
              <Route path="/" element={<Index />} /> 
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Login onLogin={handleLogin} />} /> 
            </>
          )}  
        </Routes>
      </Box>
    );
  }

  export default App;