import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/interface';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listaLivros: LivroVolumeInfo[];
  campoBusca: string = '';
  subscription: Subscription;
  //livro: Livro;

  constructor(private livrosService: LivroService) { }

  buscarLivros(): void {
/*
    this.livrosService.buscar(this.campoBusca).subscribe(
      (retornoAPI => console.log(retornoAPI)),
      (erro => console.log(erro))
    );
*/

    this.subscription =
      // nova notação para o comando acima
      this.livrosService.buscar(this.campoBusca).subscribe(
        {
          next: items => {
            this.listaLivros = this.retornoAPIParaLivros(items)
          },
          error: erro => console.log(erro),
          complete: () => console.log('Observable finalizado.') // não traz dados. indica a finalização do ciclo do observable
        }
      );

  }

  retornoAPIParaLivros(items: Item[]): LivroVolumeInfo[] {

    return items.map(item => {
      return new LivroVolumeInfo(item);
    })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



