import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interface';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly APIGoogle = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private httpClient: HttpClient) { }

  buscar(termoPesquisa: string): Observable<Item[]> {
    // https://www.googleapis.com/books/v1/volumes?q=search+terms
    const params = new HttpParams().append('q', termoPesquisa); // "q" é o parâmetro esperado no link do google acima

    return this.httpClient.get<LivrosResultado>(this.APIGoogle, { params })
      .pipe(
        //tap(retornoAPI => console.log('Tap no fluxo', retornoAPI)),   // tap: utilizado para debug não altera ou interfere nos dados no pipe
        map(retornoAPI => retornoAPI.items ?? []),  // ?? "se for nulo" retorna vazio []
        //tap(retornoAPI => console.log('Tap após o map', retornoAPI))
      );
  }

}
