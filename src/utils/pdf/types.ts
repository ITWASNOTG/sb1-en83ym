export interface Stats {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  months: number;
  years: number;
  daysUntilBirthday: number;
  conceptionDate: Date;
}

export interface StatData {
  key: string;
  label: string;
  value: string;
}