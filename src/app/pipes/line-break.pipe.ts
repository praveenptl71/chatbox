import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineBreak'
})
export class LineBreakPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.replace(/(\\r\\n)|([\r\n])/gmi, '<br/>');
  }

}
