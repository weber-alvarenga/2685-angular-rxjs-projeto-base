import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, catchError, debounceTime, distinctUntilChanged, empty, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { Item, LivrosResultado } from 'src/app/models/interface';
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
  listaLivros: LivrosResultado;

  constructor(private livrosService: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges    // $ é convenção para nomeação de variáveis observable
    .pipe(
      debounceTime(PAUSA),
      filter((valorDigitado) => valorDigitado.length > 3),                      // filtra para continuar somente quando tiver mais de 3 caracteres digitados
      distinctUntilChanged(),                                                   // compara o valor com o imediatamente anterior se for igual não segue
      switchMap((valorDigitado) => this.livrosService.buscar(valorDigitado)),   // switchMap interrompe o fluxo das requisições anteriores
      tap(() => console.log('Requisição ao servidor.')),
      map((retornoAPI) => this.listaLivros = retornoAPI),
      map((retornoAPI) => retornoAPI.items ?? []),                              // ?? "se for nulo" retorna vazio []
      map((items) => this.retornoAPIParaLivros(items)),
      catchError(() => {
        this.mensagemErro = 'Ops, ocorreu um erro. Recarrege a aplicação';
        return EMPTY;
      })
    //  catchError(erro => {
    //    console.log(erro);
    //    return throwError(() => new Error(this.mensagemErro = 'Ops, ocorreu um erro. Recarrege a aplicação'));
    //  })
    )


  retornoAPIParaLivros(items: Item[]): LivroVolumeInfo[] {

    return items.map(item => {
      return new LivroVolumeInfo(item);
    })

  }

}



