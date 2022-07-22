import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes'
})
export class PipesPipe implements PipeTransform {

  transform(arreglo: any[], texto: string): any[] {
    if(texto === ''){
      return arreglo;
    }

    texto = texto.toLowerCase();
    return arreglo.filter(item => {
      var dato = item.nombre;
      return dato.toLowerCase().includes(texto);
    });
  }

}
