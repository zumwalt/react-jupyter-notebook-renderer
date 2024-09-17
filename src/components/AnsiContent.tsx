import React from "react";

type ANSICode = {
  code: number;
  style: React.CSSProperties;
};

const ansiCodes: ANSICode[] = [
  { code: 30, style: { color: "black" } },
  { code: 31, style: { color: "red" } },
  { code: 32, style: { color: "green" } },
  { code: 33, style: { color: "yellow" } },
  { code: 34, style: { color: "blue" } },
  { code: 35, style: { color: "magenta" } },
  { code: 36, style: { color: "cyan" } },
  { code: 37, style: { color: "white" } },
  { code: 90, style: { color: "gray" } },
  { code: 1, style: { fontWeight: "bold" } },
  { code: 3, style: { fontStyle: "italic" } },
  { code: 4, style: { textDecoration: "underline" } },
  { code: 39, style: { color: "inherit" } },
  { code: 49, style: { backgroundColor: "inherit" } },
  { code: 40, style: { backgroundColor: "black" } },
  { code: 41, style: { backgroundColor: "red" } },
  { code: 42, style: { backgroundColor: "green" } },
  { code: 43, style: { backgroundColor: "yellow" } },
  { code: 44, style: { backgroundColor: "blue" } },
  { code: 45, style: { backgroundColor: "magenta" } },
  { code: 46, style: { backgroundColor: "cyan" } },
  { code: 47, style: { backgroundColor: "white" } }
];

const parseAnsiCodes = (text: string): { text: string; codes: number[] }[] => {
  const regex = /\u001b\[([0-9;]+)m/g;
  const parts: { text: string; codes: number[] }[] = [];
  let lastIndex = 0;
  let currentCodes: number[] = [];

  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, match.index),
        codes: [...currentCodes]
      });
    }
    const codes = match[1].split(";").map(Number);
    if (codes.indexOf(0) !== -1) {
      currentCodes = [];
    } else {
      currentCodes = [...currentCodes, ...codes];
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), codes: [...currentCodes] });
  }

  return parts;
};

const ansiToStyle = (codes: number[]): React.CSSProperties => {
  return codes.reduce((style, code) => {
    const ansiCode = ansiCodes.find((ac) => ac.code === code);
    return ansiCode ? { ...style, ...ansiCode.style } : style;
  }, {});
};

const AnsiContent: React.FC<{ text: string }> = ({ text }) => {
  const parts = parseAnsiCodes(text);

  return (
    <span>
      {parts.map((part, index) => (
        <span key={index} style={ansiToStyle(part.codes)}>
          {part.text}
        </span>
      ))}
    </span>
  );
};

export default AnsiContent;
