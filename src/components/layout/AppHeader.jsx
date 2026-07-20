export function AppHeader({ user, onLogout }) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Deployment lab home">
        <span className="brand-index">01</span>
        <span>
          <strong>DEPLOYMENT LAB</strong>
          <small>MICROSERVICE STUDY</small>
        </span>
      </a>

      {user ? (
        <div className="account-menu">
          <span className="account-name">{user.name}</span>
          <button className="text-button" type="button" onClick={onLogout}>
            Log out
          </button>
        </div>
      ) : (
        <span className="header-status">AUTH GATEWAY / 3000</span>
      )}
    </header>
  );
}
