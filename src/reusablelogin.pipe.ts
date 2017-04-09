import { Injectable, PipeTransform, Pipe } from '@angular/core';

/**
 * Transforms any input value
 */
@Pipe({
  name: 'loginPipe'
})
@Injectable()
export class LoginPipe implements PipeTransform {
  transform(value: any, args: any[] = null): string {
    return value;
  }
}
