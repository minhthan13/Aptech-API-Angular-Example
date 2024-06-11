export class DateConvertService {
  static formatDate(date: Date | string): string {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }
}
