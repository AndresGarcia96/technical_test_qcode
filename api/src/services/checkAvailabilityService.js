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

  const busyMinutes = quotesOfTheDay.reduce(
    (total, quote) => total + parseInt(quote.Duration),
    0
  );

  const availableMinutes = MINUTES_PER_DAY - busyMinutes; // 8 horas = 480 minutos

  const spacesAvailable = Math.floor(availableMinutes / MIN_MINUTES_PER_QUOTE);

  return spacesAvailable;
};

module.exports = calculateAvailableSpaces;
