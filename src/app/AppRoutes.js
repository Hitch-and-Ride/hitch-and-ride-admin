import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../app/shared/Spinner";

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const Trips = lazy(() => import("./Booking/Trips"));
const Equpments = lazy(() => import("./Booking/Equipments"));
const Typography = lazy(() => import("./Booking/Typography"));

const BasicElements = lazy(() => import("./form-elements/BasicElements"));

const BasicTable = lazy(() => import("./tables/BasicTable"));

const User = lazy(() => import("./settings/User"));
const Vehicle = lazy(() => import("./settings/Vehicle"));
const Driver = lazy(() => import("./settings/Driver"));
const Routes = lazy(() => import("./settings/Route")); // using 'routes'  to avoid clashing the react router dom route
const Station = lazy(() => import("./settings/Station"));
const Passenger = lazy(() => import("./settings/Passenger"));


const Error404 = lazy(() => import("./error-pages/Error404"));
const Error500 = lazy(() => import("./error-pages/Error500"));

const Login = lazy(() => import("./user-pages/Login"));
const Register1 = lazy(() => import("./user-pages/Register"));
const Lockscreen = lazy(() => import("./user-pages/Lockscreen"));

const BlankPage = lazy(() => import("./general-pages/BlankPage"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />

          <Route path="/booking/trips" component={Trips} />
          <Route path="/booking/equipments" component={Equpments} />
          <Route path="/booking/typography" component={Typography} />

          <Route
            path="/form-Elements/basic-elements"
            component={BasicElements}
          />

          <Route path="/tables/basic-table" component={BasicTable} />

          <Route path="/settings/user" component={User} />
          <Route path="/settings/vehicle" component={Vehicle} />
          <Route path="/settings/passenger" component={Passenger} />
          <Route path="/settings/driver" component={Driver} />
          <Route path="/settings/station" component={Station} />
          <Route path="/settings/route" component={Routes} />


          <Route path="/user-pages/login-1" component={Login} />
          <Route path="/user-pages/register-1" component={Register1} />
          <Route path="/user-pages/lockscreen" component={Lockscreen} />

          <Route path="/error-pages/error-404" component={Error404} />
          <Route path="/error-pages/error-500" component={Error500} />

          <Route path="/general-pages/blank-page" component={BlankPage} />

          <Redirect to="/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
