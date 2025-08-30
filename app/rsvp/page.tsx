"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";
import { DBEvent } from "../types";  // 👈 import custom type

export default function EventsPage() {
  const [events, setEvents] = useState<DBEvent[]>([]); // 👈 explicitly use DBEvent[]

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select("id, title, date")
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching events:", error);
    } else {
      setEvents(data as DBEvent[]); // 👈 cast to DBEvent[]
    }
  }

  async function deleteEvent(id: string) {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      console.error("Error deleting event:", error);
    } else {
      setEvents(events.filter((ev) => ev.id !== id));
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">📅 Events</h1>
      <ul>
        {events.map((ev) => (
          <li key={ev.id} className="mb-3">
            <strong>{ev.title}</strong> – {new Date(ev.date).toDateString()}
            <Link href={`/edit/${ev.id}`} className="ml-3 text-blue-600">
              ✏️ Edit
            </Link>
            <button
              onClick={() => deleteEvent(ev.id)}
              className="ml-3 text-red-600"
            >
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
