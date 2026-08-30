import React from "react";

const dummyListings = [
  { id: 1, title: "Sunny Studio in Dunedin Central", price: 220, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" },
  { id: 2, title: "Modern Flat near University", price: 310, img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80" },
  { id: 3, title: "Cozy Room with Garden View", price: 180, img: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=800&q=80" },
  { id: 4, title: "Spacious Shared House", price: 250, img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80" },
];

function HomeCards() {
  return (
    <section className="bento-section">
      <h2 className="bento-title" style={{ marginBottom: "1.5rem" }}>Featured Listings</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {dummyListings.map((listing) => (
          <div key={listing.id} className="bento-card" style={{ overflow: "hidden" }}>
            <img
              src={listing.img}
              alt={listing.title}
              style={{ width: "100%", height: 170, objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: "1.25rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 6 }}>
                {listing.title}
              </h3>
              <p style={{ color: "var(--bento-accent)", fontWeight: 700 }}>${listing.price}/week</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HomeCards;
