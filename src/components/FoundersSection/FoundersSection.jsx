import React from 'react';
import './FoundersSection.css';


function CombinedLeadershipPage() {
  return (
    <div>
      {/* Founders Section */}
      <section className="founders-section">
        <div className="section-tag">Leadership Team</div>
        <h2 className="section-title">Meet Our Founders</h2>
        <p className="section-description">
          Visionary leaders committed to building the next generation of innovators and
          entrepreneurs.
        </p>

        <div className="founders-cards-container">
          {/* Founder Card 1: Dr. John Smith */}
          <div className="founder-card horizontal">
            {/* Text content on the left */}
            <div className="founder-text-content">
              <h3 className="founder-name">Thiru R.S.K. Raguraam</h3>
              <p className="founder-role">Founder & Pro-Chairman</p>
              <p className="founder-bio">
                A passionate leader focused on empowering the next generation of innovators. With a strong vision for academic excellence blended with practical innovation, he is driving the creation of a supportive platform for student-led startups and technology-driven solutions.
              </p>
            </div>

            {/* Image on the right */}
            <div className="founder-image-wrapper">
              <img
                src="https://placehold.co/120x120/A0A0A0/FFFFFF?text=John"
                alt="Dr. John Smith"
                className="founder-image"
              />
              <div className="founder-dot"></div> {/* Blue dot */}
            </div>
          </div>

          {/* Founder Card 2: Sarah Johnson */}
          <div className="founder-card horizontal">
            {/* Text content on the left */}
            <div className="founder-text-content">
              <h3 className="founder-name">Mr. Surya Raguraam</h3>
              <p className="founder-role">Trustee</p>
              <p className="founder-bio">
                A forward-thinking mentor dedicated to fostering creativity and entrepreneurship among youth. With a deep interest in innovation and social impact, he actively supports initiatives that help students explore, build, and grow their ideas into real-world projects.
              </p>
            </div>
            
            {/* Image on the right */}
            <div className="founder-image-wrapper">
              <img
                src="https://placehold.co/120x120/A0A0A0/FFFFFF?text=Sarah"
                alt="Sarah Johnson"
                className="founder-image"
              />
              <div className="founder-dot"></div> {/* Blue dot */}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <div className="leadership-section-container">
        <div className="section academic-leadership">
          <h2>Academic <span className="title-highlight">Leadership</span></h2>
          <div className="leader-card-container">
            <div className="leader-card">
              {/* Text content on the left */}
              <div className="leader-info">
                <h3>Dr.D.Vasudevan</h3>
                <p className="role">Principal</p>
                <p className="description">
                  A forward-thinking academic leader promoting innovation, research, and real-world learning to empower students and drive institutional excellence.
                </p>
              </div>
              {/* Image on the right */}
              <div className="leader-image">
                <img src={'./images/founder1.png'} alt="Prof. Rajesh Kumar" />
              </div>
            </div>
          </div>
        </div>

        <div className="section incubation-managers">
          <h2>Incubation <span className="title-highlight">Managers</span></h2>
          <p className="section-description">
            Dedicated professionals guiding startups through their journey from idea to market success.
          </p>
          <div className="manager-cards-container">
            <div className="manager-card">
              {/* Text content on the left */}
              <div className="manager-info">
                <h3>Dr.T.Hemalatha</h3>
                <p className="role">Senior Incubation Manager</p>
                <p className="description">
                  A dynamic and visionary leader with expertise in emerging technologies, actively mentoring student startups, tech clubs, and incubation initiatives. Plays a key role in fostering innovation and guiding ideas toward impactful real-world solutions.
                  </p>
              </div>
              {/* Image on the right */}
              <div className="manager-image">
                <img src={'./images/founder1.png'} alt="Priya Sharma" />
              </div>
            </div>

            <div className="manager-card">
              {/* Text content on the left */}
              <div className="manager-info">
                <h3>Dr.K.Srinivasan</h3>
                <p className="role">Incubation Manager</p>
                <p className="description">
                  A strategic enabler of student-led innovation, driving execution, scalability, and hands-on product development. Actively mentors tech ventures and fosters a culture of design thinking and real-world problem-solving.
                </p>
              </div>
              {/* Image on the right */}
              <div className="manager-image">
                <img src={'../images/founder1.png'} alt="Arjun Patel" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CombinedLeadershipPage;