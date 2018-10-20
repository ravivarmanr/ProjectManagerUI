import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {

  transform(items: any[], path: string[], order: number): any[] {
    if (!items || !path || !order) return items;

    return items.sort((a: any, b: any) => {
      path.forEach(property => {
        a = a[property];
        b = b[property];
      })
      return a > b ? order : order * (- 1);
    })

  }
}