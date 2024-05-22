declare module 'react-calendar-heatmap' {
  import * as React from 'react';

  export interface CalendarHeatmapProps {
    startDate: Date | string;
    endDate: Date | string;
    values: Array<{ date: Date | string; count: number }>;
    classForValue?: (value: { date: Date | string; count: number }) => string;
    tooltipDataAttrs?: (value: { date: Date | string; count: number }) => { [key: string]: string };
    showWeekdayLabels?: boolean;
    onClick?: (value: { date: Date | string; count: number }) => void;
    onMouseOver?: (value: { date: Date | string; count: number }) => void;
    onMouseLeave?: (value: { date: Date | string; count: number }) => void;
    gutterSize?: number;
    horizontal?: boolean;
    showOutOfRangeDays?: boolean;
  }

  export default class CalendarHeatmap extends React.Component<CalendarHeatmapProps> {}
}
