import React from 'react';
import { TermsHeader } from '../components/TermsAndConditions/TermsHeader';
import { TermsContent } from '../components/TermsAndConditions/TermsContent';
import Navbar from '../components/PublicNavbar/Nav.jsx';

export const TermsAndConditionsPage = () => {
  return (
    /* fondo general de la página */
    <main>
      <Navbar />
      <div className="bg-[#F1F6DF] min-h-screen py-12 md:py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <TermsHeader />
            <div className="mt-10">
              <TermsContent />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsAndConditionsPage;