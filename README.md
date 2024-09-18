# React Jupyter Notebook Renderer

A simple, unstyled React component for rendering Jupyter Notebooks.

## Installation

```bash
npm install react-jupyter-notebook-renderer
```

## Usage

```tsx
import { NotebookRenderer } from "react-jupyter-notebook-renderer";

<NotebookRenderer notebookContent={notebookContent} />;
```

## Props

- `notebookContent`: The content of the notebook to render. Can be a JSON string or an object.
- `theme`: The theme to use for code blocks. Code blocks are rendered with [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer). Defaults to `vsDark`. Additional options can be found [here](https://github.com/FormidableLabs/prism-react-renderer/tree/master/packages/prism-react-renderer/src/themes).
- `classNames`: Custom class names for the notebook:
  - `notebookContainer`
  - `notebookLoading`
  - `notebookCell`
  - `notebookMarkdownCell`
  - `notebookCodeCell`
  - `notebookCellInput`
  - `notebookCellOutput`
  - `notebookOutputContainer`
  - `notebookOutputToggle`
  - `notebookOutputText`
  - `notebookOutputImage`
  - `notebookOutputStream`
  - `notebookOutputError`
  - `notebookCodeContainer`
  - `notebookCodeContent`

## Contributing

Contributions are welcome! Please open an issue or submit a PR.
