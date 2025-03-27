import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class LanguageSelectorComponent {
  selectedLanguage = 'python';
  @Output() languageChange = new EventEmitter<string>();

  emitLanguage() {
    this.languageChange.emit(this.selectedLanguage);
  }
}