import React from 'react';
import {
  Container,
  Row,
  Col,
  Accordion,
  Button
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import {
  FaHome,
  FaLock,
  FaArrowRight,
  FaShieldAlt,
  FaSearch,
  FaKey,
  FaClipboardCheck,
  FaChevronRight,
  FaCheckCircle,
  FaUserShield,
  FaCreditCard,
  FaQuestionCircle,
  FaBookOpen,
  FaFileAlt,
  FaExclamationTriangle
} from 'react-icons/fa';


/* ============================================================
   GLOBAL DESIGN
   ============================================================ */

const pageWrap = {
  minHeight: '100vh',
  background: '#F7F3EC',
  padding: '56px 0 90px',
  color: '#1E3A2E'
};


const cardStyle = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: 18,
  boxShadow: '0 8px 30px rgba(15, 23, 42, 0.04)',
  padding: '28px'
};


const pageContainer = {
  maxWidth: 1060
};


/* ============================================================
   SMALL COMPONENTS
   ============================================================ */

function PageHeader({
  eyebrow,
  title,
  description,
  icon
}) {

  return (

    <div
      style={{
        maxWidth: 720,
        margin: '0 auto 42px',
        textAlign: 'center'
      }}
    >

      <div
        style={{
          width: 48,
          height: 48,
          margin: '0 auto 17px',
          borderRadius: 13,
          background: '#fbf1ea',
          color: '#C1622D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18
        }}
      >
        {icon}
      </div>


      {eyebrow && (

        <div
          style={{
            color: '#C1622D',
            fontSize: 9,
            fontWeight: 850,
            letterSpacing: 1.8,
            marginBottom: 10
          }}
        >
          {eyebrow}
        </div>

      )}


      <h1
        style={{
          margin: 0,
          fontSize: 'clamp(35px, 5vw, 52px)',
          lineHeight: 1.05,
          letterSpacing: '-1.8px',
          fontWeight: 850
        }}
      >
        {title}
      </h1>


      {description && (

        <p
          style={{
            margin: '13px auto 0',
            maxWidth: 600,
            color: '#64748b',
            fontSize: 12,
            lineHeight: 1.7
          }}
        >
          {description}
        </p>

      )}

    </div>

  );

}


/* ============================================================
   STATUS PAGE
   ============================================================ */

function StatusPage({
  icon,
  title,
  message,
  ctaText = 'Back to Home',
  ctaTo = '/'
}) {

  return (

    <div
      style={{
        minHeight: '100vh',
        background: '#F7F3EC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25
      }}
    >

      <Container
        style={{
          maxWidth: 500
        }}
      >

        <div
          style={{
            ...cardStyle,
            textAlign: 'center',
            padding: '48px 35px'
          }}
        >

          <div
            style={{
              width: 68,
              height: 68,
              margin: '0 auto 20px',
              borderRadius: 20,
              background: '#fbf1ea',
              color: '#C1622D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 25
            }}
          >
            {icon}
          </div>


          <div
            style={{
              color: '#C1622D',
              fontSize: 9,
              fontWeight: 850,
              letterSpacing: 1.5,
              marginBottom: 9
            }}
          >
            OTOGO RENTALS
          </div>


          <h2
            style={{
              margin: '0 0 10px',
              fontSize: 26,
              fontWeight: 850,
              letterSpacing: '-0.8px'
            }}
          >
            {title}
          </h2>


          <p
            style={{
              margin: '0 auto 25px',
              maxWidth: 380,
              color: '#64748b',
              fontSize: 11,
              lineHeight: 1.7
            }}
          >
            {message}
          </p>


          <Button
            as={Link}
            to={ctaTo}
            style={{
              background: '#C1622D',
              border: 'none',
              borderRadius: 9,
              padding: '11px 21px',
              fontSize: 10,
              fontWeight: 750
            }}
          >
            {ctaText}

            <FaArrowRight
              style={{
                marginLeft: 8,
                fontSize: 9
              }}
            />

          </Button>

        </div>

      </Container>

    </div>

  );

}


/* ============================================================
   404
   ============================================================ */

export function NotFoundPage() {

  return (

    <StatusPage

      icon={<FaHome />}

      title="404 — Page Not Found"

      message="The page you're looking for doesn't exist or may have been moved."

      ctaText="Return Home"

      ctaTo="/"

    />

  );

}


