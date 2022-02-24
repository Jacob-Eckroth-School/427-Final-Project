import {Library} from "./Library"
interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
  }

export class PreviousLibraries<Library> implements IStack<Library>{
    private storage: Library[] = [];
    constructor(private capacity:number = Infinity){}
    push(item: Library): void {
        if(this.size() === this.capacity){
            throw Error("Stack has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }
    pop(): Library | undefined{
        return this.storage.pop();
    }
    peek(): Library | undefined{
        return this.storage[this.size() - 1];
    }
    size(): number {
        return this.storage.length;
    }
    
}