import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private dialog: MatDialog , private todoservice: TodoService) { }

  todoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', [Validators.required, Validators.maxLength(20)]),


    DONE: new FormControl(false)
  });
  todos;
  ngOnInit() {
    this.todoservice.gettodos().subscribe(res => {

      this.todos = res.json();
      console.log(res.json());
    });
    }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',

    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });

  }

  todoFormSubmit(f) {

    this.todoservice.addTodo(f).subscribe(res => {
     // console.log(res);
      this.ngOnInit();
    });
  }
  onNoClick(): void {
    this.dialog.closeAll();

  }

}

