import { Moment } from "moment";
import moment from 'moment';

export class DateHelper {
  static defaultDateFormat(): string {
    return 'YYYY-MM-DD';
  }

  static dateFormatter(date: string, format="fr-FR") {
    if (!date) return "";
    return new Intl.DateTimeFormat(format, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone : "Europe/Madrid"
    }).format(new Date(date));
  }

  static dateFormatterWithHours(date: string) {
    if (!date) return "";
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone : "Europe/Madrid"
    }).format(new Date(date));
  }

  static format(date: Date) {
    if (!date) return "";
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  }

  static hourFormatter(date: string) {
    if (!date) return "";
    return new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  }

  static momentToDate(moment: Moment): Date {
    return moment ? new Date(moment.format()) : null;
  }

  static momentToDateWithFormat(moment: Moment): string {
    return moment.format(this.defaultDateFormat());
  }

  static addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    console.log(result)
    return result;
  }

}
