import React, { useEffect, useRef } from "react";
import "./Team.css";
import Button from "../Button/Button";
import teamMembers from '../../data/teamData';

const Team = () => {
  const scrollContainer = useRef(null);

  // Function to continuously scroll horizontally
  const scrollHorizontally = () => {
    if (scrollContainer.current) {
      const step = () => {
        scrollContainer.current.scrollLeft += 1; 
        if (scrollContainer.current.scrollLeft >= scrollContainer.current.scrollWidth / 2) {
          scrollContainer.current.scrollLeft = 0;
        }
        requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    }
  };

  useEffect(() => {
    scrollHorizontally();
  }, []);

  // Duplicate team members for a continuous effect
  const allMembers = [...teamMembers, ...teamMembers];

  return (
    <div className="team-component">
      <div className="head-title">
				<h2 className="heading">
					Our <span className="heading">Team</span>
				</h2>
				<p>
					Our team of talented and open-minded individuals makes Study Crew one of the most diverse sets of
					collaborators in the world.
				</p>
			</div>
      <div className="bg">
        <div className="team-cards" ref={scrollContainer}>
          {allMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <img src={member.avatar} alt={member.name} />
              <h5>{member.name}</h5>
              <p className="role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="join-team-section">
        <p>Interested in becoming part of our team?</p>
        <Button className="join-team-button">Join Us</Button>
      </div>
    </div>
  );
};

export default Team;