import styles from './About.module.css'
import clsx from "clsx"
import PageHeader from "../../components/PageHeader"

const About = () => {
    return(
        <section id="about" className={styles.container}>
            <div className={styles.wrapper}>
                <PageHeader headerTitle="Your Health Matters" />
                <div className={clsx(styles.contentNoColumns)}>
                    <p>Oral health is very important, and <strong>Miles For Smiles</strong> is committed to providing quality dental care to the entire community.</p>
                    <p>A healthy mouth, teeth, and gums have a positive effect on your wellness. <strong>Miles For Smiles</strong> is a sterile self-contained dental facility that utilizes essential staff to service treatment needs on-site. During scheduled treatment days at facilities, a member of our team interacts with officials and staff throughout the treatment day.</p>
                    <p><strong>Miles For Smiles</strong> follows ADA guidance and works closely with each facility&apos;s medical personnel. Thank you for your partnership, and please contact Dr. Alexander for additional information.</p>
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
