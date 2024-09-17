import React from "react";
import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import DOMPurify from "dompurify";
import styles from "../NotebookRenderer.module.css";
import { NotebookRendererProps } from "../NotebookRenderer";

interface MarkdownCellProps {
  content: string;
  classNames?: NotebookRendererProps["classNames"];
}

const MarkdownCell = ({ content, classNames }: MarkdownCellProps) => {
  const urlTransformer = (url: string) => {
    // Sanitize the URL using DOMPurify
    const sanitizedUrl = DOMPurify.sanitize(url);

    if (sanitizedUrl.startsWith("data:image")) {
      return sanitizedUrl;
    }
    return defaultUrlTransform(sanitizedUrl);
  };

  // Sanitize the entire content
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      className={
        classNames?.notebookMarkdownCell ||
        styles["jupyter-notebook-markdown-cell"]
      }
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ node, ...props }) => {
            // Sanitize src and alt attributes
            const sanitizedSrc = DOMPurify.sanitize(props.src || "");
            const sanitizedAlt = DOMPurify.sanitize(props.alt || "");
            return <img {...props} src={sanitizedSrc} alt={sanitizedAlt} />;
          }
        }}
        urlTransform={urlTransformer}
      >
        {sanitizedContent}
      </Markdown>
    </div>
  );
};

export default MarkdownCell;
