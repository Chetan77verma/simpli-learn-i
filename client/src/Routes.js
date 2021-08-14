import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Checkout from "./components/Checkout/Checkout";

import CourseVideos from "./components/Dashboard/CourseVideos";

export default function Routes() {
  return (
    <Switch>
      <Route path="/sign-up">
        <Signup />
      </Route>
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/dashboard/:courseId">
        <CourseVideos />
      </Route>
      <Route path="/checkout">
        <Checkout />
      </Route>
      <Route path="/">
        <Login />
      </Route>
    </Switch>
  );
}
