import React from "react";
import { historicDates } from "../data/historic-dates";

interface SpinnerProps {
    mainCircleRef: React.RefObject<HTMLDivElement>;
    currentEvent: number;
    angle: number;
    timeOfRotation: number;
    loadThis: (index: number) => void;
}

const Spinner: React.FC<SpinnerProps> = ({
    mainCircleRef,
    currentEvent,
    angle,
    timeOfRotation,
    loadThis,
}) => {
    const numberOfEvents = historicDates.length;

    return (
        <div className="historic-dates__spinner spinner">
            <div
                ref={mainCircleRef}
                className="spinner__main-circle"
                style={
                    {
                        "--count": numberOfEvents,
                        "--angle": angle + "deg",
                        "--time": timeOfRotation + "ms",
                        "--delay": timeOfRotation + 300 + "ms",
                    } as React.CSSProperties
                }
            >
                {historicDates.map((item, index) => {
                    const { title } = item;
                    const idx = index + 1;
                    return (
                        <div
                            key={index}
                            className={
                                "spinner__shoulder " +
                                (currentEvent === index
                                    ? "spinner__shoulder_active"
                                    : "")
                            }
                            style={{ "--i": idx } as React.CSSProperties}
                            onClick={() => loadThis(index)}
                        >
                            <div className="spinner__circle-area">
                                <p className="spinner__circle">
                                    {idx}
                                    <span className="spinner__title">
                                        {title}
                                    </span>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Spinner;
