import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/auth/interfaces';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'role', 'acciones'];
  dataSource!: MatTableDataSource<User>;
  public users: User[] = [];
  public usuario!: User;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UsersService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(resp => {
      console.log(resp);
      this.users = resp;
      this.dataSource = new MatTableDataSource(resp);
      console.log('dataSource');
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  deleteUser(user: User) {
    console.log('Usuario eliminado', user);
    this.userService.delete(user.id).subscribe(resp => {
      console.log(resp);
      this.changeDetectorRef.detectChanges();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showSnackbar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2500,
    });
  }
}