/* ============================================================
   UNAUTHORIZED
   ============================================================ */

export function UnauthorizedPage() {

  return (

    <StatusPage

      icon={<FaLock />}

      title="Access Restricted"

      message="You don't have permission to view this page. If you think this is a mistake, contact support."

      ctaText="Back to Home"

      ctaTo="/"

    />

  );

}


/* ============================================================
   BLOG
   ============================================================ */

export function BlogPage() {

  const posts = [

    {
      title:
        '5 Tips for Finding the Perfect Room in Dunedin',

      excerpt:
        'From budgeting to neighborhood research, here is how to make your room search stress-free.',

      image:
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=85',

      date:
        'March 2026'
    },

    {
      title:
        "A Host's Guide to Getting More Bookings",

      excerpt:
        'Simple changes to your listing — better photos, clear pricing, fast replies — that make a real difference.',

      image:
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=85',

      date:
        'February 2026'
    },

    {
      title:
        'What to Check Before You Sign a Lease',

      excerpt:
        'A quick checklist covering deposits, maintenance responsibilities, and move-in inspections.',

      image:
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=85',

      date:
        'January 2026'
    }

  ];


  return (

    <div style={pageWrap}>

      <Container style={pageContainer}>

        <PageHeader

          eyebrow="FROM THE COMMUNITY"

          title="Rental insights"

          description="Helpful advice for renters and hosts, from finding your next room to managing a successful listing."

          icon={<FaBookOpen />}

        />


        <Row className="g-4">

          {posts.map((post, i) => (

            <Col
              md={4}
              key={i}
            >

              <article
                style={{
                  ...cardStyle,
                  padding: 0,
                  overflow: 'hidden',
                  height: '100%',
                  transition: 'transform .2s ease, box-shadow .2s ease'
                }}
              >

                <div
                  style={{
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >

                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: 190,
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />


                  <div
                    style={{
                      position: 'absolute',
                      left: 14,
                      bottom: 14,
                      padding: '5px 9px',
                      borderRadius: 6,
                      background: 'rgba(15,23,42,.78)',
                      color: '#fff',
                      fontSize: 8,
                      fontWeight: 800
                    }}
                  >
                    {post.date}
                  </div>

                </div>


                <div
                  style={{
                    padding: 22
                  }}
                >

                  <div
                    style={{
                      color: '#C1622D',
                      fontSize: 8,
                      fontWeight: 850,
                      letterSpacing: 1.2,
                      marginBottom: 9
                    }}
                  >
                    RENTAL GUIDE
                  </div>


                  <h3
                    style={{
                      margin: '0 0 9px',
                      fontSize: 16,
                      lineHeight: 1.35,
                      fontWeight: 800,
                      letterSpacing: '-.3px'
                    }}
                  >
                    {post.title}
                  </h3>


                  <p
                    style={{
                      margin: '0 0 18px',
                      color: '#64748b',
                      fontSize: 10,
                      lineHeight: 1.65
                    }}
                  >
                    {post.excerpt}
                  </p>


                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      color: '#C1622D',
                      fontSize: 9,
                      fontWeight: 750
                    }}
                  >
                    Read article

                    <FaChevronRight
                      style={{ fontSize: 7 }}
                    />

                  </div>

                </div>

              </article>

            </Col>

          ))}

        </Row>


        {/* BOTTOM TRUST STRIP */}

        <div
          style={{
            marginTop: 45,
            padding: '20px 24px',
            borderRadius: 14,
            background: '#fbf1ea',
            border: '1px solid #dbeafe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 9,
            textAlign: 'center'
          }}
        >

          <FaShieldAlt
            style={{
              color: '#C1622D'
            }}
          />

          <span
            style={{
              color: '#1e40af',
              fontSize: 10,
              fontWeight: 650
            }}
          >
            Practical advice for a better rental experience
          </span>

        </div>

      </Container>

    </div>

  );

}


/* ============================================================
   FAQ
   ============================================================ */

