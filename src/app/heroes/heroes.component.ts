import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
// Just name only
/*hero = 'Shahid';*/

//Provided an id and name to hero
/*hero: Hero ={
id : 1,
name : 'Shahid'
};*/

// List of heroes
heroes : Hero[];
  constructor(private heroService : HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }
 
  add(name : string) : void {
    name = name.trim();
    if(!name) {return;}
    this.heroService.addHero({name} as Hero)
         .subscribe(hero => this.heroes.push(hero));
  }

  delete(hero : Hero) : void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  //Synchronous
  /*getHeroes() : void{
    this.heroes = this.heroService.getHeroes();
  }*/

  //Asynchronous
  getHeroes() : void{
   this.heroService.getHeroes()
             .subscribe(heroes =>  this.heroes = heroes);
             console.log(this.heroes);
  }
}
