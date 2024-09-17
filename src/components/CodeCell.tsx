import React, { useState } from "react";
import { Highlight } from "prism-react-renderer";
import * as Collapsible from "@radix-ui/react-collapsible";
import styles from "../NotebookRenderer.module.css";
import { NotebookRendererProps } from "../NotebookRenderer";
import AnsiContent from "./AnsiContent";

interface CodeCellProps {
  cell: any;
  theme: any;
  classNames?: NotebookRendererProps["classNames"];
}

interface OutputRendererProps {
  output: any;
  classNames?: NotebookRendererProps["classNames"];
}

interface CellOutputProps {
  outputs: any;
  classNames?: NotebookRendererProps["classNames"];
}

const CellOutput = ({ outputs, classNames }: CellOutputProps) => {
  return (
    <div
      className={
        classNames?.notebookCellOutput || styles["jupyter-notebook-cell-output"]
      }
    >
      {outputs.map((output: any, index: number) => (
        <OutputRenderer key={index} output={output} />
      ))}
    </div>
  );
};

const OutputRenderer = ({ output, classNames }: OutputRendererProps) => {
  console.log(`Found output: ${output}`);
  switch (output.output_type) {
    case "execute_result":
    case "display_data":
      if (output.data["text/plain"]) {
        console.log(`Found text output: ${output.data["text/plain"].join("")}`);
        return (
          <pre
            className={
              classNames?.notebookOutputText ||
              styles["jupyter-notebook-output-text"]
            }
          >
            <AnsiContent text={output.data["text/plain"].join("")} />
          </pre>
        );
      }
      if (output.data["image/png"]) {
        console.log("output.data[image/png]", output.data["image/png"]);
        return (
          <img
            className={
              classNames?.notebookOutputImage ||
              styles["jupyter-notebook-output-image"]
            }
            src={`data:image/png;base64,${output.data["image/png"]}`}
            alt="Output"
          />
        );
      }
      return null;
    case "stream":
      console.log(`Found stream output: ${output.text.join("")}`);
      return (
        <pre
          className={
            classNames?.notebookOutputStream ||
            styles["jupyter-notebook-output-stream"]
          }
        >
          <AnsiContent text={output.text.join("")} />
        </pre>
      );
    case "error":
      console.log(`Found error output: ${output.text.join("")}`);
      return (
        <pre
          className={
            classNames?.notebookOutputError ||
            styles["jupyter-notebook-output-error"]
          }
        >
          <AnsiContent text={output.text.join("")} />
        </pre>
      );
    default:
      return null;
  }
};

const CodeCell = ({ cell, theme, classNames }: CodeCellProps) => {
  const [showOutput, setShowOutput] = useState(false);

  return (
    <div
      className={
        classNames?.notebookCodeCell || styles["jupyter-notebook-code-cell"]
      }
    >
      <div
        className={
          classNames?.notebookCodeContainer ||
          styles["jupyter-notebook-code-container"]
        }
      >
        <Highlight code={cell.source.join("")} language="python" theme={theme}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={
                classNames?.notebookCodeContent ||
                styles["jupyter-notebook-code-content"]
              }
              style={style}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
      {cell.outputs && cell.outputs.length > 0 && (
        <Collapsible.Root
          open={showOutput}
          onOpenChange={setShowOutput}
          className={
            classNames?.notebookOutputContainer ||
            styles["jupyter-notebook-output-container"]
          }
        >
          <Collapsible.Trigger asChild>
            <button
              className={
                classNames?.notebookOutputToggle ||
                styles["jupyter-notebook-output-toggle"]
              }
            >
              {showOutput ? "Hide Output" : "Show Output"}
            </button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <CellOutput outputs={cell.outputs} />
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </div>
  );
};

export default CodeCell;
