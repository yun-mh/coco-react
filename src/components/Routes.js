import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../routes/Auth";
import Feed from "../routes/Feed";
import Header from "./Header";
import SearchBar from "./SearchBar";

const LoggedInRoutes = () => (
  <div className="container mx-auto border-r bg-secondary-light min-h-screen">
    <Header />
    <div className="w-full pl-16">
      <SearchBar />
      <div className="p-8">
        <Switch>
          <Route exact path="/" component={Feed} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </div>
  </div>
);

const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Auth} />
    {/* <Route path="/reset" component={<div>Test</div>} /> */}
    <Redirect from="*" to="/" />
  </>
);

const AppRouter = ({ isLoggedIn }) => {
  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
