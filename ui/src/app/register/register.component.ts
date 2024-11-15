import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  name: string = '';
  gender: string = '';
  age: number | null = null;
  email: string = '';
  phone: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  register() {
    const bodyData = {
      userName: this.username,
      name: this.name,
      gender: this.gender,
      age: this.age,
      email: this.email,
      phone: this.phone,
      password: this.password
    };

    this.http.post("http://localhost:5000/register", bodyData).subscribe({
      next: (response: any) => {
        console.log("Registration successful", response);
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
      }
    });
  }
}
