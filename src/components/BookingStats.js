import React from 'react';
import { Card } from 'react-bootstrap';

function BookingStatsCard({ title, value, icon, color }) {
  return (
    <Card className="border-0 shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
      <Card.Body className="text-center">
        <div className="mb-3" style={{ color }}>
          {icon}
        </div>
        <h3 className="mb-1" style={{ color }}>{value}</h3>
        <p className="mb-0 text-muted">{title}</p>
      </Card.Body>
    </Card>
  );
}

export default BookingStatsCard;