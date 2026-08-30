import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaSearch, FaHandshake, FaHeadset } from 'react-icons/fa';

function AboutContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Submitted:', { name, email, message });
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  const stats = [
    { value: '2,400+', label: 'Happy renters' },
    { value: '850+', label: 'Listings' },
    { value: '300+', label: 'Verified hosts' },
    { value: '4.8', label: 'Average rating' },
  ];

  const offers = [
    {
      icon: <FaSearch />,
      title: 'Simple discovery',
      text: 'Search and compare properties without jumping between platforms or agents.',
    },
    {
      icon: <FaHandshake />,
      title: 'Direct connections',
      text: 'Message hosts directly, arrange viewings and book without middlemen.',
    },
    {
      icon: <FaHeadset />,
      title: 'Support that shows up',
      text: 'Our team is on hand for anything from booking questions to move-in day.',
    },
  ];

  return (
    <div className="about-page">
      <style>{`
        .about-page {
          --primary: #C1622D;
          --dark: #1E3A2E;
          --text: #334155;
          --muted: #6b6459;
          --border: #e6ddcf;
          --background: #F7F3EC;

          background: var(--background);
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--dark);
        }

        /* HERO */

        .about-hero {
          text-align: center;
          padding: 4.5rem 1.5rem 0;
        }

        .about-eyebrow {
          color: var(--primary);
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .about-hero h1 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          line-height: 1.15;
          max-width: 780px;
          margin: 0 auto 1.25rem;
        }

        .about-hero h1 em {
          color: var(--primary);
          font-style: normal;
        }

        .about-hero > p {
          max-width: 560px;
          margin: 0 auto 2rem;
          color: var(--muted);
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .about-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--dark);
          color: white;
          border: none;
          border-radius: 100px;
          padding: 0.85rem 1.75rem;
          font-weight: 700;
          text-decoration: none;
          font-size: 0.95rem;
        }

        .about-cta:hover {
          background: #12241c;
          color: white;
        }

        .about-hero-image {
          margin: 2.5rem auto 0;
          max-width: 1100px;
          height: 380px;
          border-radius: 24px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          background-image: url('https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80');
        }

        /* STATS */

        .about-stats {
          max-width: 900px;
          margin: -2.5rem auto 0;
          background: white;
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          box-shadow: 0 20px 50px rgba(30, 58, 46, 0.1);
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          text-align: center;
          gap: 1rem;
        }

        .about-stats .stat-value {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.9rem;
          font-weight: 600;
          color: var(--dark);
        }

        .about-stats .stat-label {
          color: var(--muted);
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }

        /* STORY */

        .about-story {
          max-width: 1000px;
          margin: 5rem auto 0;
          padding: 0 1.5rem;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 3rem;
        }

        .about-story h2 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: 2rem;
          line-height: 1.2;
          margin: 0;
        }

        .about-story p {
          color: var(--text);
          font-size: 1rem;
          line-height: 1.75;
          margin-bottom: 1.15rem;
        }

        .about-story blockquote {
          margin: 1.5rem 0 0;
          padding-left: 1.1rem;
          border-left: 3px solid var(--primary);
          color: var(--dark);
          font-size: 0.98rem;
          font-style: italic;
          line-height: 1.7;
        }

        /* QUOTE */

        .about-quote {
          max-width: 900px;
          margin: 4.5rem auto 0;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .about-quote-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--dark);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.5rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        .about-quote p {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.3rem;
          font-weight: 500;
          line-height: 1.5;
          margin: 0 0 0.5rem;
        }

        .about-quote span {
          color: var(--muted);
          font-size: 0.9rem;
        }

        /* OFFER */

        .about-offer {
          max-width: 1100px;
          margin: 5rem auto 0;
          padding: 0 1.5rem;
        }

        .about-offer-head {
          text-align: center;
          max-width: 560px;
          margin: 0 auto 2.5rem;
        }

        .about-offer-head h2 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .about-offer-head p {
          color: var(--muted);
        }

        .offer-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 1.75rem;
          height: 100%;
        }

        .offer-icon {
          width: 46px;
          height: 46px;
          border-radius: 12px;
          background: #fbf1ea;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.15rem;
          margin-bottom: 1rem;
        }

        .offer-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .offer-card p {
          color: var(--muted);
          font-size: 0.92rem;
          line-height: 1.6;
          margin: 0;
        }

        /* CONTACT */

        .about-contact {
          max-width: 1100px;
          margin: 5rem auto 0;
          padding: 0 1.5rem 5rem;
        }

        .about-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 2rem;
        }

        .about-card h4 {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: 1.4rem;
          margin-bottom: 1rem;
        }

        .about-card .form-control {
          border-radius: 10px;
          border-color: var(--border);
          padding: 0.7rem 0.9rem;
        }

        .about-card .form-control:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(193, 98, 45, 0.12);
        }

        .about-submit {
          background: var(--dark);
          border: none;
          border-radius: 10px;
          padding: 0.7rem 1.5rem;
          font-weight: 700;
        }

        .about-submit:hover {
          background: #12241c;
        }

        .contact-info-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1rem;
          color: var(--text);
        }

        .contact-info-row svg {
          color: var(--primary);
        }

        @media (max-width: 767px) {
          .about-story {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .about-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-hero-image {
            height: 240px;
          }

          .about-quote {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>

      {/* HERO */}
      <div className="about-hero">
        <div className="about-eyebrow">About OtagoRentals</div>
        <h1>
          We believe finding a place to live should feel <em>exciting</em>, not exhausting.
        </h1>
        <p>
          We connect renters in Dunedin with verified hosts, making it simple to find
          a place that feels like home.
        </p>
        <a href="#contact" className="about-cta">Get in touch</a>

        <div className="about-hero-image" />
      </div>

      {/* STATS */}
      <div className="about-stats">
        {stats.map((s, i) => (
          <div key={i}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* STORY */}
      <div className="about-story">
        <h2>Get to know us more</h2>
        <div>
          <p>
            OtagoRentals started with a simple idea: finding a room for rent shouldn't
            be stressful. We built a platform where students, professionals, and
            travelers can browse verified listings, connect directly with hosts, and
            book with confidence.
          </p>
          <p>
            Today, we help thousands of renters and hosts across Dunedin manage
            bookings, payments, and communication all in one place.
          </p>
          <blockquote>
            What started as a small idea to help students find better flats has grown
            into a platform trusted by renters and hosts across the whole city.
          </blockquote>
        </div>
      </div>

      {/* FOUNDER QUOTE */}
      <div className="about-quote">
        <div className="about-quote-avatar">O</div>
        <div>
          <p>"Our goal is to make renting feel less like a transaction and more like finding somewhere you actually want to live."</p>
          <span>Satyam Kamboj — Founder, OtagoRentals</span>
        </div>
      </div>

      {/* OFFER */}
      <div className="about-offer">
        <div className="about-offer-head">
          <h2>What we offer</h2>
          <p>Everything you need to discover and manage your next rental, brought together in one place.</p>
        </div>

        <Row className="g-4">
          {offers.map((o, i) => (
            <Col md={4} key={i}>
              <div className="offer-card">
                <div className="offer-icon">{o.icon}</div>
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* CONTACT */}
      <div className="about-contact" id="contact">
        <Row className="g-4">
          <Col md={7}>
            <div className="about-card h-100">
              <h4>Get in touch</h4>
              {sent && (
                <div className="alert alert-success py-2 small">
                  Thanks! Your message has been sent — we'll get back to you shortly.
                </div>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="about-submit">
                  Send message
                </Button>
              </Form>
            </div>
          </Col>
          <Col md={5}>
            <div className="about-card h-100">
              <h4>Contact information</h4>
              <p className="contact-info-row">
                <FaMapMarkerAlt /> 123 Main Street, Dunedin
              </p>
              <p className="contact-info-row">
                <FaPhoneAlt /> +64 3 123 4567
              </p>
              <p className="contact-info-row">
                <FaEnvelope /> support@otagorentals.co.nz
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AboutContactPage;
