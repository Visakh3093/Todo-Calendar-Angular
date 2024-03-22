import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { isEmpty, random } from 'lodash';
import { TodoService } from '../../services/todo.service';
import { Event, InitialState } from '../../model/common.interface';
import { ModalComponent } from '../modal/modal.component';
import { Store } from '@ngrx/store';
import { selectModal } from '../../common/modal/modal.selector';
import { setModal } from '../../common/modal/modal.action';
import { setUpdateTodo, updateTodo } from '../../common/todo/todo.action';
import { selectIsupdate, selectTodo } from '../../common/todo/todo.selector';



@Component({
  selector: 'app-full-callender',
  standalone: true,
  imports: [FullCalendarModule, DatePipe, ReactiveFormsModule, CommonModule,ModalComponent],
  templateUrl: './full-callender.component.html',
  styleUrl: './full-callender.component.css',

})
export class FullCallenderComponent implements OnInit {

  constructor(private todoService: TodoService,private store:Store) { }
  todoId:string = ''
  tostMsg:string = ''
  isUpdate:boolean = false
  modal: boolean = false
  successModal: boolean = false
  propData:any
  events: Event[] = [ ]
  errorObj: { [key: string]: string } = {}
  formData = new FormGroup({
    title: new FormControl("", [Validators.required]),
    start: new FormControl("", [Validators.required]),
    end: new FormControl("", [Validators.required]),

  })

  initialState: InitialState = {
    title: '',
    start: '',
    end: '',
    id:''
  }

  formtDate(date:Date)
  {
    const currentDate = new Date(date);
    const nextDate = new Date(currentDate.getTime() + (24 * 60 * 60 * 1000));
    const formattedNextDate = nextDate.toISOString().split('T')[0];
    console.log(formattedNextDate);
  }

  ngOnInit(): void {
    this.store.select(selectIsupdate).subscribe(res=>{
      console.log("isUpdate:",res);
      this.isUpdate = res
      if(res)
      {
        this.store.select(selectTodo).subscribe((res)=>{
        console.log("ReduxData: ",res);
        this.todoId = res?.id ?? ''
        const data:InitialState = {
              end:res.end,
              start:res.start,
              title:res.title
        }
        console.log("data: ",data);
        this.formData.patchValue(data)
        this.store.dispatch(setModal({modal:false}))
 
        })
      } 
    })

// 

    this.store.select(selectModal).subscribe((res)=>{
      this.modal = res
    })

    this.todoService.getTodo().subscribe(res => {
      this.events = res
      this.calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        weekends: true,
        events: this.events,
        eventClick: this.handleClick.bind(this)
      }
    }, err => {
      console.log("Get-Error: ", err);

    })
  }


  handleValidate() {
    Object.keys(this.formData.value).forEach((item: string) => {
      if (this.formData.get(item)?.errors?.['required']) {
        this.errorObj[item] = item + " is required"
      }
    })
    return this.errorObj
  }

  handleSubmit() {
    this.successModal = false
    this.tostMsg = ''
    this.errorObj = {}
    this.handleValidate()

    if (isEmpty(this.errorObj)) {
      const value = this.formData.getRawValue()
      console.log("Value: ",value.end);

      if (!isEmpty(value)) {
        
        this.todoService.addTodo(value as InitialState).subscribe(res => {
          console.log("Todo added");
           this.successModal = true
           this.tostMsg = "New Event added successfully"
           window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
           setTimeout(()=>{
              this.successModal = false
              this.tostMsg = ''
           },2000)
        }, err => {
          console.log("Error: ", err);

        })
      }


      this.formData.reset(this.initialState)

      setTimeout(() => {
        this.successModal = false
      }, 3000)
    }
    else {
      console.log("Validation: ", this.errorObj);

    }
  }

  handleUpdate()
  {
    this.tostMsg = ''
    this.successModal = false
    this.errorObj = {}
    this.handleValidate()
    if (isEmpty(this.errorObj)) {
      const value = this.formData.getRawValue()
      if (!isEmpty(value) && this.todoId) {
        console.log("Value: ",value);
        this.todoService.updateTodo(this.todoId,value as InitialState).subscribe((res)=>{
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
          this.store.dispatch(setUpdateTodo({isUpdate:false}))
          this.store.dispatch(updateTodo(this.initialState))
          this.isUpdate = false
            this.formData.reset(this.initialState)
            this.successModal = true
            this.tostMsg = value.title + ' event updated successfully'

            setTimeout(()=>{
              this.successModal = false
              this.tostMsg = ''
            },3000)
            
        })
      }
  }
}
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: this.events,
    eventClick: this.handleClick.bind(this),
  }
  handleClick(arg: any) {
    console.log("Arg: ", arg.event);
    this.propData = arg.event
    const data:Event = {
      end:arg.event.endStr ?arg.event.endStr : arg.event.startStr,
      id:arg.event.id,
      start:arg.event.startStr,
      title:arg.event.title
    }
    this.store.dispatch(updateTodo(data))
    this.store.dispatch(setModal({modal:true}))
  }
}
