import styles from './Resources.module.css'
import clsx from "clsx"
import PageHeader from "../../components/PageHeader"

const Resources = () => {
    return (
        <section id="resources" className={clsx(styles.container)}>
            <div className={styles.wrapper}>
                <PageHeader headerTitle="Useful Healthcare Resources" />
                <h3>For more detailed information regarding our new implementations, please visit these websites:</h3>
                <ul className={styles.resourcesList}>
                    <li>
                        <a href="https://www.aramarkuniform.com/campaign/microvantage" target="_blank">Aramark</a>
                        <span>As an innovative leader in infection prevention, Aramark Uniform Healthcare helps companies of all sizes reduce the risk of healthcare associated infections.</span>
                    </li>
                    <li>
                        <a href="https://iwaveair.com/devices/iwave-r/" target="_blank">iWave-R</a>
                        <span>iWave-R is the world’s first self-cleaning, no maintenance needlepoint bi-polar ionization generator designed specifically for treating air in residential duct A/C systems.</span>
                    </li>
                    <li>
                        <a href="https://www.dryshield.com/" target="_blank">iWave-R</a>
                        <span>Dry Shield combines the tasks of high-suction evacuator, saliva ejector, bite block, tongue shield, and oral pathway protector in one easy-to-use device.</span>
                    </li>
                    <li>
                        <a href="https://www.guardiantechnologies.com/" target="_blank">Germ Guardian</a>
                        <span>Improve your indoor air quality with the Germ Guardian 3-in-1 Air Purifier. Perfect for allergy sufferers, the HEPA filter captures 99.97% of dust and allergens as small as .3 microns in size!</span>
                    </li>
                    <li>
                        <a href="http://www.aeroclave.net/fire-ems/" target="_blank">AeroClave</a>
                        <span>Improve your indoor air quality with the Germ Guardian 3-in-1 Air Purifier. Perfect for allergy sufferers, the HEPA filter captures 99.97% of dust and allergens as small as .3 microns in size!</span>
                    </li>
                </ul>
                <p><strong className={styles.strong}>Benefits include the following:</strong> Reduces staff & patient exposure to dangerous pathogens, Faster process requiring less labor, Safe for sensitive electronic equipment, Consistent, reliable delivery of disinfectant, and Improves unit turn-around time.</p>
            </div>
        </section>
    );
}

export default Resources;
