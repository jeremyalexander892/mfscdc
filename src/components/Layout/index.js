import {motion} from "framer-motion"
import styles from "./Layout.module.css"
import clsx from "clsx"
import InfoBar from "../InfoBar";
import SideBar from "../SideBar";
import NavBar from "../NavBar";
import Footer from "../Footer";


const Layout = ({children, className, isOpen, toggle,}) => {
    return  (
        <motion.div
            exit={{ opacity: 0 }}
            initial="initial"
            animate="animate"
            className={clsx(`app-container ${className}`, styles.motionDiv)}
        >
            <InfoBar/>
            <SideBar isOpen={isOpen} toggle={toggle}/>
            <NavBar toggle={toggle}/>
            <main>{children}</main>
            <Footer/>
        </motion.div>
    );
}

export default Layout;
