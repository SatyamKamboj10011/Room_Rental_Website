import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Container, Row, Col, Card, Button, 
  Spinner, Alert, Image, Form, Badge, ListGroup
} from 'react-bootstrap';
import { 
  FaCreditCard, FaCalendarAlt, FaUser, 
  FaLock, FaHome, FaMapMarkerAlt, 
  FaMoneyBillWave, FaCheckCircle
} from 'react-icons/fa';
import BookingDataService from '../services/BookingDataService';

function CheckoutPage() {
  const { state } = useLocation();
  const { bookingData, listingId } = state || {};
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listingDetails, setListingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const navigate = useNavigate();

  useEffect(() => {
    if (!listingId || !bookingData) {
      setError('Listing ID or booking data is missing. Cannot proceed.');
      setLoading(false);
      return;
    }

    const fetchListingDetails = async () => {
      try {
        const data = await BookingDataService.getListingById(listingId);
        setListingDetails(data);
      } catch (error) {
        setError('Error fetching listing details. Please try again later.');
        console.error('Error fetching listing details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [listingId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmPayment = async () => {
    setIsSubmitting(true);

    // Basic validation for card details
    if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv || !cardDetails.cardHolderName) {
      setError('Please fill in all card details.');
      setIsSubmitting(false);
      return;
    }

    try {
      const bookingId = await BookingDataService.createBooking(bookingData, listingId);
      navigate(`/invoice/${bookingId}`);
    } catch (error) {
      console.error('Error confirming payment:', error);
      setError('There was an error confirming your booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" style={{ width: '4rem', height: '4rem' }} />
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <style>{`
        .checkout-page {
          background-color: #f8fafc;
          min-height: 100vh;
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
        
        .checkout-card {
          border: none;
          border-radius: 16px;
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        
        .payment-card {
          border: none;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          background-color: #fff;
        }
        
        .summary-card {
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
          color: white;
        }
        
        .payment-method-btn {
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          padding: 15px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s;
          background-color: white;
        }
        
        .payment-method-btn.active {
          border-color: #4e73df;
          background-color: #f0f5ff;
        }
        
        .payment-method-btn:hover {
          border-color: #4e73df;
        }
        
        .form-control {
          border-radius: 10px;
          padding: 12px 15px;
          border: 1px solid #e2e8f0;
        }
        
        .form-control:focus {
          border-color: #4e73df;
          box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
        }
        
        .btn-confirm {
          background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
          border: none;
          border-radius: 50px;
          padding: 12px 30px;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.3s;
        }
        
        .btn-confirm:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(78, 115, 223, 0.3);
        }
        
        .section-title {
          position: relative;
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 60px;
          height: 4px;
          background: linear-gradient(135deg, #4e73df 0%, #224abe 100%);
          border-radius: 2px;
        }
        
        .detail-icon {
          font-size: 1.2rem;
          margin-right: 10px;
          color: #4e73df;
        }
        
        .price-tag {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2e59d9;
        }
        
        .secure-badge {
          background-color: #f0f5ff;
          color: #4e73df;
          border-radius: 50px;
          padding: 5px 15px;
          font-size: 0.8rem;
          font-weight: 600;
        }
      `}</style>

      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="checkout-card mb-4">
              <Card.Body className="p-4">
                <div className="text-center mb-5">
                  <h2 className="fw-bold mb-3">Complete Your Booking</h2>
                  <div className="d-flex justify-content-center">
                    <div className="d-flex align-items-center mx-4">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '30px', height: '30px'}}>1</div>
                      <div className="ms-2 small">Booking Details</div>
                    </div>
                    <div className="d-flex align-items-center mx-4">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{width: '30px', height: '30px'}}>2</div>
                      <div className="ms-2 small">Payment</div>
                    </div>
                    <div className="d-flex align-items-center mx-4">
                      <div className="bg-light border border-primary text-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: '30px', height: '30px'}}>3</div>
                      <div className="ms-2 small">Confirmation</div>
                    </div>
                  </div>
                </div>

                {error && <Alert variant="danger" className="mb-4">{error}</Alert>}

                <Row>
                  {/* Payment Section */}
                  <Col lg={7} className="mb-4 mb-lg-0">
                    <Card className="payment-card p-4 mb-4">
                      <h4 className="section-title fw-bold">Payment Method</h4>
                      
                      <Row className="mb-4">
                        <Col md={6} className="mb-3">
                          <div 
                            className={`payment-method-btn ${paymentMethod === 'credit' ? 'active' : ''}`}
                            onClick={() => setPaymentMethod('credit')}
                          >
                            <FaCreditCard className="mb-2" style={{fontSize: '1.5rem', color: '#4e73df'}} />
                            <div className="fw-semibold">Credit Card</div>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div 
                            className={`payment-method-btn ${paymentMethod === 'paypal' ? 'active' : ''}`}
                            onClick={() => setPaymentMethod('paypal')}
                          >
                            <Image 
                              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                              style={{height: '24px', marginBottom: '8px'}} 
                            />
                            <div className="fw-semibold">PayPal</div>
                          </div>
                        </Col>
                      </Row>

                      {paymentMethod === 'credit' && (
                        <Form>
                          <Form.Group className="mb-3">
                            <Form.Label>Card Holder Name</Form.Label>
                            <div className="position-relative">
                              <FaUser className="position-absolute" style={{top: '13px', left: '15px', color: '#94a3b8'}} />
                              <Form.Control
                                type="text"
                                name="cardHolderName"
                                placeholder="Full Name"
                                value={cardDetails.cardHolderName}
                                onChange={handleInputChange}
                                required
                                style={{paddingLeft: '40px'}}
                              />
                            </div>
                          </Form.Group>

                          <Form.Group className="mb-3">
                            <Form.Label>Card Number</Form.Label>
                            <div className="position-relative">
                              <FaCreditCard className="position-absolute" style={{top: '13px', left: '15px', color: '#94a3b8'}} />
                              <Form.Control
                                type="text"
                                name="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={cardDetails.cardNumber}
                                onChange={handleInputChange}
                                maxLength={19}
                                required
                                style={{paddingLeft: '40px'}}
                              />
                            </div>
                          </Form.Group>

                          <Row>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>Expiry Date</Form.Label>
                                <div className="position-relative">
                                  <FaCalendarAlt className="position-absolute" style={{top: '13px', left: '15px', color: '#94a3b8'}} />
                                  <Form.Control
                                    type="month"
                                    name="expiryDate"
                                    placeholder="MM/YY"
                                    value={cardDetails.expiryDate}
                                    onChange={handleInputChange}
                                    required
                                    style={{paddingLeft: '40px'}}
                                  />
                                </div>
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="mb-3">
                                <Form.Label>CVV</Form.Label>
                                <div className="position-relative">
                                  <FaLock className="position-absolute" style={{top: '13px', left: '15px', color: '#94a3b8'}} />
                                  <Form.Control
                                    type="number"
                                    name="cvv"
                                    placeholder="123"
                                    value={cardDetails.cvv}
                                    onChange={handleInputChange}
                                    required
                                    style={{paddingLeft: '40px'}}
                                  />
                                </div>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Form>
                      )}

                      {paymentMethod === 'paypal' && (
                        <div className="text-center py-4">
                          <Image 
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                            style={{height: '40px', marginBottom: '20px'}} 
                          />
                          <p>You'll be redirected to PayPal to complete your payment securely.</p>
                          <Button variant="primary" className="px-4">
                            Continue with PayPal
                          </Button>
                        </div>
                      )}

                      <div className="d-flex align-items-center justify-content-center mt-4">
                        <Badge className="secure-badge">
                          <FaLock className="me-2" />
                          Secure Payment
                        </Badge>
                      </div>
                    </Card>
                  </Col>

                  {/* Booking Summary */}
                  <Col lg={5}>
                    <Card className="summary-card p-4 mb-4">
                      <h4 className="text-white mb-4">Booking Summary</h4>
                      
                      <div className="d-flex align-items-center mb-4">
                        <Image 
                          src={listingDetails?.image || 'https://via.placeholder.com/300'} 
                          alt="Listing" 
                          fluid 
                          rounded 
                          style={{width: '100px', height: '70px', objectFit: 'cover'}} 
                        />
                        <div className="ms-3">
                          <h5 className="text-white mb-1">{listingDetails?.title}</h5>
                          <div className="text-white-50 small">
                            <FaMapMarkerAlt className="me-1" />
                            {listingDetails?.location}
                          </div>
                        </div>
                      </div>
                      
                      <ListGroup variant="flush" className="mb-4">
                        <ListGroup.Item className="bg-transparent text-white border-0 px-0 py-2 d-flex justify-content-between">
                          <span><FaUser className="me-2" /> Guest</span>
                          <span>{bookingData?.guestName}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent text-white border-0 px-0 py-2 d-flex justify-content-between">
                          <span><FaCalendarAlt className="me-2" /> Check-in</span>
                          <span>{new Date(bookingData?.checkInDate).toLocaleDateString()}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent text-white border-0 px-0 py-2 d-flex justify-content-between">
                          <span><FaCalendarAlt className="me-2" /> Check-out</span>
                          <span>{new Date(bookingData?.checkOutDate).toLocaleDateString()}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-transparent text-white border-0 px-0 py-2 d-flex justify-content-between">
                          <span><FaHome className="me-2" /> Nights</span>
                          <span>{bookingData?.nights}</span>
                        </ListGroup.Item>
                      </ListGroup>
                      
                      <hr className="border-white opacity-25" />
                      
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-white-50">Subtotal</span>
                        <span className="text-white">${bookingData?.price * Math.ceil(bookingData?.nights / 7)}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-white-50">Service fee</span>
                        <span className="text-white">$0</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-white-50">Taxes</span>
                        <span className="text-white">$0</span>
                      </div>
                      
                      <hr className="border-white opacity-25 my-3" />
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold text-white">Total</span>
                        <span className="price-tag text-white">${bookingData?.totalPrice}</span>
                      </div>
                    </Card>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-100 btn-confirm"
                      onClick={handleConfirmPayment}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="me-2" />
                          Confirm Booking
                        </>
                      )}
                    </Button>

                    <div className="text-center mt-3">
                      <small className="text-muted">
                        By completing this booking, you agree to our Terms of Service and Privacy Policy
                      </small>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CheckoutPage;