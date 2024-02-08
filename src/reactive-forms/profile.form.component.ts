import { Component, Signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  styles: `
    .form-container {
      max-width: 400px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }

    input,
    select {
      width: 100%;
      padding: 8px;
      margin-bottom: 16px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    input[type="radio"] {
      margin-right: 8px;
    }

    .gender-label {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }

    button {
      background-color: #4caf50;
      color: #fff;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }
  `,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="profileForm" class="form-container" (ngSubmit)="onSubmit()">
      <label for="firstname">➡️ First Name</label>
      <input type="text" id="firstname" name="firstname" formControlName="firstname" placeholder="Your name">

      <label for="lastname">➡️ Last Name</label>
      <input type="text" id="lastname" name="lastname" formControlName="lastname" placeholder="Your last name">

      <label for="email">➡️ Email</label>
      <input type="text" id="email" name="email" formControlName="email" placeholder="Your email">

      <div class="gender-label">
        <label>➡️ Gender</label>
        <input type="radio" value="male" id="gender-male" name="gender" formControlName="gender"> Male
        <input type="radio" value="female" id="gender-female" name="gender" formControlName="gender"> Female
      </div>

      <label for="country">🌏 Country</label>
      <select id="country" name="country" formControlName="country">
        <option value="1" value>UK</option>
        <option value="2">USA</option>
        <option value="3">Argentina</option>
        <option value="4">Brasil</option>
      </select>

      <button type="submit">Submit</button>

    </form>
  `,
})
export class ProfileEditorComponent {
  profileForm!: FormGroup;
  firstnameSignal: Signal<any> | undefined;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    });

    // Use Angular Signals to represent form control values as signals
    // firstNameSignal is created using the toSignal function. 
    // represents the value of the 'firstName' form control. 
    // so now instead of manually subscribing to the valueChanges of the form control, we can directly use the signal in our template
    this.firstnameSignal = toSignal(
      this.profileForm.get('firstname')?.valueChanges.pipe(debounceTime(300)) ??
        of(null),
      {}
    );
  }

  onSubmit() {
    console.log('submited values: ', this.profileForm.value);
  }
}
