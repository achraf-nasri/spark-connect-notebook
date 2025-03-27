import {
  Component,
  EventEmitter,
  Output,
  Input,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-code-editor',
  template: `<div #editorContainer class="editor-container"></div>`,
  styles: [
    `.editor-container {
        width: 100%;
        height: 400px;
        border: 1px solid #ccc;
        border-radius: 8px;
      }`
  ],
  standalone: true
})
export class CodeEditorComponent implements AfterViewInit, OnChanges {
  @ViewChild('editorContainer') editorContainer!: ElementRef;
  @Input() language: string = 'scala';
  @Input() theme: string = 'vs-dark';
  @Input() codeInput: string = '';
  @Output() codeChange = new EventEmitter<string>();

  private editor: any;
  private monaco: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  async ngAfterViewInit() {
    if (this.isBrowser) {
      const monaco = await import('monaco-editor');
      this.monaco = monaco;
      this.registerAutocomplete(monaco);

      this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
        value: this.codeInput,
        language: this.language,
        theme: this.theme,
        automaticLayout: true
      });

      this.editor.onDidChangeModelContent(() => {
        const value = this.editor.getValue();
        this.codeChange.emit(value);
        this.setDiagnostics(value);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.editor) {
      if (changes['language']) {
        const model = this.editor.getModel();
        this.monaco.editor.setModelLanguage(model, this.language);
      }
      if (changes['theme']) {
        this.monaco.editor.setTheme(this.theme);
      }
      if (changes['codeInput'] && changes['codeInput'].currentValue !== this.editor.getValue()) {
        this.editor.setValue(this.codeInput);
      }
    }
  }

  private registerAutocomplete(monaco: any) {
    const languages = ['scala', 'java', 'python', 'sql'];
    for (const lang of languages) {
      monaco.languages.registerCompletionItemProvider(lang, {
        provideCompletionItems: () => {
          return {
            suggestions: [
              {
                label: 'print',
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: 'print(${1})',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
              },
              {
                label: 'if',
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: 'if (${1:condition}) {\n  $0\n}',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
              }
            ]
          };
        }
      });
    }
  }

  private setDiagnostics(value: string) {
    const model = this.editor.getModel();
    const markers = [];

    // Basic syntax checks per language
    if (this.language === 'python' && /[^:]:\s*$/.test(value)) {
      markers.push({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 10,
        message: 'Possible missing colon in Python syntax.',
        severity: this.monaco.MarkerSeverity.Warning
      });
    } else if ((this.language === 'java' || this.language === 'scala') && !value.trim().endsWith(';')) {
      markers.push({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 10,
        message: 'Possible missing semicolon.',
        severity: this.monaco.MarkerSeverity.Warning
      });
    } else if (this.language === 'sql' && !/select.+from/i.test(value)) {
      markers.push({
        startLineNumber: 1,
        startColumn: 1,
        endLineNumber: 1,
        endColumn: 10,
        message: 'Basic SQL syntax check failed: missing SELECT or FROM.',
        severity: this.monaco.MarkerSeverity.Warning
      });
    }

    this.monaco.editor.setModelMarkers(model, 'owner', markers);
  }
}
