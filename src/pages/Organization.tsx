import { leadership } from "../data/leadership";
import type { Leadership } from "../types/Leader";


// this is the main component for the Organization page

export const Organization = () => (

  <main id="organization-page">
    <section className="organization-section">
      <h2>Leadership & Management</h2>
      <div className="organization-list">
        {leadership.map((member: Leadership) => (
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
  </main>
);
