import React, { useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function toKey(date) {
  return date.toISOString().slice(0, 10);
}

/**
 * Dark side-panel calendar that highlights days covered by bookings,
 * mirroring the booking calendar panel used in reference host dashboards.
 */
function BookingCalendarPanel({ bookings = [] }) {
  const [cursor, setCursor] = useState(startOfMonth(new Date()));

  const bookedDays = useMemo(() => {
    const map = new Map();
    bookings.forEach((booking) => {
      if (booking.cancelled) return;
      const checkIn = new Date(booking.checkInDate);
      const checkOut = new Date(booking.checkOutDate);
      if (isNaN(checkIn) || isNaN(checkOut)) return;

      const now = new Date();
      const status =
        checkIn <= now && checkOut >= now
          ? "current"
          : checkIn > now
          ? "upcoming"
          : "completed";

      const cur = new Date(checkIn);
      while (cur <= checkOut) {
        map.set(toKey(cur), status);
        cur.setDate(cur.getDate() + 1);
      }
    });
    return map;
  }, [bookings]);

  const weeks = useMemo(() => {
    const first = startOfMonth(cursor);
    const firstWeekday = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(
      cursor.getFullYear(),
      cursor.getMonth() + 1,
      0
    ).getDate();

    const cells = [];
    for (let i = 0; i < firstWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    }
    while (cells.length % 7 !== 0) cells.push(null);

    const rows = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [cursor]);

  const monthLabel = cursor.toLocaleDateString("en-NZ", {
    month: "long",
    year: "numeric"
  });

  return (
    <div className="bcal-panel">
      <style>{BOOKING_CALENDAR_CSS}</style>

      <div className="bcal-header">
        <div className="bcal-title">Booking calendar</div>
        <div className="bcal-nav">
          <button
            onClick={() =>
              setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
            }
          >
            <FaChevronLeft />
          </button>
          <span>{monthLabel}</span>
          <button
            onClick={() =>
              setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
            }
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="bcal-grid bcal-grid-labels">
        {DAY_LABELS.map((label, i) => (
          <div key={i} className="bcal-day-label">
            {label}
          </div>
        ))}
      </div>

      {weeks.map((week, wi) => (
        <div className="bcal-grid" key={wi}>
          {week.map((day, di) => {
            if (!day) return <div key={di} className="bcal-cell empty" />;
            const status = bookedDays.get(toKey(day));
            return (
              <div
                key={di}
                className={`bcal-cell ${status ? `booked-${status}` : ""}`}
              >
                {day.getDate()}
              </div>
            );
          })}
        </div>
      ))}

      <div className="bcal-legend">
        <span>
          <i className="dot upcoming" /> Upcoming
        </span>
        <span>
          <i className="dot current" /> Current
        </span>
        <span>
          <i className="dot completed" /> Completed
        </span>
      </div>
    </div>
  );
}

export const BOOKING_CALENDAR_CSS = `
  .bcal-panel {
    background: linear-gradient(180deg, #22453a 0%, #16241d 100%);
    border-radius: 18px;
    padding: 1.5rem;
    color: #fff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .bcal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .bcal-title {
    font-weight: 700;
    letter-spacing: 0.02rem;
  }

  .bcal-nav {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
    color: rgba(255,255,255,0.85);
  }

  .bcal-nav button {
    background: rgba(255,255,255,0.08);
    border: none;
    color: white;
    width: 26px;
    height: 26px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .bcal-nav button:hover {
    background: rgba(255,255,255,0.18);
  }

  .bcal-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: 4px;
  }

  .bcal-day-label {
    text-align: center;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.5);
    font-weight: 600;
    padding-bottom: 6px;
  }

  .bcal-cell {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    border-radius: 8px;
    color: rgba(255,255,255,0.75);
  }

  .bcal-cell.empty {
    visibility: hidden;
  }

  .bcal-cell.booked-upcoming {
    background: rgba(193, 98, 45, 0.85);
    color: white;
    font-weight: 600;
  }

  .bcal-cell.booked-current {
    background: #3fae72;
    color: white;
    font-weight: 700;
  }

  .bcal-cell.booked-completed {
    background: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.6);
  }

  .bcal-legend {
    display: flex;
    gap: 1rem;
    margin-top: 1.25rem;
    flex-wrap: wrap;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.75);
  }

  .bcal-legend span {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    display: inline-block;
  }

  .dot.upcoming { background: #C1622D; }
  .dot.current { background: #3fae72; }
  .dot.completed { background: rgba(255,255,255,0.4); }
`;

export default BookingCalendarPanel;
