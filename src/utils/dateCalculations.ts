export function calculateAge(birthDate: Date) {
  const now = new Date();
  const diff = now.getTime() - birthDate.getTime();

  const milliseconds = diff;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.436875); // Average month length
  const years = Math.floor(days / 365.25);

  // Calculate days until next birthday
  const nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday < now) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  // Estimate conception date (266 days before birth)
  const conceptionDate = new Date(birthDate.getTime() - (266 * 24 * 60 * 60 * 1000));

  return {
    milliseconds,
    seconds,
    minutes,
    hours,
    days,
    months,
    years,
    daysUntilBirthday,
    conceptionDate
  };
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(Math.floor(num));
}