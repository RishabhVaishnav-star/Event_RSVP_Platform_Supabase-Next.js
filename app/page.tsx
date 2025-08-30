"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "../lib/supabaseClient"

export default function HomePage() {
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true })
    if (!error) setEvents(data || [])
  }

  async function deleteEvent(id: string) {
    await supabase.from("events").delete().eq("id", id)
    fetchEvents() // refresh list
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>📅 Upcoming Events</h1>
      <Link href="/create">➕ Add New Event</Link>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> – {new Date(event.date).toDateString()}
            <Link href={`/edit/${event.id}`} style={{ marginLeft: "10px" }}>✏️ Edit</Link>
            <button onClick={() => deleteEvent(event.id)} style={{ marginLeft: "10px", color: "red" }}>
              ❌ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
