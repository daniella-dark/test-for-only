import React from 'react';
import { gsap } from 'gsap';
import { text } from '../utils/constants';
import { DateCounter } from './DateCounter';
import { ICircularCarouselProps } from '../@types/all';

/** Реакт-компонент "Карусель-слайдер для изменения периода" 
 * @property ICircularCarouselProps
*/
export const CircularCarousel: React.FC<ICircularCarouselProps> = ({ activeIndex, setActiveIndex }) => {
    const items                             = text.periods;
    const carouselRef                       = React.useRef(null);
    const prevIndexRef                      = React.useRef(0);
    const [currentPeriod, setCurrentPeriod] = React.useState({
        start: items[0].items[0].date,
        end  : items[0].items.at(-1).date
    });

    /** Анимация смены активного элемента слайдера и текущего периода */
    React.useEffect(() => {
      const carousel = carouselRef.current,
            radius   = 265,
            angle    = 360 / items.length;

      items.forEach((_, index) => {
          const itemElement = carousel.children[index],
                x           = radius * Math.cos(((index - 1) * angle * Math.PI) / 180),
                y           = radius * Math.sin(((index - 1) * angle * Math.PI) / 180);

          gsap.set(itemElement, {
              x: x,
              y: y
          });
      });

      gsap.to(carousel, {
          rotation       : -activeIndex * angle,
          duration       : 1,
          transformOrigin: 'center',
          ease           : 'power2.inOut',
          onStart        : () => {
              const title       = carousel.children[activeIndex]?.querySelector('.carousel-title'),
                    prevTitle   = carousel.children[prevIndexRef?.current]?.querySelector('.carousel-title');
              
              prevTitle &&
                  gsap.to(prevTitle, {
                      opacity: 0,
                      duration: 0.5,
                      onComplete: () => {
                          gsap.to(title, {
                              opacity: 1,
                              duration: 0.5,
                          });
                      }
                  });
            
              items.forEach((_, index) => {
                const itemElement = carousel.children[index];
                  
                  gsap.to(itemElement, {
                      rotation: activeIndex * angle,
                      duration: 1,
                      ease    : 'power2.inOut',
                  });
              });
          },
      });

      setCurrentPeriod({
          start: items[activeIndex].items[0].date,
          end  : items[activeIndex].items.at(-1).date
      })
  }, [activeIndex]);

  /** хук для обновления даты для анимированного счетчика
   * @param date - новое значение даты
   */
  const useUpdateCount = (date: string) => {
      const [from, setFrom] = React.useState(0);
      const [to, setTo]     = React.useState(0);

      React.useEffect(() => {
          setFrom(to);
          setTo(+date)
      }, [date])

      return {from, to};
  };

  const onChangeActiveItem = (index: number) => {
      setActiveIndex(prev => {
          prevIndexRef.current = prev;
          return index;
      })
  }

  return (
      <div className="carousel-container">
          <div className='period'>
              <DateCounter {...useUpdateCount(currentPeriod.start)} />
              <DateCounter {...useUpdateCount(currentPeriod.end)} />
          </div>
          <div className="carousel-circle" ref={carouselRef}>
              {
                items.map((item, index) => (
                    <div
                      key       = {item.id}
                      className = {`carousel-item ${index === activeIndex ? 'active' : ''}`}
                      onClick   = {() => onChangeActiveItem(index)}
                    >
                        {index + 1}
                        <div className="carousel-title">{item.title}</div>
                    </div>
              ))}
          </div>
      </div>
  );
};