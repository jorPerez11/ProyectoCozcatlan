import { Hero } from '../components/Home/Hero';
import { WelcomeSection } from '../components/Home/WelcomeSection';
import "@fontsource/montserrat"; 
import "@fontsource/prompt";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/prompt/400.css";
import "@fontsource/prompt/600.css";
import Navbar from '../components/PublicNavbar/Nav.jsx';

const Home = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <WelcomeSection />
    </main>
  );
};

export default Home;