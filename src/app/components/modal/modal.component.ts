import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Store } from '@ngrx/store';
import { setModal } from '../../common/modal/modal.action';
import { selectTodo } from '../../common/todo/todo.selector';
import { setUpdateTodo } from '../../common/todo/todo.action';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
  constructor(private todoService:TodoService,private store:Store){}

  @Input() prop:any

  ngOnInit(): void {
    
  }

  handleDelete(id:string)
  {
      this.todoService.deleteTodo(id).subscribe((res)=>{
        console.log("Dltd");
        this.store.dispatch(setModal({modal:false}))
      },err=>{
        console.log("Error: ",err);
      })
  }
  handleUpdate(id:string)
  {
    this.store.dispatch(setUpdateTodo({isUpdate:true}))
    this.store.dispatch(setModal({modal:false}))
  }

}
