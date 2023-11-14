import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [result, setResult] = useState<{
    success: boolean,
    status: number,
    data: any
  }>({
    success: false,
    status: 0,
    data: null
  })
  
  useEffect(() => {
    async function asyncFunction() {
      const result = await fetch("https://local.functions.nhost.run/v1/hello_world").then(res => res.json())
      setResult(result)
    }

    asyncFunction();
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
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
  )
}

export default App
