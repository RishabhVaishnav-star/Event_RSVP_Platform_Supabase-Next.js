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
├── edit/[id]/page.tsx # Edit event (optional bonus)
utils/
└── supabaseClient.ts # Supabase client setup
types.ts # Shared DBEvent type
