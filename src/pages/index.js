import React, {useState} from "react"
import Layout from "../components/Layout";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Benefits from "../sections/Benefits";
import Media from "../sections/Media";
import Contact from "../sections/Contact";
import ScrollToTop from "../components/ScrollToTop";


export default function Home() {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Layout isOpen={isOpen} toggle={toggle}>
            <Hero />
            <About />
            <Benefits />
            <Media />
            <Contact />
            <ScrollToTop />
        </Layout>
    )
}
