
import { useEffect, useState } from "react";
import { getLeaders } from "../repositories/leaderRepo";
import { LeaderForm } from "../components/form/LeaderForm";
import type { Leadership } from "../types/Leader";

// this is the main component for the Organization page
export const Organization = () => {
  const [leaders, setLeaders] = useState<Leadership[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getLeaders()
      .then((loadedLeaders) => {
        if (isMounted) {
          setLeaders(loadedLeaders);
          setLoadError("");
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoadError("Unable to load leaders from the API.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main id="organization-page">
      <section className="organization-section">
        <h2>Leadership & Management</h2>
        {loadError && <div className="error-messages">{loadError}</div>}
        <div className="organization-list">
          {isLoading ? (
            <p>Loading leaders...</p>
          ) : (
            leaders.map((member: Leadership) => (
              <div key={`${member.firstName}-${member.lastName}-${member.role}`} className="employee-item">
                <div className="employee-info">
                  <h3>{member.firstName} {member.lastName}</h3>
                </div>
                <div className="employee-role">
                  <p>{member.role}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <LeaderForm onLeaderAdded={setLeaders} />
    </main>
  );
};
