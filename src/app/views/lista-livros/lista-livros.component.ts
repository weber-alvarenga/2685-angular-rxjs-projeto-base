import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, catchError, debounceTime, distinctUntilChanged, empty, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { Item } from 'src/app/models/interface';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 500;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {


  campoBusca = new FormControl();
  mensagemErro = '';

  constructor(private livrosService: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges    // $ é convenção para nomeação de variáveis observable
    .pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length > 3),
      tap(() => console.log('Fluxo inicial de digitação.')),
      distinctUntilChanged(), // compara o valor com o imediatamente anterior se for igual não segue
      switchMap((valorDigitado) => this.livrosService.buscar(valorDigitado)),   // switchMap interrompe o fluxo das requisições anteriores
      tap(() => console.log('Requisição ao servidor.')),
      map((items) => this.retornoAPIParaLivros(items)),
      catchError(() => {
        this.mensagemErro = 'Ops, ocorreu um erro. Recarrege a aplicação';
        return EMPTY;
      })
//      catchError(erro => {
//        console.log(erro);
//        return throwError(() => new Error(this.mensagemErro = 'Ops, ocorreu um erro. Recarrege a aplicação'));
//      })
    )


  retornoAPIParaLivros(items: Item[]): LivroVolumeInfo[] {

    return items.map(item => {
      return new LivroVolumeInfo(item);
    })

  }

}



