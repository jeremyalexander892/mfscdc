import "../styles/index.css"
import Head from 'next/head'
import {useRouter} from "next/router"
import React from "react"

const MyApp = ({Component, pageProps}) => {
    const router = useRouter()
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
                <title>Miles For Smiles Correctional Facility Services</title>
            </Head>
            <Component {...pageProps} key={router.route}/>
        </>
    )
}
export default MyApp
