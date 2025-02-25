export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// función 1. No se usa 😁
// export function formatDate1(date: string): string {
//   const [year, month, day] = date.split("-");
//   return `${day}/${month}/${year.slice(2)}`;
// }

// función 2. Esta si se usa 😁
export const formatDate2 = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:00`;
};

export function formatHour(hour: string): string {
  const hora24 = hour.slice(10, 16);
  const [hours, minutes] = hora24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12; // Convierte 0 a 12 para la medianoche
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

export function maullido(audioString: string) {
  const audio = new Audio(audioString);
  audio.play();
}

export function traducirFaseLunar(fase: string): string {
  switch (fase) {
    case "New Moon":
      return "Luna nueva";
    case "Waxing Crescent":
      return "Luna creciente";
    case "First Quarter":
      return "Cuarto creciente";
    case "Waxing Gibbous":
      return "Gibosa creciente";
    case "Full Moon":
      return "Luna llena";
    case "Waning Gibbous":
      return "Gibosa menguante";
    case "Last Quarter":
      return "Cuarto menguante";
    case "Waning Crescent":
      return "Creciente menguante";
    default:
      return "No se pudo determinar la fase lunar";
  }
}
