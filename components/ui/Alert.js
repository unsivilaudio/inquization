import { useRef, useEffect } from 'react';
import classes from '../../styles/ui/Alert.module.scss';

function Alert({ type = 'error', callback, timeout = 3000, children }) {
    const alertRef = useRef(null);
    const alertTimeout = useRef();
    const alertClasses = [classes.Alert];

    useEffect(() => {
        if (timeout > 0) {
            alertTimeout.current = setTimeout(() => {
                alertRef.current.remove();
            }, timeout);
        }

        if (!isNaN(timeout) && callback) {
            alertTimeout.current = setTimeout(callback, timeout);
        }

        return () => {
            clearTimeout(alertTimeout.current);
        };
    }, [callback, timeout]);

    switch (type) {
        case 'error':
            alertClasses.push(classes.Error);
            break;
        case 'info':
            alertClasses.push(classes.Info);
            break;
        case 'success':
            alertClasses.push(classes.Success);
            break;
    }

    return (
        <div className={alertClasses.join(' ')} ref={alertRef}>
            {children}
        </div>
    );
}

export default Alert;
