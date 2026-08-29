import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import AboutSection from "../components/AboutSection/AboutSection";
import ServicesSection from "../components/ServicesSection/ServicesSection";
import ProjectSection from "../components/ProjectSection/ProjectSection";
import ProductSection from "../components/ProductSection/ProductSection";
import TrainingSection from "../components/TrainingSection/TrainingSection";
import HomeTeamSection from "../components/HomeTeamSection/HomeTeamSection";
import PricingSection from "../components/PriceTableSection/PriceTableSection";
import ContactSection from "../components/ContactSection/ContactSection";
import ReviewsSection from "../components/ReviewsSection/ReviewsSection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <ProjectSection />
            <ProductSection />
            <TrainingSection />
            {/* <HomeTeamSection /> */}
            <PricingSection />
            <ContactSection />
            {/* <ReviewsSection /> */}
        </>
    );
}