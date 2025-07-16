create table art (
  contentId UUID PRIMARY KEY REFERENCES content(id) ON DELETE CASCADE,
  coverImage TEXT,
  timeToCreate TEXT,
  technique TEXT,
  medium TEXT,
  difficulty TEXT,
  content TEXT,
  booking_name TEXT,
  booking_address TEXT,
  booking_hours TEXT,
  booking_phone TEXT,
  booking_email TEXT,
  booking_url TEXT,
  booking_lat DOUBLE PRECISION,
  booking_long DOUBLE PRECISION
)