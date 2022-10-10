import React, { Component } from "react"
import Head from 'next/head'
import Layout from "@components/Layout"
import {useState} from "react"
import Hero from "@sections/Hero"
import Benefits from "@sections/Benefits"
import Resources from "@sections/Resources"
import Contact from "@sections/Contact"
import About from "@sections/About"
import ScrollToTop from "@components/ScrollToTop"
import Media from "@sections/Media";

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    };
    return (
     <>
         <Head>
             <meta charSet="utf-8"/>
             <meta name="viewport" content="width=device-width, initial-scale=1"/>
             <meta property="og:description" content="Get dental treatments in a clean and safe environment. Most insurance accepted, Same-day appointments."/>
             <meta property="og:title" content="Dental Care | Correctional Facilities Services | Shreveport, LA | Dallas, TX"/>
             <meta property="og:url" content="https://mfscdc.com/"/>
             <meta property="og:locale" content="en_US"/>
             <meta property="og:type" content="website"/>
             <title>Home App</title>
             <link rel="preconnect" href="https://fonts.googleapis.com" />
             <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
             <link
                 href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700&display=swap"
                 rel="stylesheet"
             />
             <title>Miles For Smiles Correctional Facility Services</title>
         </Head>
         <Layout isOpen={isOpen} toggle={toggle}>
             <Hero />
             <About />
             <Benefits />
             <Resources />
             <Media />
             <Contact />
             <ScrollToTop />
         </Layout>
     </>
    )
}
