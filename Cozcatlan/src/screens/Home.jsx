import { Hero } from '../components/home/Hero';
import { WelcomeSection } from '../components/home/WelcomeSection';
import "@fontsource/montserrat"; 
import "@fontsource/prompt";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/prompt/400.css";
import "@fontsource/prompt/600.css";
const Home = () => {
  return (
    <main>
      <Hero />
      <WelcomeSection />
    </main>
  );
};

export default Home;