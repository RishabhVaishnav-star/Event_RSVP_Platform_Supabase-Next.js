# Event RSVP Platform (Supabase + Next.js)

This is a simple **event management and RSVP platform** built using **Next.js (App Router) and Supabase** as part of the PixaBeam Database Management assessment.

It demonstrates database design, referential integrity, and a minimal frontend that interacts with the backend.

---

## 🚀 Features

- 👤 Users can be stored with unique IDs and emails  
- 📅 Events can be created and linked to users (as creators)  
- ✅ Users can RSVP to events with status **Yes / No / Maybe**  
- 🔗 Referential integrity with **foreign keys + ON DELETE CASCADE**  
- 🌐 Minimal frontend with:
  - Home page → List of upcoming events  
  - RSVP page → Submit RSVP for an event  

---

## 🗄️ Database Schema (Supabase)

### **Users Table**
| Column      | Type      | Constraints                 |
|-------------|----------|-----------------------------|
| id          | UUID     | Primary Key (gen_random_uuid) |
| name        | TEXT     | Not Null                    |
| email       | TEXT     | Unique, Not Null            |
| created_at  | TIMESTAMPTZ | Default: now()            |

### **Events Table**
| Column     | Type      | Constraints                               |
|------------|----------|-------------------------------------------|
| id         | UUID     | Primary Key                               |
| title      | TEXT     | Not Null                                  |
| description| TEXT     |                                           |
| date       | DATE     | Not Null                                  |
| city       | TEXT     |                                           |
| created_by | UUID     | Foreign Key → Users(id), ON DELETE CASCADE |

### **RSVPs Table**
| Column   | Type   | Constraints                                  |
|----------|--------|----------------------------------------------|
| id       | UUID   | Primary Key                                  |
| user_id  | UUID   | Foreign Key → Users(id), ON DELETE CASCADE   |
| event_id | UUID   | Foreign Key → Events(id), ON DELETE CASCADE  |
| status   | TEXT   | Check (status IN ('Yes','No','Maybe'))       |

---

## 📂 Project Structure

app/
├── page.tsx # Homepage – list events
├── rsvp/page.tsx # RSVP page – respond to event
├── edit/[id]/page.tsx # Edit event 
utils/
└── supabaseClient.ts # Supabase client setup
types.ts # Shared DBEvent type

**Database Design Description**

UUIDs for Primary Keys:
I used UUID as the primary key type for all tables (users, events, rsvps). UUIDs ensure globally unique identifiers, avoid collisions, and are safer than sequential integers in distributed systems. Supabase supports UUID generation with the pgcrypto extension.

Timestamps:
Each table includes a created_at timestamp (default NOW()) to automatically track when records were created, useful for auditing and sorting.

Constraints for Data Integrity:

NOT NULL constraints ensure required fields (e.g., name, email, title, date) cannot be left empty.

UNIQUE constraint on email in the users table prevents duplicate user registrations.

Foreign Keys for Relationships:

In the events table, created_by references users(id) to identify the event creator.

In the rsvps table, user_id references users(id) and event_id references events(id), linking RSVPs to both the user and the event.

Referential Integrity (ON DELETE CASCADE):
Foreign keys use ON DELETE CASCADE, meaning if a user or event is deleted, all related rows (events or RSVPs) are also deleted automatically. This prevents orphan records and keeps the database clean.

Normalization:
Data is normalized to avoid redundancy: users are stored once, events reference their creator, and RSVPs form a many-to-many relationship between users and events.

**GitHub repo link** 
https://github.com/RishabhVaishnav-star/pixabeam-events.git

**Vercel app link**
https://pixabeam-events-lemon.vercel.app/
