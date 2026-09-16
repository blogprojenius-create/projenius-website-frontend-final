import ContactSection from "../components/ContactSection/ContactSection";
import DevelopmentServices from "../components/DevelopmentServices/DevelopmentServices";
import EnterpriseDevelopment from "../components/EnterpriseDevelopment/EnterpriseDevelopment";
import PriceTableSection from "../components/PriceTableSection/PriceTableSection";
import CommonHero from "../components/CommonHero/CommonHero";
export default function Development() {
    return (
        <main className="development-page">

            {/* Hero */}
            <CommonHero
    subheading="Our Technology Services"

    firstLine="Powering"

    highlight="Digital Growth"

    secondLine="with Innovation"

    description="We provide technology solutions across software development, AI, IoT, product engineering and modern digital services."
/>

            {/* Enterprise Development Services */}
            <EnterpriseDevelopment />

            <DevelopmentServices />

            <PriceTableSection />

            <ContactSection />
        </main>
    );
}