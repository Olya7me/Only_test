import React, { forwardRef } from "react";

interface DateRangeProps {
    startDate: number;
    endDate: number;
    startRef: React.Ref<HTMLParagraphElement>;
    endRef: React.Ref<HTMLParagraphElement>;
}

const DateRange = forwardRef<HTMLDivElement, DateRangeProps>(
    ({ startDate, endDate, startRef, endRef }, ref) => {
        return (
            <div className="historic-dates__range range" ref={ref}>
                <p className="range_start" ref={startRef}>
                    {startDate}
                </p>
                <p className="range_end" ref={endRef}>
                    {endDate}
                </p>
            </div>
        );
    }
);

export default DateRange;
