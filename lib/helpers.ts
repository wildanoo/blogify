import readingTime from "reading-time";
import { DateTime } from "luxon";
export const getReadingTime = (text: string, locale: string) => {
  const minute = readingTime(text).minutes;
  const minutesRounded = Math.floor(minute);
  if (locale === "de") {
    if (minutesRounded === 1) {
      return `${minutesRounded} Minute`;
    } else {
      return `${minutesRounded} Minuten`;
    }
  } else {
    if (minutesRounded === 1) {
      return `${minutesRounded} minute`;
    } else {
      return `${minutesRounded} minutes`;
    }
  }
};

export const getRelativeDate = (date: string, locale: string ) => {
  return DateTime.fromISO(date).setLocale("en-US").toRelative();
};
