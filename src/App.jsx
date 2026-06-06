import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Home, Search, Calendar, User, ChevronLeft, MoreVertical, MessageCircle, Phone, Star, MapPin, Search as SearchIcon, Bell, Heart, Users, Gauge, Zap } from 'lucide-react';

const API_BASE_URL = 'http://10.146.28.131:5000/api';

// Common Components
const BottomNav = () => {
  const navigate = useNavigate();
  return (
    <div className="bottom-nav">
      <div className="nav-item active" onClick={() => navigate('/home')}>
        <Home size={24} />
      </div>
      <div className="nav-item" onClick={() => navigate('/search')}>
        <Search size={24} />
      </div>
      <div className="nav-item" onClick={() => navigate('/bookings')}>
        <Calendar size={24} />
      </div>
      <div className="nav-item" onClick={() => navigate('/profile')}>
        <User size={24} />
      </div>
    </div>
  );
};

const Header = ({ title, showBack = true, showMore = true }) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      {showBack ? (
        <div className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </div>
      ) : <div style={{ width: 40 }} />}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{title}</h2>
      {showMore ? (
        <div className="back-btn">
          <MoreVertical size={20} />
        </div>
      ) : <div style={{ width: 40 }} />}
    </div>
  );
};

// Screens
const SplashScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => navigate('/onboarding'), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center fade-in" style={{ height: '100%', background: 'linear-gradient(135deg, #FFF 0%, var(--primary-light) 100%)' }}>
      <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--primary)', letterSpacing: '4px' }}>RENTAL</h1>
    </div>
  );
};

const OnboardingScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 flex flex-col items-center justify-between fade-in" style={{ height: '100%' }}>
      <div className="mt-8 w-full flex justify-center">
        <div style={{ width: '100%', height: '380px', borderRadius: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--primary-light)' }}>
           <img src="/illustration_placeholder.png" alt="Onboarding" style={{ width: '85%', objectFit: 'contain' }} />
        </div>
      </div>
      <div className="text-center w-full mb-10">
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }}>Let's Get Started</h1>
        <button className="btn btn-primary w-full" onClick={() => navigate('/register')}>Register</button>
        <p className="mt-6" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Already have an account? <span className="text-primary font-bold" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>Log In</span></p>
      </div>
    </div>
  );
};

const RegisterScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 flex flex-col fade-in" style={{ height: '100%' }}>
      <div className="back-btn mb-6" onClick={() => navigate(-1)}><ChevronLeft size={20} /></div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2.5rem' }}>Create Account</h1>
      <div className="input-group">
        <label className="input-label">Name</label>
        <input type="text" className="input-field" placeholder="Enter name" />
      </div>
      <div className="input-group">
        <label className="input-label">Email</label>
        <input type="email" className="input-field" placeholder="Enter email" />
      </div>
      <button className="btn btn-primary w-full" onClick={() => navigate('/home')}>Register</button>
    </div>
  );
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/cars`)
      .then(res => res.json())
      .then(data => {
        setCars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-full"><Zap className="animate-spin text-primary" size={48} /></div>;

  return (
    <div className="flex flex-col fade-in" style={{ height: '100%', paddingBottom: '90px', overflowY: 'auto' }}>
      <div className="page-container">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Location</p>
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-primary" />
                <span style={{ fontWeight: 700 }}>New York, USA</span>
              </div>
            </div>
            <div className="back-btn" style={{ border: 'none', background: 'var(--surface)' }}><Bell size={24} /></div>
          </div>

          <div style={{ position: 'relative', marginBottom: '32px' }}>
            <SearchIcon size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input type="text" className="input-field" placeholder="Search cars..." style={{ paddingLeft: '50px', border: 'none', background: 'var(--surface)', height: '56px', borderRadius: '18px' }} />
          </div>

          <div className="mb-6">
            <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '24px' }}>Available Today</h3>
            <div className="cars-grid">
              {cars.map(car => (
                <div key={car.id} className="car-card" style={{ background: '#FFF', borderRadius: '28px', padding: '16px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', cursor: 'pointer' }} onClick={() => navigate(`/car-details/${car.id}`)}>
                  <div className="car-image-container" style={{ background: 'var(--primary-light)' }}>
                    <img src={car.image} alt={car.name} className="car-image" />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <h4 style={{ fontWeight: 800 }}>{car.name}</h4>
                      <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)' }}>${car.price}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/day</span>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '10px 20px' }}>Rent Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

const CarDetailsScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/cars/${id}`)
          .then(res => res.json())
          .then(data => setCar(data))
          .catch(err => console.error(err));
    }, [id]);

    if (!car) return null;

    return (
        <div className="flex flex-col fade-in" style={{ height: '100%', overflowY: 'auto', paddingBottom: '20px' }}>
            <Header title="Details" />
            <div className="page-container">
                <div className="p-6">
                    <div className="car-image-container" style={{ height: '360px', background: 'var(--primary-light)', marginBottom: '32px' }}>
                        <img src={car.image} alt={car.name} className="car-image" />
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>{car.name}</h1>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', margin: '24px 0 48px', fontSize: '1.1rem' }}>{car.description}</p>
                    <div className="flex justify-between items-center border-t pt-8">
                        <div>
                            <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>${car.price}</span>
                            <span style={{ color: 'var(--text-muted)' }}>/day</span>
                        </div>
                        <button className="btn btn-primary" style={{ padding: '20px 60px', fontSize: '1.1rem' }} onClick={() => navigate('/booking')}>Rent Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookingScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="p-6 flex flex-col fade-in" style={{ height: '100%' }}>
            <Header title="Booking" />
            <div className="input-group mt-8">
                <label className="input-label">Location</label>
                <input type="text" className="input-field" defaultValue="New York Area" />
            </div>
            <button className="btn btn-primary w-full mt-auto mb-8" onClick={() => navigate('/payment')}>Continue</button>
        </div>
    )
}

const PaymentScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="p-6 flex flex-col fade-in" style={{ height: '100%' }}>
            <Header title="Payment" />
            <div className="flex-1 mt-8">
                <div className="p-5 rounded-2xl border-2 border-primary bg-primary-light mb-4">PayPal</div>
                <div className="p-5 rounded-2xl border border-border mb-4">Google Pay</div>
            </div>
            <button className="btn btn-primary w-full mb-8" onClick={() => navigate('/summary')}>Continue</button>
        </div>
    )
}

const SummaryScreen = () => {
     const navigate = useNavigate();
     const handleConfirm = () => {
         fetch(`${API_BASE_URL}/bookings`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ carId: '1', date: '2025-03-12' })
         })
         .then(() => {
             alert('Booking Confirmed!');
             navigate('/home');
         });
     }
     return (
         <div className="p-6 flex flex-col fade-in" style={{ height: '100%' }}>
            <Header title="Summary" />
            <div className="p-5 bg-surface rounded-2xl mt-8">
                <h4 style={{ fontWeight: 800 }}>Audi Q7</h4>
                <p className="text-primary" style={{ fontWeight: 900, fontSize: '1.5rem' }}>$88.00</p>
            </div>
            <button className="btn btn-primary w-full mt-auto mb-8" onClick={handleConfirm}>Confirm Payment</button>
         </div>
     )
}

const ProfileScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col fade-in" style={{ height: '100%', paddingBottom: '100px' }}>
            <Header title="Profile" showMore={false} />
            <div className="page-container">
                <div className="p-6 flex flex-col items-center">
                    <div style={{ width: 140, height: 140, borderRadius: '40px', background: 'var(--primary-light)', marginBottom: '24px', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
                        <img src="/user_placeholder.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h2 style={{ fontWeight: 900, fontSize: '2rem' }}>Robert Albert</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '40px' }}>Premium Member</p>
                </div>
            </div>
            <BottomNav />
        </div>
    )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/onboarding" element={<OnboardingScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/car-details/:id" element={<CarDetailsScreen />} />
        <Route path="/booking" element={<BookingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/summary" element={<SummaryScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="*" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
