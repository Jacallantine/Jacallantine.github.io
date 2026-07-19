"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  Clock3,
  Flower2,
  Gamepad2,
  Heart,
  PartyPopper,
  Popcorn,
  Send,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { useMemo, useState } from "react";

const activities = [
  {
    id: "dinner",
    title: "Dinner date",
    note: "Dress cute, eat well",
    icon: UtensilsCrossed,
  },
  {
    id: "picnic",
    title: "Picnic",
    note: "Blanket, snacks, sunset",
    icon: Flower2,
  },
  {
    id: "arcade",
    title: "Arcade night",
    note: "Winner gets bragging rights",
    icon: Gamepad2,
  },
  {
    id: "movie",
    title: "Movie + snacks",
    note: "Your pick, obviously",
    icon: Popcorn,
  },
  {
    id: "adventure",
    title: "Little adventure",
    note: "We go somewhere new",
    icon: Sparkles,
  },
  {
    id: "surprise",
    title: "Surprise me",
    note: "I plan the whole thing",
    icon: Heart,
  },
];

const noMessages = [
  "Wait… that button looks suspicious.",
  "Nice try, pretty girl 😌",
  "I think you meant the pink button.",
  "The ‘no’ button is feeling shy.",
  "Okay, okay — just say yes already 💗",
];

