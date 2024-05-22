// src/utils/dateUtils.ts
export const getCurrentDate = () => {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // 자바스크립트는 월을 0부터 시작하기 때문에 1을 더해줍니다.
    day: date.getDate(),
  };
};
