import InternshipHero from "../components/InternshipHero/InternshipHero";
import InternshipAbout from "../components/InternshipAbout/InternshipAbout";
import InternshipTech from "../components/InternshipTech/InternshipTech";
import CommonHero from "../components/CommonHero/CommonHero";
export default function Internship() {
    return (
        <main className="internship-page">
            <CommonHero
                subheading="Internship Program"

                firstLine="Learn"

                highlight="Build"

                secondLine="Get Industry Ready"

                description="Gain practical experience by working on real projects while developing the technical and professional skills required by industry."
            />
            <InternshipHero />
            <InternshipAbout />
            <InternshipTech />
        </main>
    );
}