import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import {
  FaStar,
  FaCommentDots,
  FaUser,
  FaCalendarAlt,
  FaArrowLeft,
  FaCheckCircle
} from 'react-icons/fa';
import FBDataService from '../services/fbServices';

function CreateReviewPage() {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rating === 0) {
      alert('Please select a rating before submitting your review.');
      return;
    }

    setIsSubmitting(true);

    const newReview = {
      feedback,
      name,
      date: date || new Date().toLocaleDateString(),
      rating,
      listingId: id,
    };

    try {
      const docRef = await FBDataService.adddata(newReview);

      console.log('Document written with ID: ', docRef.id);

      navigate(-1);
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Something went wrong while submitting your review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedRating = hoverRating || rating;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7f9fc',
        padding: '70px 20px 90px',
        color: '#172033'
      }}
    >
      <div
        style={{
          maxWidth: 760,
          margin: '0 auto'
        }}
      >

        {/* BACK BUTTON */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            border: 'none',
            background: 'transparent',
            color: '#64748b',
            fontSize: 12,
            fontWeight: 650,
            padding: 0,
            marginBottom: 25,
            cursor: 'pointer'
          }}
        >
          <FaArrowLeft size={10} />
          Back to listing
        </button>


        {/* MAIN CARD */}

        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5eaf1',
            borderRadius: 22,
            boxShadow: '0 18px 55px rgba(15, 23, 42, 0.07)',
            overflow: 'hidden'
          }}
        >

          {/* HEADER */}

          <div
            style={{
              padding: '34px 38px 30px',
              borderBottom: '1px solid #edf0f4',
              background:
                'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)'
            }}
          >

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 46,
                height: 46,
                borderRadius: 13,
                background: '#eef3ff',
                color: '#C1622D',
                marginBottom: 17
              }}
            >
              <FaCommentDots size={18} />
            </div>


            <div
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: 1.6,
                color: '#C1622D',
                marginBottom: 8
              }}
            >
              SHARE YOUR EXPERIENCE
            </div>


            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(31px, 4vw, 42px)',
                fontWeight: 850,
                letterSpacing: '-1.3px',
                color: '#111827'
              }}
            >
              Write a review
            </h1>


            <p
              style={{
                margin: '10px 0 0',
                color: '#64748b',
                fontSize: 12,
                lineHeight: 1.65,
                maxWidth: 540
              }}
            >
              Share your experience with this property and help other
              renters make a more informed decision.
            </p>

          </div>


          {/* FORM */}

          <div
            style={{
              padding: '34px 38px 40px'
            }}
          >

            <Form onSubmit={handleSubmit}>

              {/* RATING */}

              <div
                style={{
                  padding: '23px 24px',
                  borderRadius: 15,
                  background: '#F7F3EC',
                  border: '1px solid #e8edf3',
                  marginBottom: 27
                }}
              >

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 13
                  }}
                >

                  <div>

                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: '#172033'
                      }}
                    >
                      How would you rate this listing?
                    </div>

                    <div
                      style={{
                        fontSize: 9,
                        color: '#94a3b8',
                        marginTop: 4
                      }}
                    >
                      Select a rating from 1 to 5 stars
                    </div>

                  </div>


                  {rating > 0 && (

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        fontSize: 11,
                        fontWeight: 800,
                        color: '#C1622D'
                      }}
                    >
                      <FaStar size={10} />
                      {rating}/5
                    </div>

                  )}

                </div>


                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center'
                  }}
                  onMouseLeave={() => setHoverRating(0)}
                >

                  {[1, 2, 3, 4, 5].map((star) => (

                    <button
                      key={star}
                      type="button"
                      aria-label={`Rate ${star} stars`}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        padding: 2,
                        cursor: 'pointer',
                        transform:
                          displayedRating === star
                            ? 'scale(1.08)'
                            : 'scale(1)',
                        transition: 'all .15s ease'
                      }}
                    >

                      <FaStar
                        size={27}
                        color={
                          star <= displayedRating
                            ? '#C1622D'
                            : '#dbe2ea'
                        }
                      />

                    </button>

                  ))}

                </div>

              </div>


              {/* FEEDBACK */}

              <Form.Group
                controlId="feedback"
                className="mb-4"
              >

                <Form.Label
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#172033',
                    marginBottom: 8
                  }}
                >
                  <FaCommentDots
                    style={{
                      color: '#C1622D',
                      marginRight: 8,
                      fontSize: 11
                    }}
                  />

                  Your feedback
                </Form.Label>


                <Form.Control
                  as="textarea"
                  rows={6}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us about your experience with this property..."
                  required
                  style={{
                    borderRadius: 12,
                    border: '1px solid #dce3ec',
                    padding: '14px 15px',
                    fontSize: 11,
                    lineHeight: 1.65,
                    boxShadow: 'none',
                    resize: 'vertical',
                    minHeight: 140
                  }}
                />

              </Form.Group>


              {/* NAME + DATE */}

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 18,
                  marginBottom: 28
                }}
              >

                {/* NAME */}

                <Form.Group controlId="name">

                  <Form.Label
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#172033',
                      marginBottom: 8
                    }}
                  >

                    <FaUser
                      style={{
                        color: '#C1622D',
                        marginRight: 8,
                        fontSize: 10
                      }}
                    />

                    Your name

                  </Form.Label>


                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    style={{
                      height: 46,
                      borderRadius: 11,
                      border: '1px solid #dce3ec',
                      padding: '0 14px',
                      fontSize: 11,
                      boxShadow: 'none'
                    }}
                  />

                </Form.Group>


                {/* DATE */}

                <Form.Group controlId="date">

                  <Form.Label
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: '#172033',
                      marginBottom: 8
                    }}
                  >

                    <FaCalendarAlt
                      style={{
                        color: '#C1622D',
                        marginRight: 8,
                        fontSize: 10
                      }}
                    />

                    Review date

                  </Form.Label>


                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      height: 46,
                      borderRadius: 11,
                      border: '1px solid #dce3ec',
                      padding: '0 14px',
                      fontSize: 11,
                      color: date ? '#172033' : '#94a3b8',
                      boxShadow: 'none'
                    }}
                  />

                </Form.Group>

              </div>


              {/* SUBMIT */}

              <div
                style={{
                  borderTop: '1px solid #edf0f4',
                  paddingTop: 25
                }}
              >

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    height: 48,
                    border: 'none',
                    borderRadius: 11,
                    background: '#C1622D',
                    color: '#ffffff',
                    fontSize: 11,
                    fontWeight: 800,
                    boxShadow: '0 8px 20px rgba(193, 98, 45, 0.18)',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >

                  {isSubmitting ? (
                    'Submitting review...'
                  ) : (
                    <>
                      <FaCheckCircle
                        style={{
                          marginRight: 8,
                          fontSize: 11
                        }}
                      />

                      Submit Review
                    </>
                  )}

                </Button>


                <div
                  style={{
                    textAlign: 'center',
                    marginTop: 12,
                    color: '#94a3b8',
                    fontSize: 9
                  }}
                >
                  Your review helps other renters make better decisions.
                </div>

              </div>

            </Form>

          </div>

        </div>


        {/* FOOTER TRUST MESSAGE */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 7,
            marginTop: 18,
            color: '#94a3b8',
            fontSize: 9
          }}
        >

          <FaCheckCircle
            style={{
              color: '#4e8363',
              fontSize: 10
            }}
          />

          Reviews help build a trusted rental community.

        </div>

      </div>
    </div>
  );
}

export default CreateReviewPage;