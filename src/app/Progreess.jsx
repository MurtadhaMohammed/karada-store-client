"use client";
import { useEffect } from "react";
import NProgress from "nprogress";

export default function ProgressBar() {
  const height = "3px";
  const color = "#7c3aed";

  const styles = (
    <style>
      {`
        #nprogress {
          pointer-events: none;
        }
        #nprogress .bar {
          background: ${color};
          position: fixed;
          z-index: 99999;
          top: 0;
          left: 0;
          width: 100%;
          height: ${height};
        }
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          opacity: 1.0;
          transform: rotate(3deg) translate(0px, -4px);
        }
    `}
    </style>
  );

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleClick = (event) => {
      const target = event.currentTarget;
      const isLink = target.tagName === "A";
      const isButton = target.tagName === "BUTTON";

      if (isLink) {
        const targetUrl = target.href;
        const currentUrl = location.href;
        if (targetUrl !== currentUrl) {
          NProgress.start();
        }
      } else if (isButton) {
        NProgress.start();
        setTimeout(() => NProgress.done(), 100); // Simulate a delay for button actions
      }
    };

    const attachClickListeners = () => {
      document.querySelectorAll("a, button.app-link").forEach((element) => {
        element.addEventListener("click", handleClick);
      });
    };

    const mutationObserver = new MutationObserver(attachClickListeners);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray) => {
        NProgress.done();
        return target.apply(thisArg, argArray);
      },
    });

    // Initial attachment of listeners
    attachClickListeners();

    return () => {
      mutationObserver.disconnect();
      document.querySelectorAll("a, button.app-link").forEach((element) => {
        element.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return styles;
}
