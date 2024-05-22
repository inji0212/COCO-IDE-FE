import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './AttendanceCalendar.css';
import address from '../Address';
import useAuthStore from '../../state/AuthStore';

interface Attendance {
  date: string;
  present: boolean;
}

const hashCode = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

const getRandomColorClass = (date: string) => {
  const colors = ['color-gitlab-1', 'color-gitlab-2', 'color-gitlab-3', 'color-gitlab-4'];
  const hash = hashCode(date);
  const index = Math.abs(hash) % colors.length;
  return colors[index];
  // return colors[Math.floor(Math.random() * colors.length)];
};

// 날짜를 ISO 문자열로 변환하는 함수
const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

// 1년 동안의 날짜 배열을 생성하는 함수
const generateDateArray = (startDate: Date, endDate: Date): Attendance[] => {
  const dates: Attendance[] = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push({
      date: formatDate(currentDate),
      present: false,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const AttendanceCalendar = () => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const { memberId } = useAuthStore(state => ({
    memberId: state.memberId,
  }));
  useEffect(() => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');

    // 기본 날짜 배열 생성
    const initialDates = generateDateArray(startDate, endDate);
    setAttendance(initialDates);

    // 서버에서 출석 정보를 가져와 병합
    const fetchAttendance = async () => {
      try {
        const response = await address.get(`/api/attend?memberId=${memberId}`);
        const serverData = response.data;
        // console.log('Server Data:', serverData);
        // 서버 데이터를 기본 날짜 배열에 병합
        const attendDates = serverData[0].attendDate;
        const mergedData = initialDates.map(dateItem => {
          return {
            ...dateItem,
            present: attendDates.includes(dateItem.date),
          };
        });

        // 디버깅 로그
        // console.log('Initial Dates:', initialDates);
        // console.log('Merged Data:', mergedData);

        setAttendance(mergedData);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendance();
  }, [memberId]);

  const today = new Date();
  const todayString = formatDate(today);
  const startDate = new Date('2024-01-01');
  const endDate = new Date('2024-12-31');

  return (
    <div className="calendar-container">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={attendance.map(entry => ({
          date: entry.date,
          count: entry.present ? 1 : 0, // 출석 여부에 따라 1 또는 0 설정
        }))}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          const dateStr = typeof value.date === 'string' ? value.date : formatDate(new Date(value.date));
          const baseClass = value.count === 0 ? 'color-empty' : getRandomColorClass(dateStr);
          return value.date === todayString ? `${baseClass} color-today` : baseClass;
        }}
        tooltipDataAttrs={value => {
          if (!value) {
            return { 'data-tooltip-content': '', 'data-date': '' };
          }
          const date = typeof value.date === 'string' ? value.date : formatDate(new Date(value.date));
          return {
            'data-tooltip-content': `${value.date}: ${value.count ? 'Present' : 'Absent'}`,
            'data-date': date, // 날짜 속성 추가
          };
        }}
        showWeekdayLabels
      />
    </div>
  );
};

export default AttendanceCalendar;
