import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import Footer from "./Footer";
import { Link, Outlet } from "react-router-dom";
import AppNav from "./AppNav";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link to="/">
        <Logo />
      </Link>
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Sidebar;