export function FaqPage() {

  const faqs = [

    {
      q:
        'How do I book a room?',

      a:
        'Browse listings, open the one you like, and click "Book Now". You will be asked to choose your dates and complete checkout.'
    },

    {
      q:
        'How do I become a host?',

      a:
        'Register an account, then go to your Profile > Security tab and use "Request to Change Role" to ask an admin to upgrade you to a host account.'
    },

    {
      q:
        'Can I cancel a booking?',

      a:
        'Yes, cancellation policies are set by the individual host. Check the listing details or contact the host directly through your booking page.'
    },

    {
      q:
        'How do payments work?',

      a:
        'Payments are processed securely at checkout. Hosts receive payouts after the booking is confirmed, minus our small service fee.'
    },

    {
      q:
        'Is my personal information safe?',

      a:
        'Yes. We only share the information necessary to complete a booking, and never sell your data to third parties.'
    }

  ];


  return (

    <div style={pageWrap}>

      <Container style={{ maxWidth: 820 }}>

        <PageHeader

          eyebrow="HELP CENTRE"

          title="Frequently asked questions"

          description="Everything you need to know about finding a room, making a booking, hosting, and using OtagoRentals."

          icon={<FaQuestionCircle />}

        />


        <div
          style={{
            ...cardStyle,
            padding: 10
          }}
        >

          <Accordion
            defaultActiveKey="0"
            flush
          >

            {faqs.map((faq, i) => (

              <Accordion.Item
                eventKey={String(i)}
                key={i}
                style={{
                  border: 'none',
                  borderBottom:
                    i === faqs.length - 1
                      ? 'none'
                      : '1px solid #e2e8f0'
                }}
              >

                <Accordion.Header>

                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 750,
                      color: '#1E3A2E'
                    }}
                  >
                    {faq.q}
                  </span>

                </Accordion.Header>


                <Accordion.Body>

                  <p
                    style={{
                      margin: 0,
                      color: '#64748b',
                      fontSize: 11,
                      lineHeight: 1.75
                    }}
                  >
                    {faq.a}
                  </p>

                </Accordion.Body>

              </Accordion.Item>

            ))}

          </Accordion>

        </div>


        <div
          style={{
            marginTop: 25,
            padding: 22,
            borderRadius: 14,
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: 15
          }}
        >

          <div
            style={{
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: 11,
              background: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C1622D'
            }}
          >
            <FaQuestionCircle />
          </div>


          <div>

            <strong
              style={{
                display: 'block',
                fontSize: 11,
                marginBottom: 3
              }}
            >
              Still need help?
            </strong>

            <span
              style={{
                color: '#64748b',
                fontSize: 9
              }}
            >
              Check our guides for more detailed information.
            </span>

          </div>

        </div>

      </Container>

    </div>

  );

}


/* ============================================================
   GUIDES
   ============================================================ */

