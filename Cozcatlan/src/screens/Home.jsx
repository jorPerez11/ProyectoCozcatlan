import { Hero } from '../components/home/Hero';
import { WelcomeSection } from '../components/home/WelcomeSection';
import "@fontsource/montserrat/400.css"; // Regular
import "@fontsource/montserrat/700.css"; // Bold

const Home = () => {
  return (
    <main>
      <Hero />
      <WelcomeSection />
    </main>
  );
};

export default Home;