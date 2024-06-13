// dashboard.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inicio'
})
export class InicioPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    // Example transformation (replace with your logic)
    const uppercaseTitle = value.toUpperCase();
    return uppercaseTitle;
  }
}