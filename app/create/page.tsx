"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function CreateEvent() {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from("events").insert([{ title, date }])
    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Event created successfully!")
      setTitle("")
      setDate("")
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>➕ Create New Event</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Create Event</button>
      </form>
    </div>
  )
}
