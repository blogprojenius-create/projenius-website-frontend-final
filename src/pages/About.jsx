import React from "react";

import AboutTeamSection from "../components/AboutTeamSection/AboutTeamSection";
import CommonHero from "../components/CommonHero/CommonHero";

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
            <AboutTeamSection />
        </>
    );
}