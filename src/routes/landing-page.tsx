import { useEffect, useState } from "react";
import reactLogo from "../assets/react.svg";
import Header from "../header";

const LandingPage = () => {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState<{
    success: boolean;
    status: number;
    data: any;
  }>({
    success: false,
    status: 0,
    data: null,
  });

  useEffect(() => {
    async function asyncFunction() {
      const result = await fetch(
        "https://local.functions.nhost.run/v1/hello_world",
      ).then((res) => res.json());
      setResult(result);
    }

    asyncFunction();
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5em",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          Visualize Your Kanban Board In{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, #FF6D4D 0%, #E64623 54.51%, #D12600 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Detail
          </span>
        </div>

        <button
          style={{
            background: "black",
            color: "white",
            width: 280,
          }}
        >
          Import
        </button>
      </div>
      <div>
        <b>Why KanSync?</b>
        <div>
          <div>
            <img src="/images/kanban.png" />
          </div>
          <div>
            <b>Visualize Your Kanban Board In Detail</b>
            <p>
              KanSync is a tool that allows you to visualize your kanban board
              in detail. It allows you to see the status of your tasks, the
              people assigned to them, and the time they have been in that
              status.
            </p>
          </div>
        </div>
      </div>

      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite +React</h1>
      {JSON.stringify(result, null, 2)}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Bite and React logos to learn more
      </p>
    </>
  );
};

export default LandingPage;
