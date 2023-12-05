const axios = require("axios");

const MINUTES_PER_DAY = 480;
const MIN_MINUTES_PER_QUOTE = 30;
const SCHEDULE_APPOINTMENTS_URL =
  "https://luegopago.blob.core.windows.net/luegopago-uploads/Pruebas%20LuegoPago/data.json";

const VALID_DAYS = ["lunes", "martes", "miércoles", "jueves", "viernes"];

const getQuotes = async () => {
  const scheduledAppointments = await axios.get(SCHEDULE_APPOINTMENTS_URL);

  return scheduledAppointments.data;
};

const calculateAvailableSpaces = async (day) => {
  const lowerCaseDay = day.toLowerCase();

  if (!VALID_DAYS.includes(lowerCaseDay)) {
    return {
      message:
        "Día no válido. Por favor, ingrese un día de la semana entre Lunes a Viernes",
    };
  }

  const quotes = await getQuotes();

  const quotesOfTheDay = quotes.filter(
    (quote) => quote.Day.toLowerCase() === day.toLowerCase()
  );

  quotesOfTheDay.sort((a, b) => {
    if (a.Hour === b.Hour) {
      return 0;
    }
    return a.Hour < b.Hour ? -1 : 1;
  });

  let availableMinutes = MINUTES_PER_DAY;

  for (let i = 1; i < quotesOfTheDay.length; i++) {
    const currentQuote = quotesOfTheDay[i];
    const previousQuote = quotesOfTheDay[i - 1];

    const currentStartTime = convertHourToMinutes(currentQuote.Hour);
    const previousEndTime =
      convertHourToMinutes(previousQuote.Hour) +
      parseInt(previousQuote.Duration);

    const gap = currentStartTime - previousEndTime;

    if (gap < MIN_MINUTES_PER_QUOTE) {
      availableMinutes -= parseInt(currentQuote.Duration);
    } else {
      availableMinutes -= gap;
    }
  }

  return Math.floor(availableMinutes / MIN_MINUTES_PER_QUOTE);
};

const convertHourToMinutes = (hour) => {
  const [hourPart, minutePart] = hour.split(":");
  return parseInt(hourPart) * 60 + parseInt(minutePart);
};

module.exports = calculateAvailableSpaces;
