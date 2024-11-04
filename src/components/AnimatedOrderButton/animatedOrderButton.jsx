import { useEffect, useRef } from 'react';
import style from './animatedOrderButton.module.css';

export default function AnimatedOrderButton({ loading }) {
    const buttonRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (loading) {
            button.classList.add(style.animate);
        } else {
            button.classList.remove(style.animate);
        }
    }, [loading]);

    return (
        <button ref={buttonRef} className={style.order}>
            <span className={`${style.default} ${!loading ? style.visible : ''}`}>Add Order</span>
            <span className={`${style.success} ${loading ? style.visible : ''}`}>
                Order Added!
                <svg viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
            </span>
            <div className={style.box}></div>
            <div className={style.truck}>
                <div className={style.back}></div>
                <div className={style.fronts}>
                    <div className={style.window}></div>
                </div>
                <div className={`${style.light} ${style.top}`}></div>
                <div className={`${style.light} ${style.bottom}`}></div>
            </div>
            <div className={style.lines}></div>
        </button>
    );
}
