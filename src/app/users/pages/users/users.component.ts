import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/auth/interfaces';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];
  displayedColumns: string[] = ['name','apellido', 'email','role', 'actions'];


  constructor(
    private userService: UsersService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers(); // Actualizar la lista después de eliminar un usuario
    });
  }

  updateUser(userId: string) {
    this.router.navigate(['users/edit', userId]);
  }

}
