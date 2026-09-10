import ContactSection from "../components/ContactSection/ContactSection";
import DevelopmentHero from "../components/DevelopmentHero/DevelopmentHero";
import DevelopmentServices from "../components/DevelopmentServices/DevelopmentServices";
import EnterpriseDevelopment from "../components/EnterpriseDevelopment/EnterpriseDevelopment";
import PriceTableSection from "../components/PriceTableSection/PriceTableSection";

export default function Development() {
    return (
        <main className="development-page">

            {/* Hero */}
            <DevelopmentHero />

            {/* Enterprise Development Services */}
            <EnterpriseDevelopment />

            <DevelopmentServices />

            <PriceTableSection />

            <ContactSection />
        </main>
    );
}