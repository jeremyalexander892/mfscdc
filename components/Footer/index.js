import styles from './Footer.module.css';

const Footer = () => {
    return(
        <footer className={styles.container}>
            <div className={styles.wrapper}>
                <div>
                    <span>&copy; {new Date().getFullYear()} | www.MFSCDC.com | All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
