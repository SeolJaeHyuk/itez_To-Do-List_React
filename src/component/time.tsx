import { useState, memo, useEffect } from 'react';

interface Props {
  today: Date;
}

function Time({ today }: Props) {
  const [time, setTime] = useState(today); // 현재 날짜를 관리

  // 날짜를 1초마다 갱신
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date()); // 현재 시간을 한국 시간 형식으로 갱신
    }, 1000); // 1초마다 갱신
    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌을 클리어
  }, []);

  return (
    <h4 className="tabular-nums" onClick={() => setTime(new Date())}>
      오늘은 {getFormattedDate(time)} ({getDayOfWeek(time)})이며,
    </h4>
  );
}

export default memo(Time);

// 날짜를 'YYYY년 MM월 DD일' 형식으로 반환
const getFormattedDate = (today: Date) => {
  return `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
};

// 요일을 반환 (예: '월요일', '화요일' 등)
const getDayOfWeek = (today: Date) => {
  const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  return daysOfWeek[today.getDay()];
};
