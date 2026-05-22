import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route, redirect} from "react-router-dom";
import "./App.css"
import Client from './components/Client';
import Footer from './components/Footer';
import AccessibilityStatement from './components/AccessibilityStatement';
import ContactFooter from './components/ContactFooter';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import WebsiteDisclaimer from './components/WebsiteDisclaimer';




function App() {
  const [orientation, setOrientation] = useState(null);
  const [appHeight, setAppHeight] = useState(0);
  const [appWidth, setAppWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    function determineOrientation() {
      window.innerWidth > window.innerHeight ? setOrientation('landscape') : setOrientation('portrait');
    }

    const isBrowserFullscreen = () => {
        return (
            window.outerWidth === window.screen.availWidth &&
            window.outerHeight === window.screen.availHeight
        );
    };

    const setHeight = () => {
        const height = window.visualViewport?.height ?? window.innerHeight;

        console.log(height);

        document.documentElement.style.setProperty("--app-height", `${height}px`);
        setAppHeight(height)
    };
  
    const setWidth = () => {
        const width = window.visualViewport?.width ?? window.innerWidth;

        console.log(width);

        document.documentElement.style.setProperty("--app-width", `${width}px`);
        setAppWidth(width)
      };

    const setPageHeightFunc = () => {
        const pageHeight = document.documentElement.scrollHeight;

        document.documentElement.style.setProperty(
            "--page-height",
            `${pageHeight}px`
        );

        setPageHeight(pageHeight);
    };

    const resetPageHeight = () => {
      document.documentElement.style.setProperty(
          "--page-height",
          `${0}px`
      );
      
      console.log(document.documentElement.style.getPropertyValue(
          "--page-height"
      ));

      setPageHeight(0)
    };
  
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setHeight();
        setWidth();
        resetPageHeight();
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPageHeightFunc();
            determineOrientation();
          })
        });
      });
    });

    function handleViewportChange() {
        // Let mobile Chrome finish resizing after orientation/UI changes
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setHeight();
            setWidth();
            resetPageHeight();
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setPageHeightFunc();
                determineOrientation();
              })
            });
          });
        });
      }
  
    window.screen.orientation.addEventListener("change", (event) => {
        handleViewportChange();
    });

    document.addEventListener("fullscreenchange", () => {
      handleViewportChange();
      console.log("fullscreen")
    });

    let previousFullscreen = isBrowserFullscreen();

    window.addEventListener("resize", () => {
      const currentFullscreen = isBrowserFullscreen();
  
      if (currentFullscreen !== previousFullscreen) {
          previousFullscreen = currentFullscreen;
          console.log("browser fullscreen changed");
          handleViewportChange();
      }
    });

    let lastOuterWidth = window.outerWidth;
    let lastOuterHeight = window.outerHeight;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;

    let maxSeenHeight = window.visualViewport?.height || window.innerHeight;

    const setMobileAppHeight = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;

      // Only grow height, never shrink it
      if (currentHeight > maxSeenHeight) {
        maxSeenHeight = currentHeight;

        document.documentElement.style.setProperty(
          "--app-height",
          `${maxSeenHeight}px`
        );

        setPageHeightFunc()
      }
    };

    if (isMobile) {
      setMobileAppHeight();

      setTimeout(setMobileAppHeight, 300);
      setTimeout(setMobileAppHeight, 800);
      setTimeout(setMobileAppHeight, 1500);

      function isNeutralZoom() {
        const scale = window.visualViewport?.scale ?? 1;
        return Math.abs(scale - 1) < 0.01;
      }

      function setMobileDimensions() {
        setMobileAppHeight();
        requestAnimationFrame(() => {
          if (!isNeutralZoom()) return;
          setWidth();
        })
      }

      window.visualViewport?.addEventListener("resize", setMobileDimensions);
      window.addEventListener("orientationchange", () => {
        maxSeenHeight = 0;
        setTimeout(setMobileAppHeight, 500);
      });

      return () => {
        window.visualViewport?.removeEventListener("resize", setMobileAppHeight);
      };
    }

    //Resize Window #Finally doesn't break zoom
    window.addEventListener("resize", () => {
      const isDesktop =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(pointer: coarse)").matches;

      if (!(isDesktop)) return;

      const outerWidthChanged = Math.abs(window.outerWidth - lastOuterWidth) > 10;
      const outerHeightChanged = Math.abs(window.outerHeight - lastOuterHeight) > 10;

      if (!outerWidthChanged && !outerHeightChanged) {
        // likely zoom, not real browser window resize
        return;
      }

      lastOuterWidth = window.outerWidth;
      lastOuterHeight = window.outerHeight;

      console.log("Actual browser window resized");

      handleViewportChange();
    });

  }, []);

  useEffect(() => {
      console.log(process.env.REACT_APP_API_URL)
      if (process.env.NODE_ENV === 'development') {
        console.log('Running in development mode');
      } else if (process.env.NODE_ENV === 'production') {
        console.log('Running in production mode');
      }
    }, []
  )

  return (
    <> 
      <BrowserRouter future={{ v7_startTransition: true }}> 
        <Routes>
          <Route path="/" element={<Client orientation={orientation} appHeight={appHeight} appWidth={appWidth} pageHeight={pageHeight} />}/> 
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/website-disclaimer" element={<WebsiteDisclaimer />} />
          <Route path="/accessibility" element={<AccessibilityStatement />} />
          <Route path="/contact-footer" element={<ContactFooter />} /> 
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
    
  );
}

export default App;
