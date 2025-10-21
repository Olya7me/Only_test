import React from "react";
import { historicDates } from "../data/historic-dates";

interface EventDotsProps {
    currentEvent: number;
    loadThis: (index: number) => void;
}

const EventDots: React.FC<EventDotsProps> = ({ currentEvent, loadThis }) => {
    return (
        <div className="events__control-buttons">
            {historicDates.map((_, index) => (
                <button
                    key={index}
                    className={`events__button ${
                        currentEvent === index ? "events__button_active" : ""
                    }`}
                    onClick={() => loadThis(index)}
                ></button>
            ))}
        </div>
    );
};

export default EventDots;
