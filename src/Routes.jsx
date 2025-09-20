import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import ArExperienceLanding from "pages/ar-experience-landing";
import CameraPermissionSetup from "pages/camera-permission-setup";
import ArObjectLibrary from "pages/ar-object-library";
import MainArExperienceInterface from "pages/main-ar-experience-interface";
import ArSessionManagement from "pages/ar-session-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<ArExperienceLanding />} />
        <Route path="/ar-experience-landing" element={<ArExperienceLanding />} />
        <Route path="/camera-permission-setup" element={<CameraPermissionSetup />} />
        <Route path="/ar-object-library" element={<ArObjectLibrary />} />
        <Route path="/main-ar-experience-interface" element={<MainArExperienceInterface />} />
        <Route path="/ar-session-management" element={<ArSessionManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;