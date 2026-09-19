import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  CheckCircle2,
  CalendarDays,
  Clock3,
  ArrowRight,
} from "lucide-react";

import "./BookCall.css";

/* =========================================================
   TIME SLOTS
========================================================= */

const TIME_SLOTS = [
  {
    label: "10:00 AM",
    hour: 10,
    minute: 0,
  },
  {
    label: "2:30 PM",
    hour: 14,
    minute: 30,
  },
  {
    label: "4:00 PM",
    hour: 16,
    minute: 0,
  },
  {
    label: "6:00 PM",
    hour: 18,
    minute: 0,
  },
];

const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

/* =========================================================
   DATE HELPERS
========================================================= */

const startOfDay = (date) => {
  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  return result;
};

const formatDateKey = (date) => {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const isSameDay = (date1, date2) => {
  return (
    formatDateKey(date1) ===
    formatDateKey(date2)
  );
};

const createFiveDates = () => {
  const today = startOfDay(new Date());

  return Array.from(
    { length: 5 },
    (_, index) => {
      const date = new Date(today);

      date.setDate(
        today.getDate() + index
      );

      return date;
    }
  );
};

/* =========================================================
   CHECK WHETHER TIME HAS EXPIRED
========================================================= */

const isTimeExpired = (
  date,
  hour,
  minute
) => {
  const now = new Date();

  /*
   * Future dates:
   * time is always available.
   */
  if (!isSameDay(date, now)) {
    return false;
  }

  /*
   * Today's time slots:
   * compare with current time.
   */
  const slotTime = new Date(date);

  slotTime.setHours(
    hour,
    minute,
    0,
    0
  );

  return slotTime <= now;
};

/* =========================================================
   COMPONENT
========================================================= */

const BookCall = () => {
  /* =======================================================
     EXACTLY 5 DATES
  ======================================================= */

  const availableDates = useMemo(
    () => createFiveDates(),
    []
  );

  /* =======================================================
     STATES
  ======================================================= */

  const [selectedDate, setSelectedDate] =
    useState(availableDates[0]);

  const [selectedTime, setSelectedTime] =
    useState(null);

  const [termsAccepted, setTermsAccepted] =
    useState(false);

  /*
   * Used only to refresh the disabled time slots
   * while the user keeps the page open.
   */
  const [, setCurrentTime] =
    useState(new Date());

  /* =======================================================
     REFRESH TIME EVERY 30 SECONDS
  ======================================================= */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  /* =======================================================
     CHANGE DATE
  ======================================================= */

  const handleDateChange = (date) => {
    setSelectedDate(date);

    /*
     * If selected time is no longer available
     * for the newly selected date, clear it.
     */
    if (selectedTime) {
      const selectedSlot =
        TIME_SLOTS.find(
          (slot) =>
            slot.label === selectedTime
        );

      if (
        selectedSlot &&
        isTimeExpired(
          date,
          selectedSlot.hour,
          selectedSlot.minute
        )
      ) {
        setSelectedTime(null);
      }
    }
  };

  /* =======================================================
     CHANGE TIME
  ======================================================= */

  const handleTimeChange = (slot) => {
    const expired = isTimeExpired(
      selectedDate,
      slot.hour,
      slot.minute
    );

    if (expired) {
      return;
    }

    setSelectedTime(slot.label);
  };

  /* =======================================================
     OPEN TERMS PAGE
  ======================================================= */

  const handleTermsClick = () => {
    window.open(
      "/terms-and-conditions",
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =======================================================
     BOOK SESSION
  ======================================================= */

  const handleBookSession = () => {
    /*
     * Safety check.
     * Button is already disabled unless both
     * conditions are satisfied.
     */
    if (!selectedTime || !termsAccepted) {
      return;
    }

    /*
     * Change this later to your actual
     * booking/payment page if required.
     */
    window.location.href =
      "/terms-and-conditions";
  };

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <section className="book-call-section">

      <div className="book-call-container">

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="book-call-content">

          <h1>
            A Small Fee. A Serious
            <br />
            Conversation.
          </h1>

          {/* TRUST */}
          <div className="book-call-trust">

            <Users
              size={17}
              strokeWidth={2.5}
            />

            <span>
              Trusted by 500+ students so far
            </span>

          </div>

          {/* DESCRIPTION */}
          <p className="book-call-description">
            Why ₹99, not free? A nominal fee
            filters for students who are
            genuinely serious, allowing our
            mentors to give their full,
            undistracted attention rather than
            rushing through high-volume,
            low-commitment calls.
          </p>

          {/* INCLUDED */}
          <h3>
            What's included in your session:
          </h3>

          <div className="book-call-features">

            <div className="book-call-feature">

              <CheckCircle2 />

              <span>
                A real assessment of your current
                resume/profile against your target
                role
              </span>

            </div>

            <div className="book-call-feature">

              <CheckCircle2 />

              <span>
                A personalized first-draft roadmap
                you keep regardless of whether you
                continue with ProJenius
              </span>

            </div>

            <div className="book-call-feature">

              <CheckCircle2 />

              <span>
                Direct, honest feedback on your
                biggest current gap
              </span>

            </div>

            <div className="book-call-feature">

              <CheckCircle2 />

              <span>
                A clear recommendation on next
                steps — including telling you
                honestly if ProJenius isn't the
                right fit for you
              </span>

            </div>

          </div>

          {/* INFO PILLS */}
          <div className="book-call-pills">

            <div className="book-call-pill book-call-pill-wide">

              <ArrowRight />

              <strong>
                ₹99 (fully refundable if you're
                not satisfied)
              </strong>

            </div>

            <div className="book-call-pill">

              <Clock3 />

              <strong>
                30 Minutes
              </strong>

            </div>

            <div className="book-call-pill book-call-pill-wide">

              <Users />

              <strong>
                1:1 With a Real Mentor,
                Not a Sales Rep
              </strong>

            </div>

            <div className="book-call-pill">

              <CalendarDays />

              <strong>
                Credited toward program fee
                if enrolled
              </strong>

            </div>

          </div>

        </div>

        {/* =================================================
            RIGHT BOOKING CARD
        ================================================= */}

        <div className="book-call-card">

          {/* HEADER */}
          <div className="book-call-card-header">

            <h2>
              Book a Call – ₹99
            </h2>

          </div>

          {/* BODY */}
          <div className="book-call-card-body">

            {/* CALENDAR ICON */}
            <div className="book-call-calendar-icon">

              <CalendarDays
                size={40}
                strokeWidth={1.7}
              />

            </div>

            <h3>
              Select a Date & Time
            </h3>

            <p className="book-call-subtitle">
              Choose a convenient slot for
              your mentoring session.
            </p>

            {/* =================================================
                DATE SELECTOR
            ================================================= */}

            <div className="book-call-dates">

              {availableDates.map(
                (date) => {

                  const active =
                    isSameDay(
                      date,
                      selectedDate
                    );

                  const today =
                    isSameDay(
                      date,
                      new Date()
                    );

                  return (
                    <button
                      type="button"
                      key={formatDateKey(date)}
                      className={`book-call-date ${
                        active
                          ? "book-call-date-active"
                          : ""
                      }`}
                      onClick={() =>
                        handleDateChange(date)
                      }
                    >

                      <span>
                        {today
                          ? "Today"
                          : WEEK_DAYS[
                              date.getDay()
                            ]}
                      </span>

                      <strong>
                        {date.getDate()}
                      </strong>

                    </button>
                  );
                }
              )}

            </div>

            {/* =================================================
                TIME SELECTOR
            ================================================= */}

            <div className="book-call-times">

              {TIME_SLOTS.map(
                (slot) => {

                  const expired =
                    isTimeExpired(
                      selectedDate,
                      slot.hour,
                      slot.minute
                    );

                  const active =
                    selectedTime ===
                    slot.label;

                  return (
                    <button
                      type="button"
                      key={slot.label}
                      disabled={expired}
                      className={`
                        book-call-time
                        ${
                          active
                            ? "book-call-time-active"
                            : ""
                        }
                        ${
                          expired
                            ? "book-call-time-disabled"
                            : ""
                        }
                      `}
                      onClick={() =>
                        handleTimeChange(
                          slot
                        )
                      }
                    >
                      {slot.label}
                    </button>
                  );
                }
              )}

            </div>

            {/* =================================================
                SELECTION MESSAGE
            ================================================= */}

            {!selectedTime && (
              <p className="book-call-selection-message">
                Select an available date and
                time to continue.
              </p>
            )}

            {selectedTime && (
              <div className="book-call-selected">

                <CheckCircle2
                  size={17}
                />

                <span>
                  Selected:{" "}
                  <strong>
                    {selectedTime}
                  </strong>
                </span>

              </div>
            )}

            {/* =================================================
                QUOTE
            ================================================= */}

            <div className="book-call-quote">

              <p>
                "A focused conversation can save
                you months of going in the wrong
                direction."
              </p>

              <strong>
                — ProJenius Mentor Team
              </strong>

            </div>

            {/* =================================================
                BOOK BUTTON
            ================================================= */}

            <button
              type="button"
              className="book-call-button"
              disabled={
                !selectedTime ||
                !termsAccepted
              }
              onClick={
                handleBookSession
              }
            >

              Book Your Session

              <ArrowRight
                size={20}
              />

            </button>

            {/* =================================================
                TERMS CHECKBOX
            ================================================= */}

            <div className="book-call-terms-box">

              <label className="book-call-terms-check">

                <input
                  type="checkbox"
                  checked={
                    termsAccepted
                  }
                  onChange={(event) =>
                    setTermsAccepted(
                      event.target.checked
                    )
                  }
                />

                <span className="book-call-custom-check"></span>

                <span className="book-call-terms-text">

                  I have read and agree to the{" "}

                  <button
                    type="button"
                    onClick={
                      handleTermsClick
                    }
                  >
                    Terms & Conditions
                  </button>

                  .

                </span>

              </label>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default BookCall;