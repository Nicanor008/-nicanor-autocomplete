type SuggestionProvider = (input: string) => Promise<string[]>;

interface AutocompleteOptions {
  leftIcon?: string;
  rightIcon?: string;
  customCSS?: string;
}

export class Autocomplete {
  private inputElement: HTMLInputElement;
  private suggestions: string[];
  private suggestionProvider: SuggestionProvider;
  private container!: HTMLDivElement;
  private leftIcon?: string;
  private rightIcon?: string;

  constructor(inputElement: HTMLInputElement, suggestionProvider: SuggestionProvider, options: AutocompleteOptions = {}) {
    this.inputElement = inputElement;
    this.suggestions = [];
    this.suggestionProvider = suggestionProvider;
    this.leftIcon = options.leftIcon;
    this.rightIcon = options.rightIcon;

    this.createSuggestionsContainer();
    this.addStyles(options.customCSS);

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

      if (this.leftIcon) {
        const leftIconElement = document.createElement('img');
        leftIconElement.src = this.leftIcon;
        leftIconElement.classList.add('left-icon');
        suggestionElement.appendChild(leftIconElement);
      }

      const suggestionText = document.createElement('span');
      suggestionText.textContent = suggestion;
      suggestionElement.appendChild(suggestionText);

      if (this.rightIcon) {
        const rightIconElement = document.createElement('img');
        rightIconElement.src = this.rightIcon;
        rightIconElement.classList.add('right-icon');
        suggestionElement.appendChild(rightIconElement);
      }

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

  private addStyles(customCSS?: string): void {
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
        display: flex;
        align-items: center;
        padding: 8px;
        cursor: pointer;
      }
      .autocomplete-suggestion:hover {
        background: #f0f0f0;
      }
      .left-icon, .right-icon {
        width: 20px;
        height: 20px;
        margin: 0 8px;
      }
      ${customCSS ? customCSS : ''}
    `;
    document.head.appendChild(style);
  }
}
