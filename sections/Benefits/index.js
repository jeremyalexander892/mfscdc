import styles from './Benefits.module.css'
import clsx from "clsx"
import Image from 'next/image'
import PageHeader from "@components/PageHeader"

const Benefits = () => {
    return (
        <section id="benefits" className={clsx(styles.container)}>
            <div className={styles.wrapper}>
                <PageHeader headerTitle="Logistical Benefits of Miles For Smiles Mobile Dental Care" />
                <div className={styles.content}>
                    <ul className={styles.benefitsList}>
                        <li>Establish a collaborative relationship with each facility’s medical
                            personnel to maintain electronic health records and HIPPA
                            compliance.</li>
                        <li>Our dedicated staff has over 13 years of experience providing
                            quality comprehensive dental care, in addition to access to care for
                            emergency services within correctional facilities.</li>
                        <li>Our state of the art, self-contained mobile dental unit is equipped
                            to handle all the dental needs of your population on site.</li>
                        <li>Provide comprehensive, secure and dignified dental care and
                            treatment for adult and juvenile populations.</li>
                        <li>Our cost-effective, mobile, correctional dental care services are
                            fully customizable for any size facility, from the smallest county
                            jails to the largest statewide and federal correctional facilities.</li>
                        <li>Inmates remain within your secure facility, eliminating the risk of
                            inmate/patient escape during transport and decrease potential
                            contraband entering your facility.</li>
                        <li>Reduce manpower and expenses by removing the need to
                            transport inmates/patients to a medical facility for treatment.</li>
                        <li>Significant reduction in your number of inmates/patients that need
                            treatment, by seeing up to 40 inmates/patients during a two-day
                            on-site visit.</li>
                        <li>Transportation funds and resources can be reallocated within your
                            facility. Please see attachment for COVID-19 implementations.</li>
                    </ul>
                    <div className={styles.imageContainer}>
                        <Image
                            src="/images/patientflow.jpeg"
                            alt="Secure Patient Flow"
                            objectFit="contain"
                            width={480}
                            height={480}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Benefits;
