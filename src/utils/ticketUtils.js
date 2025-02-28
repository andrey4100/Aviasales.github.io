

// Используем Intl.NumberFormat для форматирования цены
const formatPrice = (price) => {

  const formatter = new Intl.NumberFormat(undefined, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
};

  //  Получаем URL логотипа авиакомпании
  const getCarrierLogoUrl = (carrierCode) => `//pics.avs.io/99/36/${carrierCode}.png`;

// Форматируем время отправления в формате ЧЧ:ММ
function formatDepartureTime(dateString) {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}
  
  // Форматируем время прибытия в формате ЧЧ:ММ
function formatArrivalTime(departureDateString, durationMinutes) {
  const arrivalTime = new Date(new Date(departureDateString).getTime() + durationMinutes * 60000);
  return arrivalTime.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}
  
// Форматируем продолжительность полета в формате Чч Мм
  function formatTravelDuration(durationMinutes) {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    return `${hours}ч ${minutes}м`; //  Используем шаблонные литералы
  }
  
  // Возвращаем правильное склонение слова "пересадка"
  function getTransfersWordForm(count) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;
  
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
      return 'пересадок';
    }
    if (lastDigit === 1) {
      return 'пересадка';
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'пересадки';
    }
    return 'пересадок';
  }
  
  export { formatPrice, getCarrierLogoUrl, formatDepartureTime, formatArrivalTime, formatTravelDuration, getTransfersWordForm };