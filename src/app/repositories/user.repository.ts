import { Injectable } from '@angular/core';
import { DataClientService } from '../services/http-client.service';
import { Repository } from './repository';

@Injectable()
export class UserRepository extends Repository {
  constructor(httpClient: DataClientService) {
    super(httpClient);
  }
}
