import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ANGULAR_TEAM } from './data/data';
export class InMemDevsService implements InMemoryDbService {
  createDb() {
    return { devs: ANGULAR_TEAM };
  }
}
