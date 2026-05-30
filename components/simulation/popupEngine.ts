import {
  popupData,
  PhishingPopup,
} from "./popupData";

/* -------------------------------- */
/* CONFIGURATION */
/* -------------------------------- */

const MIN_DELAY = 1000 * 60 * 1; // 1 minute
const MAX_DELAY = 1000 * 60 * 5; // 5 minutes

const MAX_POPUPS_PER_SESSION = 3;

const excludedRoutes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/admin",
];

/* -------------------------------- */
/* SESSION STATE */
/* -------------------------------- */

let shownPopupIds: number[] = [];

let popupCount = 0;

let lastPopupTime = 0;

/* -------------------------------- */
/* RANDOM DELAY */
/* -------------------------------- */

export function getRandomDelay() {
  return (
    Math.floor(
      Math.random() *
        (MAX_DELAY - MIN_DELAY)
    ) + MIN_DELAY
  );
}

/* -------------------------------- */
/* ROUTE CHECK */
/* -------------------------------- */

export function isExcludedRoute(
  pathname: string
) {
  return excludedRoutes.some((route) =>
    pathname.startsWith(route)
  );
}

/* -------------------------------- */
/* CAN SHOW POPUP */
/* -------------------------------- */

// Configuration to toggle simulation popups globally
const ENABLE_SIMULATION_POPUPS = false;

/* -------------------------------- */
/* CAN SHOW POPUP */
/* -------------------------------- */

export function canShowPopup() {
  if (!ENABLE_SIMULATION_POPUPS) {
    return false;
  }

  const now = Date.now();

  // limit session popup count
  if (
    popupCount >=
    MAX_POPUPS_PER_SESSION
  ) {
    return false;
  }

  // prevent instant repeated popups
  if (
    now - lastPopupTime <
    1000 * 60 * 2
  ) {
    return false;
  }

  return true;
}

/* -------------------------------- */
/* RANDOM POPUP */
/* -------------------------------- */

export function getRandomPopup():
  | PhishingPopup
  | null {
  const availablePopups =
    popupData.filter(
      (popup) =>
        !shownPopupIds.includes(popup.id)
    );

  // reset if all shown
  if (availablePopups.length === 0) {
    shownPopupIds = [];

    return getRandomPopup();
  }

  const randomIndex = Math.floor(
    Math.random() *
      availablePopups.length
  );

  const selectedPopup =
    availablePopups[randomIndex];

  shownPopupIds.push(selectedPopup.id);

  popupCount++;

  lastPopupTime = Date.now();

  return selectedPopup;
}

/* -------------------------------- */
/* INTERACTION TRACKING */
/* -------------------------------- */

export function trackPopupInteraction(
  popupId: number,
  action:
    | "clicked"
    | "closed"
    | "ignored"
) {
  console.log(
    `[CyberSatark Simulation] Popup ${popupId} ${action}`
  );

  // future analytics system
  // firebase logging
  // user awareness scoring
  // phishing susceptibility tracking
}

/* -------------------------------- */
/* RESET SESSION */
/* -------------------------------- */

export function resetPopupSession() {
  shownPopupIds = [];

  popupCount = 0;

  lastPopupTime = 0;
}