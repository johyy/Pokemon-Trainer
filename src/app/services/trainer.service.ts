import { Injectable } from '@angular/core';
import { StorageKeys } from 'src/enums/storage-keys.enum';
import { StorageUtil } from 'src/utils/storage.util';
import { Trainer } from '../models/trainer.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private _trainer?: Trainer; 

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  deleteTrainer(trainer: Trainer){
    StorageUtil.storageRemove<Trainer>(StorageKeys.Trainer);
  }

  constructor() {
    this._trainer = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
  }

  public inCatched(pokemonName: string): boolean {
    if (this._trainer) {
      if(!this.trainer?.pokemon.includes(pokemonName)){
        return false;
      }
    }
    return true; 
  }

  public addToCatched(pokemonName: string): void {
    if (this._trainer) {
      this._trainer.pokemon.push(pokemonName);
    }
  }

  public removeFromCatched(pokemonName: string): void {
    if (this._trainer) {
      this._trainer.pokemon = this._trainer.pokemon.filter((pokemon: string) => pokemon !== pokemonName)
    }
  }

}
