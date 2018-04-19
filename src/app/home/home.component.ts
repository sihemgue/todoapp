import { Component, OnInit , Inject} from '@angular/core';
import { TodoService } from '../todo.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private todoservice: TodoService, public dialog: MatDialog) { }

   todos = '';

  ngOnInit() {
    this.todoservice.gettodos().subscribe(res => {

      this.todos = res.json();
    });
    }

  logout() {
   return this.todoservice.logout();
  }
  openDialog() {
    let dialog = this.dialog.open(DialogComponent );

    dialog.afterClosed()
      .subscribe();
  }

}
