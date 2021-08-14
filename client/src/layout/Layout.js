import React from "react";
import { Menu, Button, Image } from "semantic-ui-react";
import logo from "../logo.svg";

function Layout({ children }) {
  const handleLogout = () => {
    localStorage.setItem("token", "");
    window.location.href = "/";
  };

  return (
    <div>
      <div className="layout">
        <a as="a" className="item" href="/dashboard?tabindex=0">
          <Image size="tiny" src={logo} />
        </a>
        <Button
          onClick={handleLogout}
          style={{ alignSelf: "center" }}
          position="right"
        >
          Logout
        </Button>
      </div>

      {children}
    </div>
  );
}

export default Layout;
