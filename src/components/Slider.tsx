import React from 'react';
import { text } from '../utils/constants';
import { gsap } from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import { ISliderProps } from '../@types/all';

/** реакт-компонент "Слайдер дат и событий"
 * @property ISliderProps
 */
export const Slider: React.FC<ISliderProps> = ({ activeIndex }) => {
    const containerRef = React.useRef(null);
    const swiperRef = React.useRef(null);
    const [isBeginning, setIsBeginning] = React.useState(true);
    const [isEnd, setIsEnd] = React.useState(false);
    const [data, setIsData] = React.useState(undefined);
    const [spaceBetween, setSpaceBetween] = React.useState(60);
    const [slidesPerView, setSlidesPerView] = React.useState(3);

    /** изменение размера отступа и количества отображаемых слайдов при изменении размера окна */ 
    React.useEffect(() => {
        const updateSpaceBetween = () => {
            const width = window.innerWidth;
            if (width < 880) {
                setSpaceBetween(20);
                setSlidesPerView(2);
            } else {
                setSpaceBetween(60);
                setSlidesPerView(3);
            } 
        };

        window.addEventListener('resize', updateSpaceBetween);

        updateSpaceBetween();

        return () => {
            window.removeEventListener('resize', updateSpaceBetween);
        };
    }, []);

    /** анимация затухания старых данных и появления новых (при изменении индекса) */
    React.useEffect(() => {
        const container = containerRef.current;

        gsap.to(container, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                swiperRef?.current?.slideTo(0, 0);
                setIsData(text.periods[activeIndex].items);
                gsap.to(container, {
                    opacity: 1,
                    duration: 0.5,
                });
            },
        });
    }, [activeIndex]);

    /** проверка позиции начального/конечного слайда (для отображения/скрытия кнопок перемещения по слайдам) */
    const handleSlideChange = () => {
        setIsBeginning(swiperRef?.current?.isBeginning);
        setIsEnd(swiperRef?.current?.isEnd);
    };

    return (
        <div ref={containerRef} style={{ position: 'relative' }}>
            <Swiper
                modules       = {[Navigation, Pagination]}
                slidesPerView = {slidesPerView}
                spaceBetween  = {spaceBetween}
                navigation    = {{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination    = {{
                    el       : '.swiper-pagination',
                    clickable: true
                }}
                onSlideChange = {handleSlideChange}
                onSwiper      = {(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {data?.map((item: any) => (
                    <SwiperSlide key={item.date}>
                        <h3>{item.date}</h3>
                        <p>{item.description}</p>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='slider buttons'>
                <button className={`swiper-button-prev ${isBeginning || data?.length < 3 ? 'hidden' : ''}`}>
                    <span className="arrow"></span>
                </button>
                <button className={`swiper-button-next ${isEnd || data?.length < 3 ? 'hidden' : ''}`}>
                    <span className="arrow"></span>
                </button>
            </div>
        </div>
    );
};