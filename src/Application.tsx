import React from 'react';
import { CircularCarousel } from './components/Carousel';
import { Slider } from './components/Slider';
import { text } from './utils/constants';

export const Application: React.FC = () => {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const prevIndexRef                  = React.useRef(0);

    /** изменение активного индекса и сохранение значения предыдущего индекса */
    const onChangeActiveItem = (index: number) => {
        setActiveIndex((prev: number) => {
            prevIndexRef.current = prev;
            return index;
        });
    };

    /** поворот слайдера-карусели (изменение активного индекса периода)
     * @param direction - направление (1 - по часовой стрелке, -1 - против часовой стрелки)
     */
    const rotateCarousel = (direction: 1 | -1) => {
        setActiveIndex((prev: number) => {
            prevIndexRef.current = prev;
            return (prev + direction + text.periods.length) % text.periods.length;
        });
    };

    return (
        <main>
            <div className='block'>
                <div className='title'>
                    <div className="line-gradient" />
                    <h1>{text.title}</h1>
                </div>
                <CircularCarousel
                    activeIndex        = {activeIndex}
                    onChangeActiveItem = {onChangeActiveItem}
                    prevIndex          = {prevIndexRef.current}
                />
                <div className='pagination'>
                    <div className='carousel-navigation'>
                        <p>{`0${activeIndex + 1}/0${text.periods.length}`}</p>
                        <div className="carousel-button">
                            <button className="carousel-button prev" onClick={() => rotateCarousel(-1)}>
                                <span className="arrow"></span>
                            </button>
                            <button className="carousel-button next" onClick={() => rotateCarousel(1)}>
                                <span className="arrow"></span>
                            </button>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                    <Slider activeIndex={activeIndex}/>
                </div>
            </div>
        </main>
    )
}
