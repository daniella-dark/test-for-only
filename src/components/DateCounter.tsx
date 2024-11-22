import React from 'react';
import gsap from 'gsap';
import { IDateCounterProps } from '../@types/all';

/** Реакт-компонент "Анимированный счетчик даты"
 * @property IDateCounterProps
 */
export const DateCounter: React.FC<IDateCounterProps> = ({ from, to }) => {
    const counterRef = React.useRef(null);

    React.useEffect(() => {
        const counter = counterRef.current;
      
        gsap.fromTo(
        counter,
        { innerText: from },
        {
            innerText : to,
            duration  : 0.5,
            ease      : 'power1.inOut',
            roundProps: 'innerText',
            onUpdate  : () => {
                counter.innerText = Math.round(counter.innerText);
            },
        }
        );
    }, [from, to]);

  return <h2 ref={counterRef}>{from}</h2>;
};