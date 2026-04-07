
import { useState } from "react";
import { getLeaders } from "../repositories/leaderRepo";
import { LeaderForm } from "../components/form/LeaderForm";
import type { Leadership } from "../types/Leader";

// this is the main component for the Organization page
export const Organization = () => {
  const [leaders, setLeaders] = useState<Leadership[]>(getLeaders());

  return (
    <main id="organization-page">
      <section className="organization-section">
        <h2>Leadership & Management</h2>
        <div className="organization-list">
          {leaders.map((member: Leadership) => (
            <div key={`${member.firstName}-${member.lastName}`} className="employee-item">
              <div className="employee-info">
                <h3>{member.firstName} {member.lastName}</h3>
              </div>
              <div className="employee-role">
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <LeaderForm onLeaderAdded={setLeaders} />
    </main>
  );
};
