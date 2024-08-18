// @ts-nocheck
import { Node, Text } from "slate";

const serialize = (nodes: Node[]): string => {
  return nodes.map((n) => Node.string(n)).join("\n");
};

// Or if you need a more complex HTML structure including formatting:
const serializeToHTML = (nodes: Node[]): string => {
  return nodes.map((node) => serializeNode(node)).join("\n");
};

const serializeNode = (node: Node): string => {
  if (Text.isText(node)) {
    let text = escapeHtml(node.text);
    if (node.bold) {
      text = `<strong>${text}</strong>`;
    }
    if (node.italic) {
      text = `<em>${text}</em>`;
    }
    if (node.underline) {
      text = `<u>${text}</u>`;
    }
    return text;
  }

  const children = node.children.map((n) => serializeNode(n)).join("");

  switch (node.type) {
    case "paragraph":
      return `<p>${children}</p>`;
    case "code":
      return `<pre><code>${children}</code></pre>`;
    case "block-quote":
      return `<blockquote>"${children}"</blockquote>`;
    case "thead":
      return `<thead>${children}</thead>`;
    case "tbody":
      return `<tbody>${children}</tbody>`;
    case "table":
      return `<table>${children}</table>`;
    case "table-row":
      return `<tr>${children}</tr>`;
    case "table-cell":
      return `<td>${children}</td>`;
    case "table-cell-header":
      return `<th>${children}</th>`;
    case "header":
      return `<header>${children}</header>`;
    case "section":
      return `<section>${children}</section>`;
    case "block-quote":
      return `<blockquote>${children}</blockquote>`;
    case "bulleted-list":
      return `<ul>${children}</ul>`;
    case "heading-one":
      return `<h1>${children}</h1>`;
    case "heading-two":
      return `<h2>${children}</h2>`;
    case "heading-three":
      return `<h3>${children}</h3>`;
    case "heading-four":
      return `<h4>${children}</h4>`;
    case "heading-five":
      return `<h5>${children}</h5>`;
    case "heading-six":
      return `<h6>${children}</h6>`;
    case "list-item":
      return `<li>${children}</li>`;
    case "numbered-list":
      return `<ol>${children}</ol>`;
    default:
      return children;
  }
};

const escapeHtml = (string: string): string => {
  const htmlEscapes = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  return string.replace(/[&<>"']/g, (match) => htmlEscapes[match]);
};

export { serialize, serializeNode, serializeToHTML };
