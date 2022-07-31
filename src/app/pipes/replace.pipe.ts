import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: any, regexValue: string, replace: string): string {
    let regex = new RegExp(regexValue, 'g');
    return value.replace(regex, replace);
  }

}
