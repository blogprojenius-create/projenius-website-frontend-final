import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

/* =========================================================
   LAYOUT
========================================================= */

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

/* =========================================================
   PAGES
========================================================= */

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import NewsInsights from "./pages/NewsInsights";

import CourseDetailsPage from "./pages/CourseDetailsPage";
import NewsDetailsPage from "./pages/NewsDetailsPage";

import StandardPage from "./pages/StandardPages";
import Contact from "./pages/Contact";

/* DEVELOPMENT */
import Development from "./pages/Development";

/* =========================================================
   GLOBAL STYLES
========================================================= */

import "./styles/site.css";

export default function App() {
    return (
        <BrowserRouter>

            {/* NAVBAR */}
            <Navbar />

            {/* ROUTES */}
            <Routes>

                {/* HOME */}
                <Route
                    path="/"
                    element={<Home />}
                />

                {/* ABOUT */}
                <Route
                    path="/about"
                    element={<About />}
                />

                {/* COURSES */}
                <Route
                    path="/courses"
                    element={<Courses />}
                />

                <Route
                    path="/courses/:id"
                    element={<CourseDetailsPage />}
                />

                {/* NEWS & INSIGHTS */}
                <Route
                    path="/blog"
                    element={<NewsInsights />}
                />

                <Route
                    path="/news-insights"
                    element={<NewsInsights />}
                />

                <Route
                    path="/insights/:id"
                    element={<NewsDetailsPage />}
                />

                {/* =================================================
                    SERVICES
                ================================================= */}

                {/* DEVELOPMENT */}
                <Route
                    path="/services/development"
                    element={<Development />}
                />

                {/* Optional Services landing page */}
                <Route
                    path="/services"
                    element={
                        <StandardPage type="services" />
                    }
                />

                {/* =================================================
                    OTHER PAGES
                ================================================= */}

                <Route
                    path="/workshop"
                    element={
                        <StandardPage type="workshop" />
                    }
                />

                <Route
                    path="/internship"
                    element={
                        <StandardPage type="internship" />
                    }
                />

                <Route
                    path="/startup"
                    element={
                        <StandardPage type="startup" />
                    }
                />

                <Route
                    path="/career-guidance"
                    element={
                        <StandardPage type="career-guidance" />
                    }
                />

                <Route
                    path="/join-our-team"
                    element={
                        <StandardPage type="join-our-team" />
                    }
                />

                {/* CONTACT */}
                <Route
                    path="/contact"
                    element={<Contact />}
                />

                {/* FALLBACK */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

            {/* FOOTER */}
            <Footer />

        </BrowserRouter>
    );
}