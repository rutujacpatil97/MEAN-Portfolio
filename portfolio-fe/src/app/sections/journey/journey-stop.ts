import { JourneyStop, JourneyStopView } from "../../core/profile.model";

// Short names for the station signs. A "short" field in the journey data takes priority.
const SHORT_NAMES: Record<string, string> = {
  "ICICI Lombard": "ICICI Lombard",
  "Clover Infotech": "Clover Infotech",
  "Tata Consultancy Services": "TCS",
  "SIES Graduate School of Technology": "SIES GST",
  "D.G. Ruparel College": "Ruparel",
  "D.A.V. Public School": "DAV",
};

const MONTH_NUMBERS: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

/** Turns "Dec 2024 – Aug 2026" into "12.2024-08.2026" so it can be shown on the seven-segment display. */
export function periodToDigits(period: string): string {
  const dates = [...period.matchAll(/(?:([A-Z][a-z]{2})\s)?(\d{4})/g)];
  return dates
    .map(([, month, year]) =>
      month ? `${MONTH_NUMBERS[month]}.${year}` : year,
    )
    .join("-");
}

/** Adds the display-only fields (organisation, short name, date digits) to a journey stop. */
export function toStopView(stop: JourneyStop): JourneyStopView {
  // Schools are named by "place", jobs by "station".
  const organisation = (stop.kind === "edu" ? stop.place : stop.station) ?? "";
  return {
    ...stop,
    organisation,
    shortName: stop.short ?? SHORT_NAMES[organisation] ?? organisation,
    dateDigits: periodToDigits(stop.period),
  };
}
