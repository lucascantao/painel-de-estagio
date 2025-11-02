import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageRepositoryService {

  private readonly map = {
    local: localStorage,
    session: sessionStorage
  }

  constructor() { }

  load<T>(key: string, storageType: 'local' | 'session' = 'local', defaultValue: T|null = null): T|null {
    const storage = this.map[storageType];
    const found = storage.getItem(key);
    if (found) {
      return JSON.parse(found);
    }
    return defaultValue;
  }

  save<T>(key: string, value: T, storageType: 'local' | 'session' = 'local'): void {
    const storage = this.map[storageType];
    const serialized = JSON.stringify(value);
    storage.setItem(key, serialized);
  }

  remove(key: string, storageType: 'local' | 'session' = 'local'): void {
    const storage = this.map[storageType];
    storage.removeItem(key);
  }
}
