import { EffectCallback, useEffect, useState } from "react";
import Header from "../components/Header";

export default function Home() {
  let fullDate: any = new Date();

  const [greeting, setGreeting] = useState<string>();
  const [day, setDay] = useState<string>();
  const date: number = fullDate.getDate();
  const [month, setMonth] = useState<string>();
  const year: number = fullDate.getFullYear();

  useEffect((): ReturnType<EffectCallback> => {
    const hour: number = fullDate.getHours();
    hour > 0 && hour < 12 && setGreeting("Good Morning");
    hour > 11 && hour < 16 && setGreeting("Good Afternoon");
    hour >= 16 && setGreeting("Good Evening");

    const day: number = fullDate.getDay();
    day === 0 && setDay("Sunday");
    day === 1 && setDay("Monday");
    day === 2 && setDay("Tuesday");
    day === 3 && setDay("Wednesday");
    day === 4 && setDay("Thursday");
    day === 6 && setDay("Friday");
    day === 7 && setDay("Saturday");

    const month: number = fullDate.getMonth();
    month === 0 && setMonth("Jan");
    month === 1 && setMonth("Feb");
    month === 2 && setMonth("Mar");
    month === 3 && setMonth("Apr");
    month === 4 && setMonth("May");
    month === 5 && setMonth("Jun");
    month === 6 && setMonth("Jul");
    month === 7 && setMonth("Aug");
    month === 8 && setMonth("Sep");
    month === 9 && setMonth("Oct");
    month === 10 && setMonth("Nov");
    month === 11 && setMonth("Dec");

    return (): void => {};
  }, []);

  return (
    <div className="md: grid grid-cols-4">
      <div className=" col-span-1">
        <Header />
      </div>
      <div className="m-auto w-[85%]  text-start pt-[12vh] col-span-3 md:border-l pl-5">
        <p className="text-xl md:text-2xl tracking-wider ">{greeting}</p>
        <p className=" font-rochester text-lg md:text-xl">Today is {day}</p>
        <p>
          {date} {month}, {year}
        </p>
      </div>
    </div>
  );
}
