import { useState, useEffect } from "react";

export default function RSVPForm() {
  const [name, setName] = useState("");
  const [interestedList, setInterestedList] = useState([]);
  const [goingList, setGoingList] = useState([]);
  const [warning, setWarning] = useState("");

  // auto‑dismiss the warning after 3 s
  useEffect(() => {
    if (!warning) return;
    const id = setTimeout(() => setWarning(""), 3000);
    return () => clearTimeout(id);
  }, [warning]);

  const handleClick = (type) => {
    const trimmed = name.trim();
    if (!trimmed) {
      setWarning("Please enter your name first.");
      return;
    }

    const alreadyResponded =
      interestedList.includes(trimmed) || goingList.includes(trimmed);

    if (alreadyResponded) {
      setWarning("You’ve already responded!");
      return;
    }

    if (type === "interested") {
      setInterestedList((prev) => [...prev, trimmed]);
    } else if (type === "going") {
      setGoingList((prev) => [...prev, trimmed]);
    }

    setName("");
    setWarning(""); // clear any previous warning on success
  };

  return (
    <section className="rsvp-wrapper">
      <div className="info">
        <img
          src="https://i.postimg.cc/vHB7cgFy/gunite-pool-with-integrated-landscape-pockets.webp"
          alt="Pool"
          style={{ width: "100%", height: "250px", borderRadius: "8px" }}
        />
        <h2>Pool Party</h2>
        <p>I don’t have a pool—this is just a demo. Hope you’ll cooperate!</p>
      </div>

      <div className="input-row">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
        <button onClick={() => handleClick("interested")}>Interested</button>
        <button onClick={() => handleClick("going")}>Going</button>
      </div>

      {warning && <p className="warning">{warning}</p>}

      <div className="counters">
        <div className="counter interested">
          <span className="count">{interestedList.length}</span>
          <span className="label">Interested</span>
        </div>

        <div className="counter going">
          <span className="count">{goingList.length}</span>
          <span className="label">Going</span>
        </div>
      </div>
      <div className="infos">
        <div className="ingo">
          <ul>
            {goingList.map((n) => (
              <li key={n}>{n},</li>
            ))}
          </ul>
        </div>
        <div className="ininfo">
          <ul>
            {interestedList.map((n) => (
              <li key={n}>{n},</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
