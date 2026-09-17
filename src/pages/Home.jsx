import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import AboutSection from "../components/AboutSection/AboutSection";
import ServicesSection from "../components/ServicesSection/ServicesSection";
import ProductSection from "../components/ProductSection/ProductSection";
import TrainingSection from "../components/TrainingSection/TrainingSection";
import HomeTeamSection from "../components/HomeTeamSection/HomeTeamSection";
import ProjectSection from "../components/ProjectSection/ProjectSection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <ProductSection />
            <TrainingSection />
            <HomeTeamSection />
            <ProjectSection />
        </>
    );
}