import { Component, OnInit , Inject} from '@angular/core';
import { TodoService } from '../todo.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private todoservice: TodoService, public dialog: DialogComponent) { }
  displayedColumns = ['title', 'date', 'status'];
   todos = '';
   dataSource ;
  ngOnInit() {
    this.todoservice.gettodos().subscribe(res => {

      this.todos = res.json();
      this.dataSource = new MatTableDataSource(res.json());
      console.log(this.dataSource);
    });
    }

  logout() {
   return this.todoservice.logout();
  }
  openDialog() {
    return this.dialog.openDialog();
  }
  applyFilter(filterValue: string) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filteredData = filterValue;
  }
}
