import { Component, DestroyRef, inject } from '@angular/core';
import { User, UserService } from './users.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  providers: [UserService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [];
  private subscription!: Subscription;
  private destroyRef = inject(DestroyRef)
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data.sort((a, b) => a.name.localeCompare(b.name));
    });

    this.destroyRef.onDestroy(() => {
      this.subscription.unsubscribe();
    });
  }


}
