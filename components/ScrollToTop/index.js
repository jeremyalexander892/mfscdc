import styles from './ScrollToTop.module.css'
import {useEffect, useState} from "react"
import {MdKeyboardArrowUp} from "react-icons/md"

const ScrollToTop = () => {
    const [showScroll, setShowScroll] = useState(false);

    const handleScrollYChange = () => {
        setShowScroll(window.scrollY >= 400)
    }

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    useEffect(()=>{
        window.addEventListener('scroll', handleScrollYChange);
        return () => {
            window.removeEventListener('scroll', handleScrollYChange);
        }
    }, []);

    return (
        <div
            className={styles.container}
            style={{
                display: showScroll ? 'flex' : 'none'
            }}
        >
            <div className={styles.wrapper}>
                <button onClick={scrollToTop} className={styles.button}>
                  <MdKeyboardArrowUp className={styles.icon}/>
                </button>
            </div>
        </div>
    );
};

export default ScrollToTop;
