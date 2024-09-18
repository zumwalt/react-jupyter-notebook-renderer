import React, { useState, useEffect } from "react";
import { themes } from "prism-react-renderer";
import MarkdownCell from "./components/MarkdownCell";
import CodeCell from "./components/CodeCell";
import "./style.css";

import styles from "./NotebookRenderer.module.css";

export interface NotebookRendererProps {
  notebookContent: string | object;
  theme?: any;
  classNames?: {
    notebookContainer?: string;
    notebookLoading?: string;
    notebookCell?: string;
    notebookMarkdownCell?: string;
    notebookCodeCell?: string;
    notebookRawCell?: string;
    notebookCellInput?: string;
    notebookCellOutput?: string;
    notebookOutputContainer?: string;
    notebookOutputToggle?: string;
    notebookOutputText?: string;
    notebookOutputImage?: string;
    notebookOutputStream?: string;
    notebookOutputError?: string;
    notebookCodeContainer?: string;
    notebookCodeContent?: string;
  };
  components?: {
    Button?: React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  };
}

interface Notebook {
  cells: any[];
}

const JupyterNotebookRenderer = ({
  notebookContent,
  theme = themes.vsDark,
  classNames,
  components
}: NotebookRendererProps) => {
  const [notebook, setNotebook] = useState<Notebook | null>(null);

  useEffect(() => {
    try {
      const parsedNotebook =
        typeof notebookContent === "string"
          ? JSON.parse(notebookContent)
          : notebookContent;
      setNotebook(parsedNotebook);
    } catch (error) {
      console.error("Error parsing notebook:", error);
      setNotebook(null);
    }
  }, [notebookContent]);

  const renderCell = (cell: any, index: number) => {
    switch (cell.cell_type) {
      case "markdown":
        return <MarkdownCell key={index} content={cell.source.join("")} />;
      case "code":
        return (
          <CodeCell
            key={index}
            cell={cell}
            theme={theme}
            classNames={classNames}
            components={components}
          />
        );
      case "raw":
        return (
          <div
            key={index}
            className={
              classNames?.notebookRawCell || styles["jupyter-notebook-raw-cell"]
            }
          >
            {cell.source.join("")}
          </div>
        );
      default:
        return null;
    }
  };

  if (!notebook) {
    return (
      <div
        className={
          classNames?.notebookLoading || styles["jupyter-notebook-loading"]
        }
      >
        Loading notebook...
      </div>
    );
  }

  return (
    <div
      className={
        classNames?.notebookContainer || styles["jupyter-notebook-container"]
      }
    >
      {notebook.cells.map((cell: any, index: number) =>
        renderCell(cell, index)
      )}
    </div>
  );
};

export default JupyterNotebookRenderer;
