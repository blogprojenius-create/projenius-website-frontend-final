import DevelopmentApproach from "../components/DevelopmentApproach/DevelopmentApproach";
import DevelopmentAudit from "../components/DevelopmentAudit/DevelopmentAudit";
import DevelopmentCapabilities from "../components/DevelopmentCapabilities/DevelopmentCapabilities";
import DevelopmentCta from "../components/DevelopmentCta/DevelopmentCta";
import DevelopmentEcosystem from "../components/DevelopmentEcosystem/DevelopmentEcosystem";
import DevelopmentImprove from "../components/DevelopmentImprove/DevelopmentImprove";
import DevelopmentLifecycle from "../components/DevelopmentLifecycle/DevelopmentLifecycle";
import DevelopmentOtherAreas from "../components/DevelopmentOtherAreas/DevelopmentOtherAreas";
import DevelopmentPathways from "../components/DevelopmentPathways/DevelopmentPathways";
import DevelopmentProcess from "../components/DevelopmentProcess/DevelopmentProcess";
import DevelopmentSupport from "../components/DevelopmentSupport/DevelopmentSupport";
import DevelopmentWhy from "../components/DevelopmentWhy/DevelopmentWhy";
import DevHero from "../components/DevHero/DevHero";

export default function DevelopmentPage() {
    return (
        <main className="development-page">

            {/* BLUE */}
            <section className="development-section development-section--blue">
                <DevHero />
            </section>

            {/* WHITE */}
            <section className="development-section development-section--white">
                <DevelopmentApproach />
            </section>

            {/* BLUE */}
            <section className="development-section development-section--blue">
                <DevelopmentPathways />
            </section>

            {/* WHITE */}
            <section className="development-section development-section--white">
                <DevelopmentCapabilities />
            </section>

            {/* BLUE */}
            <section className="development-section development-section--blue">
                <DevelopmentProcess />
            </section>

            {/* WHITE */}
            <section className="development-section development-section--white">
                <DevelopmentEcosystem />
            </section>

            {/* BLUE */}
            <section className="development-section development-section--blue">
                <DevelopmentAudit />
            </section>

            {/* WHITE */}
            <section className="development-section development-section--white">
                <DevelopmentImprove />
            </section>

            {/* BLUE */}
            <section className="development-section development-section--blue">
                <DevelopmentLifecycle />
            </section>

            {/* WHITE */}
            <section className="development-section development-section--white">
                <DevelopmentSupport />
            </section>

            {/* BLUE */}
            <section className="development-section development-section--blue">
                <DevelopmentWhy />
            </section>

            {/* WHITE */}
            <section className="development-section development-section--white">
                <DevelopmentCta />
            </section>

            {/* BLUE */}
            <section className="development-section development-section--blue">
                <DevelopmentOtherAreas />
            </section>

        </main>
    );
}