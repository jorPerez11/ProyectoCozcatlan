import React from 'react';
import { ContactHero } from '../components/Contact/ContactHero';
import { LocationCards } from '../components/Contact/LocationCards';
import { ContactForm } from '../components/Contact/ContactForm';
import { SocialLinks } from '../components/Contact/SocialLinks';
import Navbar from '../components/PublicNavbar/Nav.jsx';
import CozcaFooter from "../components/Footer/CozcaFooter.jsx";

export const Contact = () => {
  return (
    <main>
      <div className="bg-[#F1F6DF] min-h-screen pb-20">
        <Navbar />
        <ContactHero />
        <div className="container mx-auto px-6 md:px-12 lg:px-32">
          <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-16">

            <div className="w-full lg:w-1/2">
              <ContactForm />
            </div>


            <div className="w-full lg:w-1/2 flex flex-column">
              <div className="order-1">
                <LocationCards />
              </div>
              <div className="order-2">
                <SocialLinks />
              </div>
            </div>

          </div>
        </div>
      </div>
      <CozcaFooter />
    </main>
  );
};

export default Contact;