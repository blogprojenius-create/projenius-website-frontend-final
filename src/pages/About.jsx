import React from "react";

import CommonHero from "../components/CommonHero/CommonHero";
import ContactSection from "../components/ContactSection/ContactSection";
import Magazine from "../components/Magazine/Magazine";
import EcosystemSection from "../components/EcosystemSection/EcosystemSection";
import OurJourney from "../components/OurJourney/OurJourney";
import FoundersSection from "../components/FoundersSection/FoundersSection";    
import TestimonialSection from "../components/TestimonialSection/TestimonialSection";
import AboutProJenius from "../components/AboutProJenius/AboutProJenius";
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
            <FoundersSection />
            <AboutProJenius />
            <EcosystemSection />
            <Magazine />
            <TestimonialSection />
            <ContactSection />
        </>
    );
}