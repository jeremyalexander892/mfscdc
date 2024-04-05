import styles from './NavBar.module.css'
import {useEffect, useState} from "react"
import {MdMenu} from "react-icons/md"
import jump from 'jump.js'
import Logo from "../../../public/images/mfs_full_logo_white.png"
import Image from "next/legacy/image";

const NavBar = ({toggle}) => {
    const [scrollNav, setScrollNav] = useState(false);

    const handleScrollYChange = () => {
        setScrollNav(window.scrollY >= 120);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScrollYChange);
        return () => {
            window.removeEventListener('scroll', handleScrollYChange);
        }
    }, []);

    const jumpTo = (target) => {
        jump(target, {
            duration: 1000,
        });
    };

    return(
        <nav className={styles.nav}
             style={{
                 background: scrollNav ? 'var(--blueDark)' : 'rgba(11, 69, 127, 0.2)'
             }}>
            <div className={styles.container}>
                <div onClick={() => jumpTo('#home')} className={styles.logo}>
                    <a>
                        <Image alt="MFS CDC" layout="fixed" src={Logo} width={309} height={58} />
                    </a>
                </div>
                <div className={styles.mobileMenuIcon} onClick={toggle}>
                    <MdMenu/>
                </div>
                <ul className={styles.navMenu}>
                    <li className={styles.navMenuItem} onClick={() => jumpTo('#home')}>
                        <a className={styles.navMenuLink}>Home</a>
                    </li>
                    <li className={styles.navMenuItem} onClick={() => jumpTo('#about')}>
                        <a className={styles.navMenuLink}>About</a>
                    </li>
                    <li className={styles.navMenuItem} onClick={() => jumpTo('#benefits')}>
                        <a className={styles.navMenuLink}>Benefits</a>
                    </li>
                    <li className={styles.navMenuItem} onClick={() => jumpTo('#resources')}>
                        <a className={styles.navMenuLink}>Resources</a>
                    </li>
                    <li className={styles.navMenuItem} onClick={() => jumpTo('#media')}>
                        <a className={styles.navMenuLink}>Media</a>
                    </li>
                    <li className={styles.navMenuItem} onClick={() => jumpTo('#contact')}>
                        <a className={styles.navMenuLink}>Service Areas</a>
                    </li>
                </ul>
                <div className={styles.navButton}>
                    <a onClick={() => jumpTo('#contact')}>Request Appointment</a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
