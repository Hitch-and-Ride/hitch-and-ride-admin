import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import SettingsPanel from './shared/SettingsPanel';
import Footer from './shared/Footer';
import { withTranslation } from "react-i18next";

function App(props) {
  const [isFullPageLayout, setIsFullPageLayout] = useState(false);

  useEffect(() => {
    onRouteChanged();
  }, [props.location]);


  
  const onRouteChanged = () => {
    console.log("ROUTE CHANGED");
    const { i18n, location } = props;
    const body = document.querySelector('body');
    if (location.pathname === '/layout/RtlLayout') {
      body.classList.add('rtl');
      i18n.changeLanguage('ar');
    } else {
      body.classList.remove('rtl');
      i18n.changeLanguage('en');
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/user-pages/login-1', '/user-pages/register-1', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
    if (fullPageLayoutRoutes.includes(location.pathname)) {
      setIsFullPageLayout(true);
      document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
    } else {
      setIsFullPageLayout(false);
      document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
    }
  };

  let navbarComponent = !isFullPageLayout ? <Navbar /> : '';
  let sidebarComponent = !isFullPageLayout ? <Sidebar /> : '';
  let SettingsPanelComponent = !isFullPageLayout ? <SettingsPanel /> : '';
  let footerComponent = !isFullPageLayout ? <Footer /> : '';

  return (
    <div className="container-scroller">
      {navbarComponent}
      <div className="container-fluid page-body-wrapper">
        {sidebarComponent}
        <div className="main-panel">
          <div className="content-wrapper">
            <AppRoutes />
            {SettingsPanelComponent}
          </div>
          {footerComponent}
        </div>
      </div>
    </div>
  );
}

export default withTranslation()(withRouter(App));
