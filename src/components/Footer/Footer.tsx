import BackToTop from "./BackToTop";

function Footer() {
  return (
    <footer
      className="site-footer bg-slate-800 text-slate-100  "
      role="contentinfo"
    >
      <div className="site-info ">
        <div className="container m-auto relative py-9 ">
          <BackToTop />

          <span className="sep"> Copyright © 2024 姚迎迎 </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
