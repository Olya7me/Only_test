import React, { forwardRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { historicDates } from "../data/historic-dates";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface EventSliderProps {
    currentEvent: number;
}

const EventSlider = forwardRef<HTMLDivElement, EventSliderProps>(
    ({ currentEvent }, sliderRef) => {
        return (
            <div ref={sliderRef} className="historic-dates__slider slider">
                <p className="slider__mobile-title">
                    {historicDates[currentEvent].title}
                </p>
                <button className="slider__btn slider__btn_prev"></button>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={80}
                    slidesPerView={4}
                    breakpoints={{
                        320: { slidesPerView: 1.5, spaceBetween: 25 },
                        769: { slidesPerView: 3, spaceBetween: 80 },
                        1025: { slidesPerView: 4, spaceBetween: 80 },
                    }}
                    navigation={{
                        prevEl: ".slider__btn_prev",
                        nextEl: ".slider__btn_next",
                    }}
                >
                    {historicDates[currentEvent].events.map((item, index) => (
                        <SwiperSlide key={index} className="slider__slide">
                            <p className="slider__year">{item.date}</p>
                            <p className="slider__description">
                                {item.description}
                            </p>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className="slider__btn slider__btn_next"></button>
            </div>
        );
    }
);

export default EventSlider;
