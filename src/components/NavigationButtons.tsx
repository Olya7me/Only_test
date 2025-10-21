import React from "react";

interface NavigationButtonsProps {
    currentEvent: number;
    numberOfEvents: number;
    loadPrev: () => void;
    loadNext: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    currentEvent,
    numberOfEvents,
    loadPrev,
    loadNext,
}) => {
    const getTotal = (length: number, index: number): string => {
        return `${String(index + 1).padStart(2, "0")}/${String(length).padStart(
            2,
            "0"
        )}`;
    };

    return (
        <div className="historic-dates__navigation navigation">
            <p className="navigation__total">
                {getTotal(numberOfEvents, currentEvent)}
            </p>
            <div className="navigation__buttons control-buttons">
                <button
                    className="control-buttons__default control-buttons__prev"
                    onClick={loadPrev}
                    disabled={currentEvent === 0}
                ></button>
                <button
                    className="control-buttons__default control-buttons__next"
                    onClick={loadNext}
                    disabled={currentEvent === numberOfEvents - 1}
                ></button>
            </div>
        </div>
    );
};

export default NavigationButtons;
