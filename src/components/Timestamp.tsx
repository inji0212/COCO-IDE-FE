export function formatKoreanTime(isoString: any) {
  const date = new Date(isoString);
  const koreanDate = new Date(date.getTime() + 9 * 60 * 60 * 1000); // 한국 시간대로 설정 (UTC+9)
  return {
    date: koreanDate.toLocaleDateString('en-CA'), // YYYY-MM-DD 형식
    time: koreanDate.toLocaleTimeString('en-US', {
      // 12시간 AM/PM 형식
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
  };
}
