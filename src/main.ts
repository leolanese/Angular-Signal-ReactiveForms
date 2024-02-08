import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ProfileEditorComponent } from './reactive-forms/profile.form.component';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfileEditorComponent],
  template: `
    <h1>{{ title }}</h1>
    <app-reactive-form></app-reactive-form>
  `,
})
export class App {
  title = 'Angular Reactive Forms with Signals & StandAlone';
}

bootstrapApplication(App, {
  providers: [],
});
