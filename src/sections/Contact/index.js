import styles from "./Contact.module.css"
import clsx from "clsx"
import { State } from 'react-stateface'
import {AiOutlinePhone} from 'react-icons/ai'
import {MdOutlineLocationOn} from 'react-icons/md'
import PageHeader from "../../components/PageHeader"

const Contact = () => {

    return(
        <section id="contact" className={styles.container}>
            <div className={styles.wrapper}>
                <PageHeader headerTitle="Service Areas" />
                <p>Emergency and same-day services available.</p>
                <div className={styles.content}>
                    <div className={clsx(styles.box, styles.tx)}>
                        <State state="TX" />
                        <span>Call for an Appointment in Texas</span>
                        <AiOutlinePhone size={24} />
                        <a href="tel:9728052900" className={styles.link}>(972) 805-2900</a>
                        <address>
                            <MdOutlineLocationOn size={24} />
                            <span>3704 W. Camp Wisdom Rd, #120, Dallas, TX 75237</span>
                        </address>
                    </div>
                    <div className={clsx(styles.box, styles.la)}>
                        <State state="LA" />
                        <span>Call for an Appointment in Louisiana</span>
                        <AiOutlinePhone size={24} />
                        <a href="tel:3183172800" className={styles.link}>(318) 317-2800</a>
                        <address>
                            <MdOutlineLocationOn size={24} />
                            <span>4646 Hilry Huckaby Road, Suite 121, Shreveport, LA 71107</span>
                           </address>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
