type SuggestionProvider = (input: string) => Promise<string[]>;

export class Autocomplete {
  private inputElement: HTMLInputElement;
  private suggestions: string[];
  private suggestionProvider: SuggestionProvider;
  private container: HTMLDivElement | any;

  constructor(inputElement: HTMLInputElement, suggestionProvider: SuggestionProvider) {
    this.inputElement = inputElement;
    this.suggestions = [];
    this.suggestionProvider = suggestionProvider;

    this.createSuggestionsContainer();
    this.addStyles();

    this.inputElement.addEventListener('input', this.onInput.bind(this));
    this.inputElement.addEventListener('blur', this.onBlur.bind(this));
    this.container.addEventListener('mousedown', this.onMouseDown.bind(this));
  }

  private async onInput(event: Event): Promise<void> {
    const input = (event.target as HTMLInputElement).value;
    if (input.length > 0) {
      this.suggestions = await this.suggestionProvider(input);
      this.showSuggestions();
    } else {
      this.clearSuggestions();
    }
  }

  private onBlur(): void {
    // Delay clearing to allow click event to register
    setTimeout(() => this.clearSuggestions(), 100);
  }

  private onMouseDown(event: MouseEvent): void {
    event.preventDefault(); // Prevent blur event on input
  }

  private createSuggestionsContainer(): void {
    this.container = document.createElement('div');
    this.container.classList.add('autocomplete-suggestions');
    this.inputElement.parentNode?.insertBefore(this.container, this.inputElement.nextSibling);
  }

  private showSuggestions(): void {
    this.container.innerHTML = '';

    this.suggestions.forEach((suggestion) => {
      const suggestionElement = document.createElement('div');
      suggestionElement.classList.add('autocomplete-suggestion');
      suggestionElement.textContent = suggestion;
      suggestionElement.addEventListener('click', () => {
        this.inputElement.value = suggestion;
        this.clearSuggestions();
      });
      this.container.appendChild(suggestionElement);
    });

    this.container.style.display = 'block';
  }

  private clearSuggestions(): void {
    this.container.innerHTML = '';
    this.container.style.display = 'none';
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.innerHTML = `
      .autocomplete-suggestions {
        position: absolute;
        border: 1px solid #ccc;
        border-top: none;
        z-index: 1000;
        background: white;
        max-height: 200px;
        overflow-y: auto;
        width: ${this.inputElement.offsetWidth}px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .autocomplete-suggestion {
        padding: 8px;
        cursor: pointer;
      }
      .autocomplete-suggestion:hover {
        background: #f0f0f0;
      }
    `;
    document.head.appendChild(style);
  }
}