export function GuidesPage() {

  const guides = [

    {
      title:
        "Renter's Guide",

      desc:
        'How to search, message hosts, and complete your first booking.',

      icon:
        <FaSearch />
    },

    {
      title:
        "Host's Guide",

      desc:
        'How to list your first property, set pricing, and manage bookings.',

      icon:
        <FaKey />
    },

    {
      title:
        'Moving-In Checklist',

      desc:
        'A step-by-step list to make your move-in day smooth and stress-free.',

      icon:
        <FaClipboardCheck />
    },

    {
      title:
        'Safety & Trust',

      desc:
        'How verification, reviews, and secure payments keep the community safe.',

      icon:
        <FaShieldAlt />
    }

  ];


  return (

    <div style={pageWrap}>

      <Container style={pageContainer}>

        <PageHeader

          eyebrow="RESOURCES"

          title="Guides for every step"

          description="Simple resources designed to help renters and hosts get more from OtagoRentals."

          icon={<FaBookOpen />}

        />


        <Row className="g-4">

          {guides.map((guide, i) => (

            <Col
              md={6}
              key={i}
            >

              <div
                style={{
                  ...cardStyle,
                  height: '100%',
                  display: 'flex',
                  gap: 18,
                  alignItems: 'flex-start'
                }}
              >

                <div
                  style={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    borderRadius: 13,
                    background: '#fbf1ea',
                    color: '#C1622D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 17
                  }}
                >
                  {guide.icon}
                </div>


                <div
                  style={{
                    flex: 1
                  }}
                >

                  <div
                    style={{
                      color: '#C1622D',
                      fontSize: 8,
                      fontWeight: 850,
                      letterSpacing: 1.2,
                      marginBottom: 7
                    }}
                  >
                    GUIDE 0{i + 1}
                  </div>


                  <h3
                    style={{
                      margin: '0 0 7px',
                      fontSize: 16,
                      fontWeight: 800,
                      letterSpacing: '-.4px'
                    }}
                  >
                    {guide.title}
                  </h3>


                  <p
                    style={{
                      margin: 0,
                      color: '#64748b',
                      fontSize: 10,
                      lineHeight: 1.65
                    }}
                  >
                    {guide.desc}
                  </p>

                </div>


                <FaChevronRight
                  style={{
                    color: '#94a3b8',
                    fontSize: 9,
                    marginTop: 5
                  }}
                />

              </div>

            </Col>

          ))}

        </Row>


        {/* TRUST FEATURES */}

        <Row className="g-3 mt-4">

          <Col md={4}>

            <div
              style={{
                padding: 18,
                borderRadius: 13,
                background: '#ffffff',
                border: '1px solid #e2e8f0'
              }}
            >

              <FaUserShield
                style={{
                  color: '#C1622D',
                  marginBottom: 10
                }}
              />

              <strong
                style={{
                  display: 'block',
                  fontSize: 10,
                  marginBottom: 4
                }}
              >
                Verified community
              </strong>

              <span
                style={{
                  color: '#64748b',
                  fontSize: 9
                }}
              >
                Built around trust and transparency.
              </span>

            </div>

          </Col>


          <Col md={4}>

            <div
              style={{
                padding: 18,
                borderRadius: 13,
                background: '#ffffff',
                border: '1px solid #e2e8f0'
              }}
            >

              <FaCreditCard
                style={{
                  color: '#C1622D',
                  marginBottom: 10
                }}
              />

              <strong
                style={{
                  display: 'block',
                  fontSize: 10,
                  marginBottom: 4
                }}
              >
                Secure payments
              </strong>

              <span
                style={{
                  color: '#64748b',
                  fontSize: 9
                }}
              >
                Safer checkout for every booking.
              </span>

            </div>

          </Col>


          <Col md={4}>

            <div
              style={{
                padding: 18,
                borderRadius: 13,
                background: '#ffffff',
                border: '1px solid #e2e8f0'
              }}
            >

              <FaCheckCircle
                style={{
                  color: '#2f6849',
                  marginBottom: 10
                }}
              />

              <strong
                style={{
                  display: 'block',
                  fontSize: 10,
                  marginBottom: 4
                }}
              >
                Simple process
              </strong>

              <span
                style={{
                  color: '#64748b',
                  fontSize: 9
                }}
              >
                Find, book and manage with ease.
              </span>

            </div>

          </Col>

        </Row>

      </Container>

    </div>

  );

}


/* ============================================================
   PRIVACY
   ============================================================ */

