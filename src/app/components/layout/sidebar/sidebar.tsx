import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Assessment as ReportIcon,
  ShoppingBasket as OrderIcon,
} from "@mui/icons-material";
import styles from "./sidebar.module.scss";
import Link from "next/link";
import { deepOrange } from "@mui/material/colors";

const Sidebar = ({ menuOpen }: any) => {
  const menuItem = [
    { title: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
    { title: "Category", icon: <ReportIcon />, route: "/category" },
    { title: "Wallpaper", icon: <OrderIcon />, route: "/wallpaper" },
  ];
  return (
    <div className={styles.sidebar}>
      <div className="ml-4">
        <div className="flex">
          <Avatar sx={{ bgcolor: deepOrange[500], marginBottom: 2 }}>N</Avatar>
          <div className={
                  `${menuOpen ? styles["menu--text"] : styles["menu--text-closed"]} ml-2`
                 }>
            <p>Huy Hoàng Trần</p>
            <p className="text-gray-500 text-xs">hoangth@gmail.com</p>
          </div>
        </div>
        <p className="text-gray-500 text-xs">Navigation</p>
      </div>

      {menuItem.map((item, index) => (
        <List
          key={index}
          component="nav"
          aria-label="main mailbox folders"
          style={{ padding: 0 }}
        >
          <Link href={item.route} className={styles.link}>
            <div className={styles["menu-sidebar"]}>
              <div className={styles["icon-sidebar"]}>{item.icon}</div>
              <div
                className={
                  menuOpen ? styles["menu--text"] : styles["menu--text-closed"]
                }
              >
                {item.title}
              </div>
            </div>
          </Link>
        </List>
      ))}
    </div>
  );
};

export default Sidebar;
