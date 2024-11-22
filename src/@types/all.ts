/** пропсы компонента слайдера дат и событий */
export interface ISliderProps {
    /** индекс выбранного периода */
    activeIndex: number;
}

/** пропсы компонента карусели-слайдера для изменения периода */
export interface ICircularCarouselProps extends ISliderProps {
    /** изменение индекса выбранного периода */
    setActiveIndex: (value: React.SetStateAction<number>) => void
}
/** пропсы компонента анимированного счетчика даты */
export interface IDateCounterProps {
    /** начальное значение даты */
    from: number;
    /** конечное значение даты */
    to  : number;
}

