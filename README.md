This is a simple input auto complete/suggestions component

> for lack of a better name

`nicanor-autocomplete` is a lightweight and customizable JavaScript/TypeScript package that provides autocomplete functionality for input fields. It supports single words, phrases, and complete sentences, and allows for optional icons and custom CSS for styling.

### Features
- Lightweight and easy to use
- Supports single words, phrases, and complete sentences
- Optional icons on the left and/or right of suggestions
- Customizable with user-supplied CSS
- Easily integrate into any JavaScript/TypeScript project

### Installation
You can install the package using npm:
```
npm install nicanor-autocomplete
```

### Usage
Here’s how to use the Autocomplete class with a simple suggestion provider:

``` Js
import { Autocomplete } from 'nicanor-autocomplete';

// Example suggestion provider function for sentences and words
const suggestionProvider = async (input: string): Promise<string[]> => {
  const suggestions = [
    'The quick brown fox jumps over the lazy dog.',
    'The early bird catches the worm.',
    'A picture is worth a thousand words.',
    'Actions speak louder than words.',
    'A journey of a thousand miles begins with a single step.',
    'To be or not to be, that is the question.',
    'All that glitters is not gold.',
    'Fortune favors the bold.',
    'Honesty is the best policy.',
    'Time is money.',
    'apricot', 'avocado', 'blueberry', 'blackberry', 'cranberry', 'fellow',
    'The quick brown faster bear.'
  ];

  const lowerInput = input.toLowerCase();

  const startsWithSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().startsWith(lowerInput)
  );

  const includesSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(lowerInput) && !startsWithSuggestions.includes(suggestion)
  );

  return [...startsWithSuggestions, ...includesSuggestions];
};

const inputElement = document.getElementById('search-input') as HTMLInputElement;
new Autocomplete(inputElement, suggestionProvider);
```

With Icons and Custom CSS
You can also add optional icons to the left and/or right of each suggestion and supply your own CSS for customization:

``` Js
import { Autocomplete } from 'nicanor-autocomplete';

// Example suggestion provider function for sentences and words
const suggestionProvider = async (input: string): Promise<string[]> => {
  const suggestions = [
    'The quick brown fox jumps over the lazy dog.',
    'The early bird catches the worm.',
    'A picture is worth a thousand words.',
    'Actions speak louder than words.',
    'A journey of a thousand miles begins with a single step.',
    'To be or not to be, that is the question.',
    'All that glitters is not gold.',
    'Fortune favors the bold.',
    'Honesty is the best policy.',
    'Time is money.',
    'apricot', 'avocado', 'blueberry', 'blackberry', 'cranberry', 'fellow',
    'The quick brown faster bear.'
  ];

  const lowerInput = input.toLowerCase();

  const startsWithSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().startsWith(lowerInput)
  );

  const includesSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(lowerInput) && !startsWithSuggestions.includes(suggestion)
  );

  return [...startsWithSuggestions, ...includesSuggestions];
};

const inputElement = document.getElementById('search-input') as HTMLInputElement;
new Autocomplete(inputElement, suggestionProvider, {
  leftIcon: 'path/to/left-icon.png',
  rightIcon: 'path/to/right-icon.png',
  customCSS: `
    .autocomplete-suggestion {
      background-color: #f9f9f9;
    }
    .autocomplete-suggestion:hover {
      background-color: #e0e0e0;
    }
  `
});
```

#### HTML Structure
Ensure you have an input element in your HTML:

``` Js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Autocomplete Example</title>
</head>
<body>
  <input type="text" id="search-input" placeholder="Type to search..." style="position: relative;">
  <script src="path/to/your/bundled/js/file.js"></script>
</body>
</html>
```

### Props
- `Autocomplete` - Constructor
- `new Autocomplete(inputElement: HTMLInputElement, suggestionProvider: SuggestionProvider, options?: AutocompleteOptions)`
- `inputElement`: The input element to attach the autocomplete functionality to.
- `suggestionProvider`: A function that takes the input string and returns a promise that resolves to an array of suggestions.
- `options`: An optional object to specify additional options:
- `leftIcon` (string): optional URL of the icon to display on the left of each suggestion.
- `rightIcon` (string): optional URL of the icon to display on the right of each suggestion.
- `customCSS` (string): Custom CSS to style the suggestions.

#### Contributions
Contributions are welcome! Please open an issue or submit a pull request

#### License
This project is licensed under the MIT License.
