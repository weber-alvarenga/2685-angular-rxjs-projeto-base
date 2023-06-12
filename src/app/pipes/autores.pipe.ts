import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autores'
})
export class AutoresPipe implements PipeTransform {

  transform(autores: string[]): string {
    if (autores) {
      return autores[0];  // retorna somente o primeiro autor
    }

    return '';
  }

}
