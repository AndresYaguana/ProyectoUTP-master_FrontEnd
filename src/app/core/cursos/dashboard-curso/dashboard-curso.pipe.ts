import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'dashboard-curso'
  })
  export class DashboardCursoPipe implements PipeTransform {
    transform(value: string, args?: any): string {
        // Example transformation (replace with your logic)
        const uppercaseTitle = value.toUpperCase();
        return uppercaseTitle;
      }
    }