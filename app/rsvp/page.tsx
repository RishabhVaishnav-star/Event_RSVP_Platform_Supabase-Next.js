"use client";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

interface MyEvent {
  id: string;
  title: string;
  date: string;
}

export default function RSVPPage() {
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [status, setStatus] = useState<string>("Yes");
  const [userId, setUserId] = useState<string>("");

  // fetch events on load
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
      setEvents(data || []);
    }
  }

  async function submitRSVP() {
    if (!selectedEvent || !userId) {
      alert("Please enter User ID and select an event.");
      return;
    }

    const { error } = await supabase.from("rsvps").insert([
      {
        user_id: userId,
        event_id: selectedEvent,
        status: status,
      },
    ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("✅ RSVP submitted successfully!");
      setSelectedEvent("");
      setStatus("Yes");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">RSVP to an Event</h1>

      {/* User ID */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">User ID</label>
        <input
          type="text"
          placeholder="Enter your user_id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* Event Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Select Event</label>
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="">-- Choose an Event --</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.title} – {new Date(ev.date).toDateString()}
            </option>
          ))}
        </select>
      </div>

      {/* RSVP Status */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">RSVP Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded-lg p-2"
        >
          <option value="Yes">✅ Yes</option>
          <option value="No">❌ No</option>
          <option value="Maybe">🤔 Maybe</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        onClick={submitRSVP}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit RSVP
      </button>
    </div>
  );
}
