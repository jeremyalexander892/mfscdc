import styles from './PageHeader.module.css'
import clsx from "clsx"
import Tooth from "../../public/images/mfs-smiles-icon.svg"

const PageHeader = ({headerTitle}) => {
    return (
        <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>
                <span>{headerTitle}</span>
                <div className={clsx([styles.fancy, styles.amp])}>
                    <span><Tooth/></span>
                </div>
            </h1>
        </div>
    );
};

export default PageHeader;
