import { InMemoryDbService } from 'angular-in-memory-web-api';
 
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Abdul Kalam' },
      { id: 2, name: 'Harry Potter' },
      { id: 3, name: 'Robert Patison' },
      { id: 4, name: 'Dulquer Salman' },
      { id: 5, name: 'Raj Kapoor' },
    ];
    return {heroes};
  }
}