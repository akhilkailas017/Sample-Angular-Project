import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { AppComponent } from '../app.component';
// import { BrowserModule } from '@angular/platform-browser';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  signin() {
    this.router.navigateByUrl('/register');
  }

  login() {
    const bodyData = {
      username: this.username,
      password: this.password,
    };

    this.http.post("http://localhost:5000/login", bodyData).subscribe({
      next: (response: any) => {
        if (response.status) {
          document.cookie = `Authtoken=${response.token}`;
          this.router.navigateByUrl('/dashboard');
        } else {
          this.errorMessage = "Incorrect username or password";
          alert(this.errorMessage);
        }
      },
      error: (error) => {
        console.error("Login error:", error);
        this.errorMessage = "Login failed. Please try again.";
        alert(this.errorMessage);
      }
    });
  }
}