export default function Home() {
  const [selectedActivity, setSelectedActivity] = useState("dinner");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [formMessage, setFormMessage] = useState("");
  const [sendStatus, setSendStatus] = useState("idle");

  const activity = useMemo(
    () => activities.find((item) => item.id === selectedActivity),
    [selectedActivity]
  );

  const moveNoButton = () => {
    const attempt = noAttempts + 1;
    const angle = attempt * 2.17;
    const x = Math.cos(angle) * (55 + (attempt % 3) * 16);
    const y = Math.sin(angle) * (20 + (attempt % 2) * 16);
    setNoAttempts(attempt);
    setNoPosition({ x, y });
  };

  const handleAccept = async () => {
    if (!date || !time) {
      setFormMessage("Pick a day and time first, cutie 💌");
      document.getElementById("date-picker")?.focus();
      return;
    }

    setFormMessage("");
    setAccepted(true);
    setSendStatus("sending");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          time,
          activity: activity.title,
          note,
        }),
      });
      setSendStatus(response.ok ? "sent" : "fallback");
    } catch {
      setSendStatus("fallback");
    }
  };

  const prettyDate = date
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }).format(new Date(`${date}T12:00:00`))
    : "our date";

  const prettyTime = time
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(`2026-01-01T${time}:00`))
    : "the perfect time";

  const mailSubject = encodeURIComponent("I said YES to our date 💗");
  const mailBody = encodeURIComponent(
    `It's a date!\n\nDate: ${prettyDate}\nTime: ${prettyTime}\nPlan: ${activity.title}${
      note ? `\nNote: ${note}` : ""
    }`
  );

  return (
    <main className="love-page">
      <div className="paper-noise" aria-hidden="true" />
      <div className="floating-heart heart-one" aria-hidden="true">♥</div>
      <div className="floating-heart heart-two" aria-hidden="true">♥</div>
      <div className="floating-heart heart-three" aria-hidden="true">♥</div>

      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.section
            key="invitation"
            className="invitation-shell"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45 }}
          >
            <header className="love-header">
              <div className="tiny-label">
                <Heart size={14} fill="currentColor" />
                a very important question
              </div>
              <h1>Will you go on a<br /><em>little date</em> with me?</h1>
              <p>
                I’ll bring the good company. You just pick when and what sounds fun.
              </p>
              <div className="love-note" aria-hidden="true">
                <span>made with</span>
                <Heart size={18} fill="currentColor" />
                <span>just for you</span>
              </div>
            </header>

            <div className="planner-card">
              <div className="planner-heading">
                <span>01</span>
                <div>
                  <h2>Choose our adventure</h2>
                  <p>There are no wrong answers here.</p>
                </div>
              </div>

              <div className="activity-grid" role="radiogroup" aria-label="Date activity">
                {activities.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedActivity === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`activity-card ${isSelected ? "selected" : ""}`}
                      onClick={() => setSelectedActivity(item.id)}
                    >
                      <span className="activity-icon"><Icon size={21} /></span>
                      <span className="activity-copy">
                        <strong>{item.title}</strong>
                        <small>{item.note}</small>
                      </span>
                      <span className="check-dot" aria-hidden="true">
                        {isSelected && <Check size={13} strokeWidth={3} />}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="soft-divider" />

              <div className="planner-heading compact">
                <span>02</span>
                <div>
                  <h2>Save the date</h2>
                  <p>Choose a day that belongs to us.</p>
                </div>
              </div>

              <div className="date-row">
                <label className="field-label" htmlFor="date-picker">
                  <span><CalendarDays size={16} /> Date</span>
                  <input
                    id="date-picker"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                </label>
                <label className="field-label" htmlFor="time-picker">
                  <span><Clock3 size={16} /> Time</span>
                  <input
                    id="time-picker"
                    type="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                  />
                </label>
              </div>

              <label className="field-label note-field" htmlFor="date-note">
                <span>A tiny note <small>(optional)</small></span>
                <textarea
                  id="date-note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Dessert is non-negotiable..."
                  maxLength={180}
                />
              </label>

              {formMessage && <p className="form-message" role="alert">{formMessage}</p>}

              <div className="answer-zone">
                <p>{noAttempts ? noMessages[(noAttempts - 1) % noMessages.length] : "So… what do you say?"}</p>
                <div className="answer-buttons">
                  <motion.button
                    type="button"
                    className="yes-button"
                    onClick={handleAccept}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Yes, it’s a date <Heart size={18} fill="currentColor" />
                  </motion.button>
                  <motion.button
                    type="button"
                    className="no-button"
                    aria-label="No (this playful button scoots away)"
                    animate={noPosition}
                    transition={{ type: "spring", stiffness: 420, damping: 24 }}
                    onPointerEnter={moveNoButton}
                    onClick={moveNoButton}
                  >
                    No
                  </motion.button>
                </div>
              </div>
            </div>

            <p className="footer-whisper">P.S. I already knew you’d say yes.</p>
          </motion.section>
        ) : (
          <motion.section
            key="accepted"
            className="celebration-card"
            initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            <motion.div
              className="celebration-icon"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <PartyPopper size={36} />
            </motion.div>
            <p className="tiny-label centered"><Heart size={14} fill="currentColor" /> it’s official</p>
            <h1>Yay! It’s a date.</h1>
            <p className="celebration-subtitle">Best decision you’ve made all day, if you ask me.</p>

            <div className="date-ticket">
              <div className="ticket-top">
                <span>OUR LITTLE DATE</span>
                <span>ADMIT TWO</span>
              </div>
              <div className="ticket-main">
                <div>
                  <small>WHEN</small>
                  <strong>{prettyDate}</strong>
                  <span>{prettyTime}</span>
                </div>
                <div>
                  <small>THE PLAN</small>
                  <strong>{activity.title}</strong>
                  <span>{activity.note}</span>
                </div>
              </div>
              {note && <p className="ticket-note">“{note}”</p>}
            </div>

            <div className="send-note" aria-live="polite">
              {sendStatus === "sending" && "Sealing the plan with a kiss…"}
              {sendStatus === "sent" && "Perfect — I’ve been notified. See you then 💗"}
              {sendStatus === "fallback" && "One last tap sends me the details:"}
            </div>

            {sendStatus === "fallback" && (
              <a
                className="send-plan-button"
                href={`mailto:jacallantine@crimson.ua.edu?subject=${mailSubject}&body=${mailBody}`}
              >
                Send me our plan <Send size={17} />
              </a>
            )}

            <button type="button" className="edit-plan-button" onClick={() => setAccepted(false)}>
              Change the plan
            </button>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
