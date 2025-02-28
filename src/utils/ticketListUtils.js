
// Генерируем уникальный ключ
function generateKey() {
    return `key-${Math.random().toString(36).substring(2, 15)}`;
}
// Вычисляем общее количество остановок для билета
const getTotalStops = (ticket) => ticket.segments.reduce((total, segment) => total + segment.stops.length, 0);

// Определяем, должен ли билет быть видимым на основе фильтров
const isVisibleByFilters = (ticket, showAllTickets, valueFilterTransfer) => {
  if (!showAllTickets) {
    return valueFilterTransfer.includes( getTotalStops(ticket));
  }
  return true;
};
  
export { generateKey, isVisibleByFilters };