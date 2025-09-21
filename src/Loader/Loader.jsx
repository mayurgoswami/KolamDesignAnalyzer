import React, { useEffect, useRef } from 'react';
import styles from './Loader.module.css';

function Loader() {
    const loader_ref = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const handleLoader = () => {
            if (loader_ref.current) {
                timeoutRef.current = setTimeout(() => {
                    loader_ref.current.style.display = 'none';
                    document.body.style.overflowY = 'scroll';
                }, 500);
            }
        };

        // Check if page is already loaded
        if (document.readyState === 'complete') {
            handleLoader();
        } else {
            window.addEventListener('load', handleLoader);
        }

        // Cleanup
        return () => {
            window.removeEventListener('load', handleLoader);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div className={styles.loader_container} ref={loader_ref}>
            <div className={styles.loader}></div>
        </div>
    );
}

export default Loader;