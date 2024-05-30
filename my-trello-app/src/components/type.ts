
export interface User {
    id: number;
    email: string;
    fullname: string; 
    accesstoken: string | null;
    refreshtoken: string | null;
  }
  
  export interface Board {
    id: number;
    title: string;
    ownerID: number;
  }
  
  export interface Column {
    id: number;
    title: string;
    desc: string;
    boardID: number;
  }
  
  export interface Card {
    id: number;
    title: string;
    desc: string;
    columnID: number;
    boardID: number;
    duedate: Date; 
    reminderdate: Date; 
  }