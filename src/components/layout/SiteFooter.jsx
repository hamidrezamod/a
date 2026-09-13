import { profile } from '../../content/site/profile.js';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <p>{profile.footer.credit}</p>
        <p>
          © {year} {profile.footer.rights}
        </p>
      </div>
    </footer>
  );
}
