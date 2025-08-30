"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "../../../lib/supabaseClient"

export default function EditEvent() {
  const { id } = useParams()
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    fetchEvent()
  }, [])

  async function fetchEvent() {
    const { data } = await supabase.from("events").select("*").eq("id", id).single()
    if (data) {
      setTitle(data.title)
      setDate(data.date.split("T")[0]) // format for input
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    await supabase.from("events").update({ title, date }).eq("id", id)
    router.push("/") // redirect home
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>✏️ Edit Event</h1>
      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <button type="submit">Update</button>
      </form>
    </div>
  )
}
