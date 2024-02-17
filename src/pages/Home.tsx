import { EffectCallback, useEffect, useState } from "react";
import Header from "../components/Header";

export default function Home() {
  const date: any = new Date();
  const hour: number = date.getHours();
  let [greeting, setGreeting] = useState<string>();

  useEffect((): ReturnType<EffectCallback> => {
    if (hour > 0 && hour < 12) {
      setGreeting("Good Morning");
    } else if (hour > 11 && hour < 16) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
    return (): void => {};
  }, [hour]);
  return (
    <div>
      <Header />
      <div className="w-[100%] m-auto text-center pt-[15vh]">
        <p className="text-xl">{greeting}</p>
      </div>
    </div>
  );
}
