import React from "react";
import { Button, Image } from "semantic-ui-react";
import logo from "../logo.svg";
import { withRouter } from "react-router-dom";

function Layout({ children, history }) {
  const handleLogout = () => {
    localStorage.setItem("token", "");
    window.location.href = "/";
  };

  const isLoginOrSignup = () => {
    return (
      history.location.pathname === "/" ||
      history.location.pathname === "/sign-up"
    );
  };

  return (
    <div>
      <div className="layout">
        {!isLoginOrSignup() ? (
          <a as="a" className="item" href="/dashboard?tabindex=0">
            <Image size="tiny" src={logo} />
          </a>
        ) : (
          <Image size="tiny" src={logo} />
        )}
        {!isLoginOrSignup() && (
          <Button
            onClick={handleLogout}
            style={{ alignSelf: "center" }}
            position="right"
          >
            Logout
          </Button>
        )}
      </div>

      {children}
    </div>
  );
}

export default withRouter(Layout);
