import styles from "@sections/About/About.module.css"
import PageHeader from "@components/PageHeader"
import Image from 'next/image'
import clsx from "clsx"

const About = () => {
    return(
        <section id="about" className={styles.container}>
            <div className={styles.wrapper}>
                <PageHeader headerTitle="Your Health Matters" />
                <div className={clsx(styles.contentNoColumns)}>
                    <p>Oral health is very important, and <strong>Miles For Smiles</strong> is committed to providing quality dental care to the entire community.</p>
                    <p>A healthy mouth, teeth, and gums have a positive effect on your wellness. <strong>Miles For Smiles</strong> is a sterile self-contained dental facility that utilizes essential staff to service treatment needs on-site. During scheduled treatment days at facilities, a member of our team interacts with officials and staff throughout the treatment day.</p>
                    <p>Our employees always wear masks, and our mobile is equipped with external vents to remove potentially contaminated air. As society adjusts to the COVID-19 virus, it is paramount that we keep ourselves as healthy as possible.</p>
                    <p><strong>Miles For Smiles</strong> is dedicated to providing the cleanest and safest environment to protect visitors, patients, and staff. The atmosphere has changed since many patients last visited our office, but safety continues to be a top priority.</p>
                </div>
                <h2>Protect Yourself From Covid-19</h2>
                <h3><strong>Miles For Smiles</strong> has added the following precautions to minimize potential exposure to COVID-19.</h3>
                <div className={styles.content}>
                    <div className={styles.imageContainer}>
                        <Image
                            src="/images/treatment.jpeg"
                            alt="Patient Treatment"
                            objectFit="contain"
                            width={480}
                            height={480}
                        />
                    </div>
                    <ul className={styles.list}>
                        <li>Seating level HEPA air filtration systems with UV lights.</li>
                        <li>Limiting potential exposure to COVID-19 by implementing a 14-day quarantine protocol. </li>
                        <li>Mandatory pre-work day temperatures reading, which is logged every day for each employee. A quarantine protocol for employees showing a fever higher than 99.5, which does not allow them at the office until further testing is completed.</li>
                        <li>Mandatory temperature checks for all patients before entering our mobile facility. For patients with a temperature above 99.5 appointments will be rescheduled.</li>
                        <li>Readily available hand sanitizer for all employees and patients.</li>
                        <li>CaviCide disinfected treatment rooms for all student services.</li>
                        <li>Aerosol sprayed disinfectants to help reduce airborne viruses. • Upgraded PPEs, including masks, gloves, gowns, face shields, and more.</li>
                        <li>Professionally cleaned and meticulously maintained uniform.</li>
                        <li>The iWave-R air purifier is attached to mobiles air conditioning systems.</li>
                        <li>Dry shields are attached to all high-volume suction lines to help with the removal of aerosols at the time of treatment procedures.</li>
                        <li>AeroClave professionally cleans the mobile facilities. AeroClave is used in many hospitals, schools, Fire/EMS, Law Enforcement, and Military Aircraft</li>
                    </ul>
                </div>
                <h2>In Health and Beautiful Smiles</h2>
                <div className={styles.content}>
                <p>In addition to the aforementioned, <strong>Miles For Smiles</strong> tediously monitors and follows the guidelines recommended by the CDC, LDH, and ADA. Our astute and agile team is adept at pivoting to ensure safety and high quality. Thank you for your partnership, and please contact Dr. Alexander for additional information.</p>
                </div>
                <h2>Leading Our Communities to Better Health Care Outcomes</h2>
                <div className={styles.content}>
                    <blockquote>
                        The services provided by the Office of Miles for Smiles has been, and continue to be phenomenal. They are reliable, professional, and extremely easy to work with. Dr Alexander, his assistants, and office manager are not only knowledgeable, but kind and courteous. This team has a great system, they work efficiently, and do their best to meet your needs. I’ve had more compliments from inmates (patients if you don’t like the word inmate) for the services received, than ever before. Our staff and inmates (patients) are truly grateful for this office and the services they provide us!
                        <cite>Emily Hamm, LPN - Bossier Medium Security Facility</cite>
                    </blockquote>
                </div>
                <div className={styles.content}>
                    <blockquote>
                        Oral health is a window to overall health. The mouth is the entry point to the respiratory and digestive tract and a good oral hygiene prevents other diseases. Problems in your mouth, such as tooth decay and gum disease can affect the rest of your body. Poor oral health can be linked to most comorbidities. It is very important to visit the dentist for regular check-ups and follow up on all dental issues. Healthy teeth are a key to fulfilment and well-being.
                        <cite>Miles for Smiles</cite>
                    </blockquote>
                </div>
            </div>
        </section>
    );
}

export default About;