export function PrivacyPage() {

  const sections = [

    {
      title:
        '1. Information We Collect',

      body:
        'We collect information you provide when creating an account (name, email, phone, address) and information generated when you use the platform (listings viewed, bookings made, messages sent).'
    },

    {
      title:
        '2. How We Use Your Information',

      body:
        'We use your information to operate the platform, process bookings and payments, communicate with you about your account, and improve our services.'
    },

    {
      title:
        '3. Sharing of Information',

      body:
        'We share the minimum information necessary between renters and hosts to complete a booking (e.g. name and contact details). We do not sell your personal information to third parties.'
    },

    {
      title:
        '4. Data Security',

      body:
        'We use industry-standard practices, including encrypted authentication, to protect your data. No online service can guarantee absolute security, but we work to keep your information safe.'
    },

    {
      title:
        '5. Your Choices',

      body:
        'You can review and update your personal information at any time from your Profile page. You may request account deletion by contacting support.'
    },

    {
      title:
        '6. Cookies',

      body:
        'We use local storage and cookies to keep you signed in and remember your preferences, such as saved favorites.'
    }

  ];


  return (

    <div style={pageWrap}>

      <Container style={{ maxWidth: 850 }}>

        <PageHeader

          eyebrow="YOUR PRIVACY"

          title="Privacy Policy"

          description="How OtagoRentals collects, uses and protects information when you use the platform."

          icon={<FaUserShield />}

        />


        <div style={cardStyle}>

          {sections.map((section, i) => (

            <div
              key={i}
              style={{
                paddingBottom: 24,
                marginBottom: 24,
                borderBottom:
                  i === sections.length - 1
                    ? 'none'
                    : '1px solid #e2e8f0'
              }}
            >

              <div
                style={{
                  display: 'flex',
                  gap: 13,
                  alignItems: 'flex-start'
                }}
              >

                <div
                  style={{
                    width: 28,
                    height: 28,
                    flexShrink: 0,
                    borderRadius: 8,
                    background: '#fbf1ea',
                    color: '#C1622D',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 9,
                    fontWeight: 800
                  }}
                >
                  <FaLock />
                </div>


                <div>

                  <h3
                    style={{
                      margin: '2px 0 8px',
                      fontSize: 13,
                      fontWeight: 800
                    }}
                  >
                    {section.title}
                  </h3>


                  <p
                    style={{
                      margin: 0,
                      color: '#64748b',
                      fontSize: 10,
                      lineHeight: 1.8
                    }}
                  >
                    {section.body}
                  </p>

                </div>

              </div>

            </div>

          ))}


          <div
            style={{
              paddingTop: 5,
              color: '#94a3b8',
              fontSize: 9
            }}
          >
            Last updated: January 2026
          </div>

        </div>

      </Container>

    </div>

  );

}


/* ============================================================
   TERMS
   ============================================================ */

export function TermsPage() {

  const sections = [

    {
      title:
        '1. Acceptance of Terms',

      body:
        'By accessing or using OtagoRentals, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.'
    },

    {
      title:
        '2. User Accounts',

      body:
        'You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.'
    },

    {
      title:
        '3. Listings & Bookings',

      body:
        'Hosts are responsible for the accuracy of their listings. Renters are responsible for reviewing listing details before booking. All bookings are subject to host confirmation.'
    },

    {
      title:
        '4. Payments',

      body:
        'Payments are processed securely through our platform. A service fee applies to bookings. Refunds are subject to the host\'s cancellation policy.'
    },

    {
      title:
        '5. Prohibited Conduct',

      body:
        'Users may not post false listings, engage in fraudulent activity, or use the platform for any unlawful purpose.'
    },

    {
      title:
        '6. Limitation of Liability',

      body:
        'OtagoRentals acts as a platform connecting renters and hosts and is not responsible for disputes arising from bookings between users.'
    }

  ];


  return (

    <div style={pageWrap}>

      <Container style={{ maxWidth: 850 }}>

        <PageHeader

          eyebrow="PLATFORM RULES"

          title="Terms of Service"

          description="The rules and responsibilities that help keep the OtagoRentals community safe and reliable."

          icon={<FaFileAlt />}

        />


        <div style={cardStyle}>


          <div
            style={{
              padding: 15,
              marginBottom: 27,
              borderRadius: 10,
              background: '#fffbeb',
              border: '1px solid #fde68a',
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start'
            }}
          >

            <FaExclamationTriangle
              style={{
                color: '#d97706',
                marginTop: 2,
                fontSize: 11
              }}
            />

            <span
              style={{
                color: '#92400e',
                fontSize: 9,
                lineHeight: 1.6
              }}
            >
              Please read these terms carefully before using the platform or making a booking.
            </span>

          </div>


          {sections.map((section, i) => (

            <div
              key={i}
              style={{
                paddingBottom: 24,
                marginBottom: 24,
                borderBottom:
                  i === sections.length - 1
                    ? 'none'
                    : '1px solid #e2e8f0'
              }}
            >

              <h3
                style={{
                  margin: '0 0 8px',
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: '-.2px'
                }}
              >
                {section.title}
              </h3>


              <p
                style={{
                  margin: 0,
                  color: '#64748b',
                  fontSize: 10,
                  lineHeight: 1.8
                }}
              >
                {section.body}
              </p>

            </div>

          ))}


          <div
            style={{
              color: '#94a3b8',
              fontSize: 9
            }}
          >
            Last updated: January 2026
          </div>

        </div>

      </Container>

    </div>

  );

}