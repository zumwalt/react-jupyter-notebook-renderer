# React Jupyter Notebook Renderer

A simple React component for rendering Jupyter Notebooks.

## Installation

```bash
npm install react-jupyter-notebook-renderer
```

## Usage

```tsx
import { JupyterNotebookRenderer } from "react-jupyter-notebook-renderer";

<JupyterNotebookRenderer notebookContent={notebookContent} />;
```

## Props

- `notebookContent`: The content of the notebook to render. Can be a JSON string or an object.
- `theme`: The theme to use for code blocks. Defaults to `vsDark` from `@elastic/vscode-theme`. Additional options can be found [here](https://github.com/elastic/vscode-theme/tree/main/themes).The
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
- `components`: Custom components for the notebook:
  - `Button`: Custom button component. Requires a `<button>` element.

## Example

```tsx
import { JupyterNotebookRenderer } from "react-jupyter-notebook-renderer";

<JupyterNotebookRenderer notebookContent={notebookContent} />;
```
