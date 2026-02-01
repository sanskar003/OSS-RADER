"use client"

import { useState } from "react";

export default function About() {
    const [count, setcount] = useState<number>(0)

    return (
        <div>
            <h1>About</h1>
            <p>Count: {count}</p>
            <button onClick={() => setcount(count + 1)}>Increment</button>
        </div>
    )
}