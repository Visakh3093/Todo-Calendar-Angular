import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { Event, InitialState } from '../model/common.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private fireStore:Firestore) { }
  todoCollection = collection(this.fireStore,"todo")
  addTodo(todo:InitialState):Observable<void>
  {
   const promise = addDoc(this.todoCollection,todo).then(()=>{})
   return from(promise)
  } 

  getTodo():Observable<Event[]>
  {
     return collectionData(this.todoCollection,{
      'idField':'id'
     }) as Observable<Event[]>
  }

  deleteTodo(id:string):Observable<any>
  {
   const docRef = doc(this.fireStore,'todo/'+id)
   const promise = deleteDoc(docRef)
   return from(promise)
  }
  updateTodo(id:string,todo:InitialState):Observable<any>
  {
     const docRef = doc(this.fireStore,'todo/'+id);
     const promise = updateDoc(docRef,todo)
     return from(promise)
  }
}
