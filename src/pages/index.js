import React,  {useState}  from "react"
import Layout from "../components/Layout";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Benefits from "../sections/Benefits";
import Resources from "../sections/Resources";
import Media from "../sections/Media";
import Contact from "../sections/Contact";
import Modal from "../components/Modal";
import ScrollToTop from "../components/ScrollToTop";
import Image from "next/image";


export default function Home() {
    const [showModal, setShowModal] = useState(true)
    const [imgSrc, setImgSrc] = useState('/images/systemic-diseases-flyer.png')
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Layout isOpen={isOpen} toggle={toggle}>
            <Hero />
            <About />
            <Benefits />
            <Resources />
            <Media />
            <Contact />
            {showModal &&
                <Modal onClose={() => setShowModal(false)}>
                    <Image
                        alt="MFS CDC"
                        src={imgSrc}
                        priority={true}
                        width={795}
                        height={1105}
                    />
                </Modal>
            }
            <ScrollToTop />
        </Layout>
    )
}
