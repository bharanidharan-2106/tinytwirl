import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import SplashScreen from './components/ui/SplashScreen';

// Public Pages
import Home from './pages/public/Home';
import Programs from './pages/public/Programs';
import About from './pages/public/About';
import Gallery from './pages/public/Gallery';
import Offers from './pages/public/Offers';
import Events from './pages/public/Events';
import Contact from './pages/public/Contact';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Media from './pages/admin/Media';
import ProgramsAdmin from './pages/admin/Programs';
import OffersAdmin from './pages/admin/Offers';
import EventsAdmin from './pages/admin/Events';
import TestimonialsAdmin from './pages/admin/Testimonials';

const App = () => {
  return (
    <SplashScreen>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="media" element={<Media />} />
          <Route path="programs" element={<ProgramsAdmin />} />
          <Route path="offers" element={<OffersAdmin />} />
          <Route path="events" element={<EventsAdmin />} />
          <Route path="testimonials" element={<TestimonialsAdmin />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </SplashScreen>
  );
};

export default App;
