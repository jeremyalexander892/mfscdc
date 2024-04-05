import React, {useCallback, useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import styles from './Modal.module.css';

const Modal = ({ onClose, children, title }) => {
    const [portalRoot, setPortalRoot] = useState(null);
    const modalWrapperRef = useRef();

    const backDropHandler = useCallback(e => {
        if (!modalWrapperRef?.current?.contains(e.target)) {
            onClose();
        }
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setPortalRoot(document.getElementById('modal-root'));
        })
        setTimeout(() => {
            window.addEventListener('click', backDropHandler);
        })
    }, [])

    useEffect(() => {
        return () => window.removeEventListener('click', backDropHandler);
    }, []);

    const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className={styles.modalOverlay}>
            <div ref={modalWrapperRef} className={styles.modalWrapper}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    {title && <h1>{title}</h1>}
                    <div className={styles.modalBody}>{children}</div>
                </div>
            </div>
        </div>
    );

    if (!portalRoot) return null;


    return ReactDOM.createPortal(
        modalContent,
        portalRoot
    );
};

export default Modal
