import { Injectable } from '@angular/core';
import { Hero } from './hero';

//import { HEROES } from './mock-heroes';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService} from './message.service';
import { InMemoryDataService} from './in-memory-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InMemoryDbService} from 'angular-in-memory-web-api';
import { catchError, map, tap} from 'rxjs/operators';
import { error } from 'selenium-webdriver';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService{

  constructor(private http: HttpClient,
    private messageService: MessageService) { }
  //Synchronous
  /*getHeroes() : Hero[]{
    return HEROES;
  }
  */ 
  
  private heroesUrl = 'api/heroes';

  /*private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }*/
//Asynchronous
/*Get heroes from the server */
getHeroes (): Observable<Hero[]> {
  this.messageService.add('HeroService: Heroes Listed');
  return this.http.get<Hero[]>(this.heroesUrl)
  .pipe(
    catchError(this.handleError('getHeroes', []))
  );
}

//Get hero by id. 404 if id not found
getHero(id : number) : Observable<Hero> {
  this.messageService.add(`HeroService: fetched hero id = ${id}`);
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url)
  .pipe(
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}

//Update a hero on the server
updateHero(hero : Hero) : Observable<any>{
  return this.http.put(this.heroesUrl, hero, httpOptions)
  .pipe(
    catchError(this.handleError<any>('updateHero'))
);
}

//Add a Hero
addHero(hero : Hero) : Observable<Hero>{
  return this.http.post(this.heroesUrl, hero, httpOptions)
   .pipe(
      catchError(this.handleError<any>('addHero'))
   )
}

//Delete a hero 
deleteHero(hero : Hero | number) : Observable<Hero>{
  const id = typeof hero === 'number' ? hero : hero.id;
  const url = `${this.heroesUrl}/${id}`;
  return this.http.delete<Hero>(url, httpOptions)
  .pipe(
    catchError(this.handleError<Hero>('deleteHero'))
  );
}

//search by name

searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Hero[]>(`api/heroes/?name=${term}`)
  .pipe(
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * operation - name of the operation that failed
 *  result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result ?: T){
  return (error : any) : Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error);
    // TODO: better job of transforming error for user consumption
    this.messageService.add(`${operation} failed : ${error.message}`);
    // Let the app keep running by returning an empty result.
    return of (result as T);
  }
}
 


}
