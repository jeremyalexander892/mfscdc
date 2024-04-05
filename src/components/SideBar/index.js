import styles from './SideBar.module.css'
import Link from 'next/link'
import {MdClose} from "react-icons/md"
import jump from 'jump.js'

const SideBar = ({isOpen, toggle}) => {
    const jumpTo = (target) => {
        jump(target, {
            duration: 1000,
        });
    };
    return(
        <aside
            style={{
                opacity: isOpen ? '100%' : '0',
                bottom:  isOpen ? '0' : '100%'
            }}
            onClick={toggle}
            className={styles.container}>
            <div className={styles.iconWrapper} onClick={toggle}>
                <MdClose size={24} color="white"/>
            </div>
            <div className={styles.wrapper}>
                <ul className={styles.sidebarMenu}>
                    <li className={styles.sidebarMenuItem}>
                        <Link href="#home" legacyBehavior>
                            <a className={styles.sidebarMenuLink}>Home</a>
                        </Link>
                    </li>
                    <li className={styles.sidebarMenuItem}>
                        <Link href="#about" legacyBehavior>
                            <a className={styles.sidebarMenuLink}>About</a>
                        </Link>
                    </li>
                    <li className={styles.sidebarMenuItem}>
                        <Link href="#benefits" legacyBehavior>
                            <a className={styles.sidebarMenuLink}>Benefits</a>
                        </Link>
                    </li>
                    <li className={styles.sidebarMenuItem}>
                        <Link href="#resources" legacyBehavior>
                            <a className={styles.sidebarMenuLink}>Resources</a>
                        </Link>
                    </li>
                    <li className={styles.sidebarMenuItem}>
                        <Link href="#media" legacyBehavior>
                            <a className={styles.sidebarMenuLink}>Media</a>
                        </Link>
                    </li>
                    <li className={styles.sidebarMenuItem}>
                        <Link href="#contact" legacyBehavior>
                            <a className={styles.sidebarMenuLink}>Service Areas</a>
                        </Link>
                    </li>
                </ul>
                <div className={styles.sidebarButtonWrapper}>
                    <button onClick={() => jumpTo('#contact')}>Request Appointment</button>
                </div>
            </div>
        </aside>
    );
}

export default SideBar;
