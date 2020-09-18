import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../routes/Auth";
import Feed from "../routes/Feed";
import Notification from "../routes/Notification";
import Chat from "../routes/Chat";
import Search from "../routes/Search";
import Profile from "../routes/Profile";
import ProfileEdit from "../routes/ProfileEdit";
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
          <Route path="/search" component={Search} />
          <Route path="/notification" component={Notification} />
          <Route path="/chat" component={Chat} />
          <Route path="/:username/edit" component={ProfileEdit} />
          <Route path="/:username" component={Profile} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </div>
  </div>
);

const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Auth} />
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
