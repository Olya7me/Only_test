import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

import DateRange from "../../components/DateRange";
import Spinner from "../../components/Spinner";
import NavigationButtons from "../../components/NavigationButtons";
import EventSlider from "../../components/EventSlider";
import EventDots from "../../components/EventDots";

import { historicDates } from "../../data/historic-dates";
import "./MainPage.scss";

function MainPage() {
    const numberOfEvents = historicDates.length;
    const angleBetweenDots = 360 / numberOfEvents;
    const defaultTimeOfRotation = 300;

    const sliderRef = useRef<HTMLDivElement>(null);
    const mainCircleRef = useRef<HTMLDivElement>(null);
    const startDateRef = useRef<HTMLDivElement>(null);
    const endDateRef = useRef<HTMLDivElement>(null);

    const [angle, setAngle] = useState<number>(angleBetweenDots);
    const [currentEvent, setCurrentEvent] = useState<number>(0);
    const [timeOfRotation, setTimeOfRotation] = useState<number>(
        defaultTimeOfRotation
    );
    const [startDate, setStartDate] = useState<number>(
        Number(historicDates[0].events[0].date)
    );
    const [endDate, setEndDate] = useState<number>(
        Number(historicDates[0].events[historicDates[0].events.length - 1].date)
    );

    // Показываем слайдер с анимацией
    useEffect(() => {
        const timer = setTimeout(
            () => sliderRef.current?.classList.add("slider_show"),
            300
        );
        return () => clearTimeout(timer);
    }, [currentEvent]);

    function fadeIt(fn: Function) {
        sliderRef.current?.classList.remove("slider_show");
        setTimeout(fn, 300);
    }

    function animateDatesRange(index: number) {
        const newStart = Number(historicDates[index].events[0].date);
        const newEnd = Number(
            historicDates[index].events[historicDates[index].events.length - 1]
                .date
        );
        const animationTime = (timeOfRotation + 300) / 1000;

        gsap.to(startDateRef.current, {
            duration: animationTime,
            textContent: newStart,
            roundProps: "textContent",
            ease: "none",
            onUpdate: () =>
                setStartDate(
                    Number(startDateRef.current?.textContent) || newStart
                ),
        });
        gsap.to(endDateRef.current, {
            duration: animationTime,
            textContent: newEnd,
            roundProps: "textContent",
            ease: "none",
            onUpdate: () =>
                setEndDate(Number(endDateRef.current?.textContent) || newEnd),
        });
    }

    function loadThis(index: number) {
        if (index < 0 || index >= numberOfEvents) return;

        animateDatesRange(index);

        Array.from(mainCircleRef.current?.children || []).forEach(
            (child, i) => {
                child.classList.toggle("spinner__shoulder_active", i === index);
            }
        );

        const angleOfRotation = angleBetweenDots - index * angleBetweenDots;
        setTimeOfRotation(
            Math.abs(currentEvent - index) * defaultTimeOfRotation
        );

        setTimeout(() => setAngle(angleOfRotation), 300);
        fadeIt(() => setCurrentEvent(index));
    }

    const loadPrev = () => loadThis(currentEvent - 1);
    const loadNext = () => loadThis(currentEvent + 1);

    return (
        <main className="main">
            <section className="historic-dates">
                <h1 className="historic-dates__heading">Исторические даты</h1>
                <DateRange
                    startDate={startDate}
                    endDate={endDate}
                    startRef={startDateRef}
                    endRef={endDateRef}
                />
                <Spinner
                    mainCircleRef={mainCircleRef}
                    currentEvent={currentEvent}
                    angle={angle}
                    timeOfRotation={timeOfRotation}
                    loadThis={loadThis}
                />
                <NavigationButtons
                    currentEvent={currentEvent}
                    numberOfEvents={numberOfEvents}
                    loadPrev={loadPrev}
                    loadNext={loadNext}
                />
                <EventSlider currentEvent={currentEvent} ref={sliderRef} />
                <EventDots currentEvent={currentEvent} loadThis={loadThis} />
            </section>
        </main>
    );
}

export default MainPage;
