import styles from './InfoBar.module.css'
import clsx from "clsx"
import {AiOutlineFacebook, AiOutlineInstagram, AiOutlineMail, AiOutlinePhone, AiOutlineFieldTime} from 'react-icons/ai'

const InfoBar = () => {
    return (
        <div className={styles.container}>
            <div className={clsx(styles.wrapper, "font-extralight")}>
                <div className={clsx(styles.box, styles.operationHours)}>
                    <AiOutlineFieldTime size={24} className={clsx(styles.icon, styles.time)}/>
                    <span>Hours | Mon - Fri | 8am - 4pm</span>
                </div>
                <div className={styles.box}>
                    <span className={styles.state}>Louisiana</span>
                    <AiOutlinePhone size={24} className={clsx(styles.icon, styles.phone)}/>
                    <a href="tel:3183172800" className={styles.link}>(318) 317-2800</a>
                </div>
                <div className={styles.box}>
                    <span className={styles.state}>Texas</span>
                    <AiOutlinePhone size={24} className={clsx(styles.icon, styles.phone)}/>
                    <a href="tel:9728052900" className={styles.link}>(972) 805-2900</a>
                </div>
                <div className={clsx(styles.box)}>
                    <AiOutlineMail size={24} className={clsx(styles.icon, styles.email)}/>
                    <a href="mailto:doc@milesforsmiles.com" className={styles.link}>doc@milesforsmiles.com</a>
                </div>
                <div className={styles.box}>
                    <a className={styles.link} target="_blank" href="https://www.facebook.com/milesforsmiles318/"><AiOutlineFacebook size={24} className={clsx(styles.icon)}/></a>
                    <a className={styles.link} target="_blank" href="https://www.instagram.com/milesforsmiles318"><AiOutlineInstagram size={24} className={clsx(styles.icon, styles.instagram)}/></a>
                </div>
            </div>
        </div>
    );
}

export default InfoBar;
