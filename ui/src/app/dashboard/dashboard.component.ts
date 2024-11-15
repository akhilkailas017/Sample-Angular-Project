import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [FormsModule,HttpClientModule,CommonModule],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  id: string = '';
  name: string = '';
  age: number | null = null;
  phone: string = '';
  persons: any[] = [];
  isEditing: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPersons();
  }

  // Fetch all persons
  fetchPersons() {
    this.http.get('http://localhost:5000/persons', { withCredentials: true }).subscribe({
      next: (data: any) => {
        this.persons = data;
      },
      error: (error) => console.error('Error fetching persons:', error)
    });
  }

  // Add a new person
  addPerson() {
    if (!this.id || !this.name || !this.age || !this.phone) {
      alert('Please fill all fields!');
      return;
    }

    const personData = { id: this.id, name: this.name, age: this.age, phone: this.phone };
    this.http.post('http://localhost:5000/person', personData, { withCredentials: true }).subscribe({
      next: (response: any) => {
        alert(response.message);
        this.fetchPersons();
        this.clearForm();
      },
      error: (error) => console.error('Error adding person:', error)
    });
  }

  // Edit a person's details (fill the form with person's current details)
  editPerson(person: any) {
    this.id = person.id;
    this.name = person.name;
    this.age = person.age;
    this.phone = person.phone;
    this.isEditing = true;
  }

  // Update a person's details
  updatePerson() {
    if (!this.id) {
      alert('No person selected for editing!');
      return;
    }

    const updatedData = { name: this.name, age: this.age, phone: this.phone };
    this.http.put(`http://localhost:5000/person/${this.id}`, updatedData, { withCredentials: true }).subscribe({
      next: (response: any) => {
        alert(response.message);
        this.fetchPersons();
        this.clearForm();
        this.isEditing = false;
      },
      error: (error) => console.error('Error updating person:', error)
    });
  }

  // Delete a person
  deletePerson(id: string) {
    if (confirm('Are you sure you want to delete this person?')) {
      this.http.delete(`http://localhost:5000/person/${id}`, { withCredentials: true }).subscribe({
        next: (response: any) => {
          alert(response.message);
          this.fetchPersons();
        },
        error: (error) => console.error('Error deleting person:', error)
      });
    }
  }

  // Clear form fields and reset state
  clearForm() {
    this.id = '';
    this.name = '';
    this.age = null;
    this.phone = '';
    this.isEditing = false;
  }

  // Navigate to home
  goToHome() {
    // Implement routing logic to navigate to the home page if required
  }
}
