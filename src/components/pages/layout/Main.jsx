// import { useEffect } from "react";

export default function Main({ childComponents = <></> }) {
  // useEffect(() => {
  //   console.log('main')
  // }, [])
  return (
    <main className="bg-primaryBackground">
      {childComponents}
    </main>
  );
}
