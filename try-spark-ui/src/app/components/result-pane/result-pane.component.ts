import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-result-pane',
  templateUrl: './result-pane.component.html',
  standalone: true,
  imports: [
    MatCardModule
  ]
})
export class ResultPaneComponent {
  @Input() result: string = '// Output will appear here...';
}