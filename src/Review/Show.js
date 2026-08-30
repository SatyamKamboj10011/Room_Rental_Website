import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaCommentDots,
  FaCalendarAlt,
  FaUser,
  FaStar,
  FaArrowLeft,
  FaTrashAlt,
  FaQuoteLeft,
  FaShieldAlt
} from "react-icons/fa";
import FBDataService from "../services/fbServices";

function Show() {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const { listingId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getFeedback();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId]);

  const getFeedback = async () => {
    try {
      setLoading(true);

      const docSnap = await FBDataService.getDataById(listingId);

      if (docSnap) {
        setFeedback(docSnap);
      } else {
        console.log("No such feedback found!");
        setFeedback(null);
      }
    } catch (err) {
      console.error("Error fetching feedback:", err);
      setFeedback(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await FBDataService.deleteFeedback(listingId);

      navigate(-1);
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Unable to delete the feedback. Please try again.");
      setDeleting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f9fc",
        padding: "60px 20px 90px",
        color: "#172033"
      }}
    >
      <div
        style={{
          maxWidth: 760,
          width: "100%",
          margin: "0 auto"
        }}
      >

        {/* BACK BUTTON */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            border: "none",
            background: "transparent",
            color: "#64748b",
            fontSize: 12,
            fontWeight: 650,
            padding: 0,
            marginBottom: 24,
            cursor: "pointer"
          }}
        >
          <FaArrowLeft size={10} />
          Back to listing
        </button>


        {/* MAIN CARD */}

        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5eaf1",
            borderRadius: 22,
            boxShadow: "0 18px 55px rgba(15, 23, 42, 0.07)",
            overflow: "hidden"
          }}
        >

          {/* HEADER */}

          <div
            style={{
              padding: "34px 38px 30px",
              background:
                "linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
              borderBottom: "1px solid #edf0f4"
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 20
              }}
            >

              <div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 46,
                    height: 46,
                    borderRadius: 13,
                    background: "#eef3ff",
                    color: "#C1622D",
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
                    color: "#C1622D",
                    marginBottom: 8
                  }}
                >
                  RENTAL COMMUNITY
                </div>


                <h1
                  style={{
                    margin: 0,
                    fontSize: "clamp(31px, 4vw, 42px)",
                    fontWeight: 850,
                    letterSpacing: "-1.3px",
                    color: "#111827"
                  }}
                >
                  Feedback details
                </h1>


                <p
                  style={{
                    margin: "10px 0 0",
                    color: "#64748b",
                    fontSize: 12,
                    lineHeight: 1.65
                  }}
                >
                  See what this renter had to say about their experience.
                </p>

              </div>


              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "8px 11px",
                  borderRadius: 9,
                  background: "#eef3f0",
                  border: "1px solid #d3e0d8",
                  color: "#1E3A2E",
                  fontSize: 8,
                  fontWeight: 800,
                  whiteSpace: "nowrap"
                }}
              >
                <FaShieldAlt size={9} />
                COMMUNITY REVIEW
              </div>

            </div>

          </div>


          {/* CONTENT */}

          <div
            style={{
              padding: "34px 38px 38px"
            }}
          >

            {loading ? (

              /* LOADING */

              <div
                style={{
                  padding: "60px 20px",
                  textAlign: "center",
                  color: "#94a3b8"
                }}
              >

                <div
                  style={{
                    width: 38,
                    height: 38,
                    margin: "0 auto 15px",
                    borderRadius: "50%",
                    border: "3px solid #e5eaf1",
                    borderTopColor: "#C1622D",
                    animation: "spin 1s linear infinite"
                  }}
                />

                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 650
                  }}
                >
                  Loading feedback...
                </div>

              </div>

            ) : feedback ? (

              <>

                {/* RATING */}

                {feedback.rating > 0 && (

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "19px 21px",
                      marginBottom: 25,
                      borderRadius: 14,
                      background: "#F7F3EC",
                      border: "1px solid #e8edf3"
                    }}
                  >

                    <div>

                      <div
                        style={{
                          fontSize: 9,
                          color: "#64748b",
                          fontWeight: 750,
                          textTransform: "uppercase",
                          letterSpacing: 1
                        }}
                      >
                        Overall rating
                      </div>


                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          marginTop: 8
                        }}
                      >

                        {[1, 2, 3, 4, 5].map((star) => (

                          <FaStar
                            key={star}
                            size={18}
                            color={
                              star <= feedback.rating
                                ? "#C1622D"
                                : "#dbe2ea"
                            }
                          />

                        ))}

                      </div>

                    </div>


                    <div
                      style={{
                        fontSize: 25,
                        fontWeight: 850,
                        color: "#172033",
                        letterSpacing: "-1px"
                      }}
                    >
                      {feedback.rating}
                      <span
                        style={{
                          color: "#94a3b8",
                          fontSize: 11,
                          fontWeight: 600
                        }}
                      >
                        /5
                      </span>
                    </div>

                  </div>

                )}


                {/* REVIEW */}

                <div
                  style={{
                    position: "relative",
                    padding: "30px 28px",
                    marginBottom: 25,
                    borderRadius: 16,
                    background: "#f8faff",
                    border: "1px solid #e4eaff"
                  }}
                >

                  <FaQuoteLeft
                    style={{
                      position: "absolute",
                      top: 21,
                      right: 24,
                      color: "#dce5ff",
                      fontSize: 28
                    }}
                  />


                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 12,
                      color: "#C1622D",
                      fontSize: 10,
                      fontWeight: 800
                    }}
                  >
                    <FaCommentDots />
                    RENTER'S FEEDBACK
                  </div>


                  <p
                    style={{
                      margin: 0,
                      maxWidth: 590,
                      color: "#273449",
                      fontSize: 15,
                      lineHeight: 1.8,
                      fontWeight: 500
                    }}
                  >
                    "{feedback.feedback}"
                  </p>

                </div>


                {/* DETAILS */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(210px, 1fr))",
                    gap: 14,
                    marginBottom: 30
                  }}
                >

                  {/* NAME */}

                  <div
                    style={{
                      padding: "18px 19px",
                      borderRadius: 13,
                      border: "1px solid #e8edf3",
                      background: "#ffffff"
                    }}
                  >

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#94a3b8",
                        fontSize: 8,
                        fontWeight: 800,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        marginBottom: 8
                      }}
                    >
                      <FaUser color="#C1622D" />
                      Reviewer
                    </div>


                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 750,
                        color: "#172033"
                      }}
                    >
                      {feedback.name}
                    </div>

                  </div>


                  {/* DATE */}

                  <div
                    style={{
                      padding: "18px 19px",
                      borderRadius: 13,
                      border: "1px solid #e8edf3",
                      background: "#ffffff"
                    }}
                  >

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#94a3b8",
                        fontSize: 8,
                        fontWeight: 800,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        marginBottom: 8
                      }}
                    >
                      <FaCalendarAlt color="#C1622D" />
                      Review date
                    </div>


                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 750,
                        color: "#172033"
                      }}
                    >
                      {feedback.date}
                    </div>

                  </div>

                </div>


                {/* ACTIONS */}

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 14,
                    paddingTop: 24,
                    borderTop: "1px solid #edf0f4"
                  }}
                >

                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: 9,
                      lineHeight: 1.5
                    }}
                  >
                    Manage this review using the action on the right.
                  </div>


                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      minWidth: 145,
                      height: 42,
                      padding: "0 17px",
                      borderRadius: 10,
                      border: "1px solid #fecaca",
                      background: "#fff",
                      color: "#dc2626",
                      fontSize: 10,
                      fontWeight: 750,
                      cursor: deleting ? "not-allowed" : "pointer",
                      opacity: deleting ? 0.65 : 1
                    }}
                  >

                    <FaTrashAlt size={10} />

                    {deleting
                      ? "Deleting..."
                      : "Delete Feedback"}

                  </button>

                </div>

              </>

            ) : (

              /* NO FEEDBACK */

              <div
                style={{
                  textAlign: "center",
                  padding: "55px 20px"
                }}
              >

                <div
                  style={{
                    width: 60,
                    height: 60,
                    margin: "0 auto 18px",
                    borderRadius: 18,
                    background: "#f1f5f9",
                    color: "#94a3b8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22
                  }}
                >
                  <FaCommentDots />
                </div>


                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#172033"
                  }}
                >
                  No feedback found
                </h3>


                <p
                  style={{
                    margin: "0 auto 22px",
                    maxWidth: 390,
                    color: "#64748b",
                    fontSize: 10,
                    lineHeight: 1.7
                  }}
                >
                  This review may have been removed or the feedback
                  you're looking for doesn't exist.
                </p>


                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    height: 40,
                    padding: "0 17px",
                    border: "none",
                    borderRadius: 9,
                    background: "#C1622D",
                    color: "#ffffff",
                    fontSize: 10,
                    fontWeight: 750,
                    cursor: "pointer"
                  }}
                >
                  <FaArrowLeft size={9} />
                  Go Back
                </button>

              </div>

            )}

          </div>

        </div>


        {/* BOTTOM TRUST MESSAGE */}

        {!loading && feedback && (

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              marginTop: 18,
              color: "#94a3b8",
              fontSize: 9
            }}
          >

            <FaShieldAlt
              style={{
                color: "#4e8363",
                fontSize: 10
              }}
            />

            Reviews help build a trusted rental community.

          </div>

        )}

      </div>


      {/* SPINNER ANIMATION */}

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          button:hover {
            transition: all 0.18s ease;
          }
        `}
      </style>

    </div>
  );
}

export default Show;