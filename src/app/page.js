"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  Clock3,
  Flower2,
  Gamepad2,
  Heart,
  MailOpen,
  MapPin,
  PartyPopper,
  Popcorn,
  Send,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { useMemo, useState } from "react";

const activities = [
  { id: "dinner", title: "Dinner date", note: "Dress cute, eat well", icon: UtensilsCrossed, tone: "rose" },
  { id: "picnic", title: "Picnic", note: "Snacks and a sunset", icon: Flower2, tone: "peach" },
  { id: "arcade", title: "Arcade night", note: "Winner gets bragging rights", icon: Gamepad2, tone: "lilac" },
  { id: "movie", title: "Movie night", note: "Your pick, obviously", icon: Popcorn, tone: "butter" },
  { id: "adventure", title: "Adventure", note: "Somewhere new together", icon: MapPin, tone: "mint" },
  { id: "surprise", title: "Surprise me", note: "I plan the whole thing", icon: Sparkles, tone: "pink" },
];

const noMessages = [
  "That button is a little shy.",
  "Nice try, pretty girl.",
  "I think you meant the pink one.",
  "Nope, still not an option.",
  "Okay, just say yes already!",
];

const stepCopy = ["Invitation", "The plan", "The when", "A little note", "The question"];

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 52 : -52, opacity: 0, scale: 0.985 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction) => ({ x: direction > 0 ? -52 : 52, opacity: 0, scale: 0.985 }),
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState("dinner");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [inviteNoAttempts, setInviteNoAttempts] = useState(0);
  const [inviteNoPosition, setInviteNoPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [sendStatus, setSendStatus] = useState("idle");

  const activity = useMemo(
    () => activities.find((item) => item.id === selectedActivity),
    [selectedActivity]
  );

  const prettyDate = date
    ? new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(
        new Date(`${date}T12:00:00`)
      )
    : "Pick a day";

  const prettyTime = time
    ? new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(
        new Date(`2026-01-01T${time}:00`)
      )
    : "Pick a time";

  const goTo = (nextStep) => {
    setDirection(nextStep > step ? 1 : -1);
    setFormMessage("");
    setStep(nextStep);
  };

  const continueFromSchedule = () => {
    if (!date || !time) {
      setFormMessage("Choose a day and time for us first.");
      return;
    }
    goTo(3);
  };

  const moveNoButton = () => {
    const attempt = noAttempts + 1;
    const angle = attempt * 2.38;
    setNoAttempts(attempt);
    setNoPosition({
      x: Math.cos(angle) * (38 + (attempt % 2) * 16),
      y: Math.sin(angle) * (11 + (attempt % 3) * 5),
    });
  };

  const moveInviteDecline = () => {
    const attempt = inviteNoAttempts + 1;
    const angle = attempt * 2.41;
    setInviteNoAttempts(attempt);
    setInviteNoPosition({
      x: Math.cos(angle) * (42 + (attempt % 2) * 14),
      y: Math.sin(angle) * 9,
    });
  };

  const acceptDate = async () => {
    goTo(5);
    setSendStatus("sending");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, activity: activity.title, note }),
      });
      setSendStatus(response.ok ? "sent" : "fallback");
    } catch {
      setSendStatus("fallback");
    }
  };

  const mailSubject = encodeURIComponent("I said YES to our date! 💗");
  const mailBody = encodeURIComponent(
    `It's a date!\n\nDate: ${prettyDate}\nTime: ${prettyTime}\nPlan: ${activity.title}${note ? `\nNote: ${note}` : ""}`
  );

  return (
    <main className="app-background">
      <div className="ambient-orb orb-one" aria-hidden="true" />
      <div className="ambient-orb orb-two" aria-hidden="true" />

      <section className="mobile-app" aria-label="Date invitation app">
        <div className="app-grain" aria-hidden="true" />

        {step < 5 && (
          <header className="app-topbar">
            <button
              type="button"
              className={`back-button ${step === 0 ? "invisible" : ""}`}
              onClick={() => step > 0 && goTo(step - 1)}
              aria-label="Go back"
              tabIndex={step === 0 ? -1 : 0}
            >
              <ChevronLeft size={21} />
            </button>

            <div className="progress-wrap">
              <span>{stepCopy[step]}</span>
              <div className="progress-track" aria-label={`Step ${step + 1} of 5`}>
                {[0, 1, 2, 3, 4].map((item) => (
                  <motion.i
                    key={item}
                    className={item <= step ? "active" : ""}
                    animate={{ scale: item === step ? 1.08 : 1 }}
                  />
                ))}
              </div>
            </div>

            <span className="top-heart" aria-hidden="true"><Heart size={18} fill="currentColor" /></span>
          </header>
        )}

        <div className="stage-viewport">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 0 && (
              <Stage key="welcome" direction={direction} className="welcome-stage">
                <div className="welcome-art" aria-hidden="true">
                  <motion.span
                    className="orbit-heart orbit-one"
                    animate={{ y: [0, -8, 0], rotate: [-8, 4, -8] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                  ><Heart size={20} fill="currentColor" /></motion.span>
                  <motion.span
                    className="orbit-heart orbit-two"
                    animate={{ y: [0, 7, 0], rotate: [8, -5, 8] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                  ><Heart size={14} fill="currentColor" /></motion.span>
                  <motion.div
                    className="envelope"
                    initial={{ scale: 0.75, rotate: -8 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 150, damping: 14 }}
                  >
                    <MailOpen size={46} strokeWidth={1.6} />
                    <span><Heart size={24} fill="currentColor" /></span>
                  </motion.div>
                </div>
                <p className="eyebrow">A tiny something for you</p>
                <h1>You have a<br /><em>love note.</em></h1>
                <p className="stage-subtitle">It comes with one very important question and a promise of a really cute date.</p>
                <div className="signature-line"><span /> made just for you <span /></div>
                <p className="invite-decline-message" aria-live="polite">
                  {inviteNoAttempts
                    ? noMessages[(inviteNoAttempts - 1) % noMessages.length]
                    : "You can try to decline… if you’re quick."}
                </p>
                <div className="bottom-action invite-actions">
                  <motion.button
                    type="button"
                    className="invite-primary"
                    onClick={() => goTo(1)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Open my invitation <ArrowRight size={19} />
                  </motion.button>
                  <motion.button
                    type="button"
                    className="welcome-decline"
                    aria-label="Decline (this playful button scoots away)"
                    animate={inviteNoPosition}
                    transition={{ type: "spring", stiffness: 430, damping: 23 }}
                    onPointerEnter={moveInviteDecline}
                    onClick={moveInviteDecline}
                  >
                    Decline
                  </motion.button>
                </div>
              </Stage>
            )}

            {step === 1 && (
              <Stage key="activity" direction={direction}>
                <StageHeading kicker="First things first" title="What should we do?" subtitle="Pick your favorite. I’ll handle the rest." />
                <div className="activity-list" role="radiogroup" aria-label="Choose a date activity">
                  {activities.map((item, index) => {
                    const Icon = item.icon;
                    const selected = item.id === selectedActivity;
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        className={`activity-option ${selected ? "selected" : ""}`}
                        onClick={() => setSelectedActivity(item.id)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.045 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className={`option-icon ${item.tone}`}><Icon size={23} /></span>
                        <span className="option-copy"><strong>{item.title}</strong><small>{item.note}</small></span>
                        <span className="select-ring">{selected && <Check size={14} strokeWidth={3} />}</span>
                      </motion.button>
                    );
                  })}
                </div>
                <BottomAction onClick={() => goTo(2)}>That’s the one <ArrowRight size={19} /></BottomAction>
              </Stage>
            )}

            {step === 2 && (
              <Stage key="schedule" direction={direction}>
                <StageHeading kicker="Perfect choice" title="When are you free?" subtitle="Choose a day and time that belongs to us." />
                <div className="schedule-card">
                  <label className="big-input" htmlFor="date-picker">
                    <span className="input-icon"><CalendarDays size={22} /></span>
                    <span className="input-copy"><small>OUR DAY</small><strong>{prettyDate}</strong></span>
                    <input id="date-picker" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                  </label>
                  <div className="input-divider" />
                  <label className="big-input" htmlFor="time-picker">
                    <span className="input-icon peach"><Clock3 size={22} /></span>
                    <span className="input-copy"><small>MEET ME AT</small><strong>{prettyTime}</strong></span>
                    <input id="time-picker" type="time" value={time} onChange={(event) => setTime(event.target.value)} />
                  </label>
                </div>
                <motion.div className="mini-plan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                  <span className={`option-icon ${activity.tone}`}><activity.icon size={20} /></span>
                  <div><small>THE PLAN SO FAR</small><strong>{activity.title}</strong></div>
                  <Heart size={16} fill="currentColor" />
                </motion.div>
                {formMessage && <p className="form-message" role="alert">{formMessage}</p>}
                <BottomAction onClick={continueFromSchedule}>Save our date <ArrowRight size={19} /></BottomAction>
              </Stage>
            )}

            {step === 3 && (
              <Stage key="note" direction={direction}>
                <StageHeading kicker="Almost there" title="Any special requests?" subtitle="Leave me a hint, a demand, or a sweet little note." />
                <label className="note-card" htmlFor="date-note">
                  <span>Dear handsome,</span>
                  <textarea
                    id="date-note"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    placeholder="Dessert is non-negotiable..."
                    maxLength={180}
                    autoFocus
                  />
                  <small>{note.length}/180</small>
                </label>
                <div className="note-prompts">
                  {["Pick me up 💗", "I want dessert", "Make it a surprise"].map((prompt) => (
                    <button key={prompt} type="button" onClick={() => setNote(prompt)}>{prompt}</button>
                  ))}
                </div>
                <p className="skip-copy">You can leave it blank. I already know the main request: spend time with you.</p>
                <BottomAction onClick={() => goTo(4)}>{note ? "Seal my note" : "Skip for now"} <ArrowRight size={19} /></BottomAction>
              </Stage>
            )}

            {step === 4 && (
              <Stage key="question" direction={direction} className="question-stage">
                <motion.div
                  className="question-heart"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                ><Heart size={34} fill="currentColor" /></motion.div>
                <p className="eyebrow">One last thing</p>
                <h1>Will you go on this<br /><em>little date</em> with me?</h1>
                <div className="review-ticket">
                  <div><span className={`option-icon ${activity.tone}`}><activity.icon size={20} /></span><p><small>WHAT</small><strong>{activity.title}</strong></p></div>
                  <div><span className="option-icon rose"><CalendarDays size={20} /></span><p><small>WHEN</small><strong>{prettyDate} · {prettyTime}</strong></p></div>
                </div>
                <p className="no-message">{noAttempts ? noMessages[(noAttempts - 1) % noMessages.length] : "Choose wisely, pretty girl."}</p>
                <div className="final-actions">
                  <motion.button type="button" className="yes-button" onClick={acceptDate} whileTap={{ scale: 0.97 }}>
                    Yes, it’s a date <Heart size={19} fill="currentColor" />
                  </motion.button>
                  <motion.button
                    type="button"
                    className="no-button"
                    aria-label="No (this playful button scoots away)"
                    animate={noPosition}
                    transition={{ type: "spring", stiffness: 430, damping: 23 }}
                    onPointerEnter={moveNoButton}
                    onClick={moveNoButton}
                  >No</motion.button>
                </div>
              </Stage>
            )}

            {step === 5 && (
              <Stage key="celebration" direction={direction} className="celebration-stage">
                <div className="celebration-burst" aria-hidden="true">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
                    <motion.i
                      key={item}
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                      animate={{
                        x: Math.cos((item / 8) * Math.PI * 2) * 88,
                        y: Math.sin((item / 8) * Math.PI * 2) * 72,
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0.7],
                      }}
                      transition={{ duration: 1.1, delay: 0.15 + item * 0.035 }}
                    >♥</motion.i>
                  ))}
                  <motion.span initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", delay: 0.12 }}>
                    <PartyPopper size={40} />
                  </motion.span>
                </div>
                <p className="eyebrow">It’s official</p>
                <h1>Yay! It’s<br /><em>a date.</em></h1>
                <p className="stage-subtitle">Best decision you’ve made all day, if you ask me.</p>
                <div className="date-pass">
                  <div className="pass-label"><span>OUR LITTLE DATE</span><span>ADMIT TWO</span></div>
                  <div className="pass-row"><small>WHEN</small><strong>{prettyDate}</strong><span>{prettyTime}</span></div>
                  <div className="pass-row"><small>THE PLAN</small><strong>{activity.title}</strong><span>{activity.note}</span></div>
                  {note && <p>“{note}”</p>}
                </div>
                <div className="send-status" aria-live="polite">
                  {sendStatus === "sending" && "Sealing the plan with a kiss…"}
                  {sendStatus === "sent" && "Perfect — I’ve been notified. See you then 💗"}
                  {sendStatus === "fallback" && "One last tap sends me the details:"}
                </div>
                {sendStatus === "fallback" && (
                  <a className="send-plan-button" href={`mailto:jacallantine@crimson.ua.edu?subject=${mailSubject}&body=${mailBody}`}>
                    Send our plan <Send size={17} />
                  </a>
                )}
                <button type="button" className="restart-button" onClick={() => goTo(1)}>Change our plan</button>
              </Stage>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

function Stage({ children, direction, className = "" }) {
  return (
    <motion.div
      className={`stage ${className}`}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function StageHeading({ kicker, title, subtitle }) {
  return (
    <header className="stage-heading">
      <p className="eyebrow">{kicker}</p>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

function BottomAction({ children, onClick }) {
  return (
    <div className="bottom-action">
      <motion.button type="button" onClick={onClick} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        {children}
      </motion.button>
    </div>
  );
}
