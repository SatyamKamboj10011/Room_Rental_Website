import React from "react";
import { FiRefreshCw } from "react-icons/fi";

/**
 * Shared sidebar + topbar shell used by AdminDashboard, HostDashboard and
 * ViewBookingPage so the three "back office" screens share one look.
 */
function DashboardLayout({
  brandIcon,
  brandLabel,
  navItems,
  activeKey,
  onNavSelect,
  topbarTitle,
  topbarSubtitle,
  onRefresh,
  topbarRight,
  children
}) {
  return (
    <div className="dash-shell">
      <style>{DASHBOARD_LAYOUT_CSS}</style>

      <div className="dash-sidebar">
        <div className="dash-brand">
          <span className="dash-brand-icon">{brandIcon}</span>
          <span>{brandLabel}</span>
        </div>

        <div className="dash-divider" />

        <nav className="dash-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`dash-nav-link ${activeKey === item.key ? "active" : ""}`}
              onClick={() => onNavSelect && onNavSelect(item.key)}
            >
              <span className="dash-nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="dash-main">
        <div className="dash-topbar">
          <div>
            <h4 className="dash-topbar-title">{topbarTitle}</h4>
            {topbarSubtitle && (
              <div className="dash-topbar-subtitle">{topbarSubtitle}</div>
            )}
          </div>

          <div className="dash-topbar-right">
            {topbarRight}
            {onRefresh && (
              <button className="dash-btn-refresh" onClick={onRefresh} title="Refresh">
                <FiRefreshCw size={18} />
              </button>
            )}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

export const DASHBOARD_LAYOUT_CSS = `
  :root {
    --dash-primary: #C1622D;
    --dash-primary-dark: #a04f24;
    --dash-secondary: #2f6849;
    --dash-dark: #1E3A2E;
    --dash-light: #F7F3EC;
    --dash-border: #e6ddcf;
    --dash-muted: #8a8078;
  }

  .dash-shell {
    display: flex;
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--dash-light);
  }

  .dash-sidebar {
    width: 250px;
    flex: 0 0 250px;
    background: linear-gradient(180deg, #1E3A2E 0%, #12241c 100%);
    color: white;
    padding: 20px 0;
    box-shadow: 0 0.15rem 1.75rem 0 rgba(18, 36, 28, 0.2);
    position: sticky;
    top: 0;
    align-self: flex-start;
    min-height: 100vh;
    z-index: 1;
  }

  .dash-brand {
    height: 4.375rem;
    font-size: 1.2rem;
    font-weight: 800;
    padding: 1.5rem 1rem;
    text-align: center;
    letter-spacing: 0.05rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .dash-brand-icon {
    font-size: 1.5rem;
    display: flex;
  }

  .dash-divider {
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    margin: 1rem 0;
  }

  .dash-nav {
    display: flex;
    flex-direction: column;
  }

  .dash-nav-link {
    color: rgba(255, 255, 255, 0.8);
    padding: 1rem;
    font-weight: 600;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    transition: all 0.3s;
    width: 100%;
    background: none;
    border: none;
    border-right: 3px solid transparent;
    text-align: left;
    cursor: pointer;
  }

  .dash-nav-link:hover,
  .dash-nav-link.active {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }

  .dash-nav-link.active {
    border-right: 3px solid var(--dash-primary);
  }

  .dash-nav-icon {
    font-size: 0.9rem;
    display: flex;
  }

  .dash-main {
    flex: 1 1 auto;
    min-width: 0;
    padding: 24px;
    background-color: var(--dash-light);
  }

  .dash-topbar {
    min-height: 4.375rem;
    box-shadow: 0 1px 2px rgba(30, 58, 46, 0.06);
    background-color: white;
    border: 1px solid var(--dash-border);
    padding: 0.75rem 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 20px;
    border-radius: 14px;
  }

  .dash-topbar-title {
    font-family: 'Fraunces', Georgia, serif;
    font-weight: 600;
    color: var(--dash-dark);
    margin-bottom: 0.15rem;
  }

  .dash-topbar-subtitle {
    color: var(--dash-muted);
    font-size: 0.9rem;
  }

  .dash-topbar-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .dash-btn-refresh {
    background-color: transparent;
    border: none;
    color: var(--dash-dark);
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
  }

  .dash-btn-refresh:hover {
    color: var(--dash-primary);
    transform: rotate(180deg);
  }

  .dash-card {
    border: 1px solid var(--dash-border);
    border-radius: 16px;
    box-shadow: 0 1px 2px rgba(30, 58, 46, 0.05);
    background: white;
    margin-bottom: 20px;
    transition: all 0.25s ease;
  }

  .dash-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(30, 58, 46, 0.1);
  }

  .dash-search-box {
    position: relative;
  }

  .dash-search-box input {
    padding-left: 2.5rem;
    border-radius: 10px;
    border: 1px solid var(--dash-border);
    background: var(--dash-light);
  }

  .dash-search-box input:focus {
    background: white;
    border-color: var(--dash-primary);
    box-shadow: 0 0 0 3px rgba(193, 98, 45, 0.12);
  }

  .dash-search-box svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--dash-muted);
  }

  @media (max-width: 992px) {
    .dash-shell {
      flex-direction: column;
    }
    .dash-sidebar {
      width: 100%;
      flex-basis: auto;
      min-height: auto;
      position: relative;
      margin-bottom: 20px;
    }
  }
`;

export default DashboardLayout;
