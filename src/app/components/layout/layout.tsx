import React, { useState } from "react";
import styles from "./layout.module.scss";
import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";

type Props = {
  children: React.ReactNode;
};
const Layout: React.FC<Props> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div>
      <Header handleMenuToggle={handleMenuToggle} />
      <div className={styles.container}>
        <Sidebar menuOpen={menuOpen} />
        <div className={styles["main-content"]}>
          <div className="absolute w-97 pr-3">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
