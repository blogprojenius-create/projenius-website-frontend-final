import React from "react";

import AboutTeamSection from "../components/AboutTeamSection/AboutTeamSection";
import CommonHero from "../components/CommonHero/CommonHero";
import ContactSection from "../components/ContactSection/ContactSection";
import ReviewsSection from "../components/ReviewsSection/ReviewsSection";
import Magazine from "../components/Magazine/Magazine";
import EcosystemSection from "../components/EcosystemSection/EcosystemSection";
import OurJourney from "../components/OurJourney/OurJourney";
import FoundersSection from "../components/FoundersSection/FoundersSection";    
export default function About() {
    return (
        <>
            <CommonHero
                subheading="Who We Are"

                firstLine="Building"

                highlight="Technology"

                secondLine="That Creates Impact"

                description="We are a technology-driven team focused on innovation, software development, product engineering and creating practical digital solutions."
            />

            <OurJourney />
            <AboutTeamSection />
            <FoundersSection />
            <EcosystemSection />
            <Magazine />
            <ReviewsSection />
            <ContactSection />
        </>
    );
}