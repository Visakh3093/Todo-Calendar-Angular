export interface InitialState {
    [key:string]:string;
    title:string;
    start:string;
    end:string;
  }

  export interface Event {
   
    title:string;
    start:string;
    end:string;
    id?:string;
  }
