import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { ResultPaneComponent } from './components/result-pane/result-pane.component';
import { SparkService } from './services/spark.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    LanguageSelectorComponent,
    CodeEditorComponent,
    ResultPaneComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedLanguage: string = 'python';
  codeInput: string = this.getStarterCode('python');
  resultOutput: string = '// Output will appear here...';
  isDarkTheme = true;

  constructor(private sparkService: SparkService) {}

  get editorTheme() {
    return this.isDarkTheme ? 'vs-dark' : 'vs-light';
  }

  setLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.codeInput = this.getStarterCode(lang);
  }

  setCode(code: string) {
    this.codeInput = code;
  }

  runCode() {
    this.resultOutput = 'Running Spark job...';
    this.sparkService.runCode(this.codeInput, this.selectedLanguage).subscribe({
      next: res => this.resultOutput = res.output,
      error: err => this.resultOutput = 'Error: ' + err.error.detail
    });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  getStarterCode(lang: string): string {
    switch (lang) {
      case 'python':
        return `# Available files : /data/consumers.csv and /data/sales.csv
# Preloaded tables: consumers, sales

salesDF = spark.read.option("header", True).csv("/data/sales.csv")
consumersDF = spark.read.option("header", True).csv("/data/consumers.csv")

# Perform INNER JOIN on sales.consumer_id = consumers.id
joinedDF = salesDF.join(consumersDF, salesDF["consumer_id"] == consumersDF["id"])

# Show result
joinedDF.show()`;
      
    case 'sql':
      return `-- Available tables: consumers, sales
-- Example SQL query on preloaded tables

SELECT * FROM consumers LIMIT 10;`;
  
      default:
        return '';
    }
  }
}