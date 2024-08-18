import {
  EditorCode,
  EditorBlockQuote,
  DefaultParagraph,
} from "./EditorComponents";

export default function RenderElementCallback(props: any) {
  switch (props.element.type) {
    case "code":
      return <EditorCode {...props} />;
    case "block-quote":
      return <EditorBlockQuote {...props} />;
    case "thead":
      return <thead {...props.attributes}>{props.children}</thead>;
    case "tbody":
      return <tbody {...props.attributes}>{props.children}</tbody>;
    case "table":
      return <table {...props.attributes}>{props.children}</table>;
    case "table-row":
      return <tr {...props.attributes}>{props.children}</tr>;
    case "table-cell":
      return <td {...props.attributes}>{props.children}</td>;
    case "table-cell-header":
      return <th {...props.attributes}>{props.children}</th>;
    case "header":
      return <header {...props.attributes}>{props.children}</header>;
    case "section":
      return <section {...props.attributes}>{props.children}</section>;
    case "block-quote":
      return <blockquote {...props.attributes}>{props.children}</blockquote>;
    case "bulleted-list":
      return <ul {...props.attributes}>{props.children}</ul>;
    case "heading-one":
      return <h1 {...props.attributes}>{props.children}</h1>;
    case "heading-two":
      return <h2 {...props.attributes}>{props.children}</h2>;
    case "heading-three":
      return <h3 {...props.attributes}>{props.children}</h3>;
    case "heading-four":
      return <h4 {...props.attributes}>{props.children}</h4>;
    case "heading-five":
      return <h5 {...props.attributes}>{props.children}</h5>;
    case "heading-six":
      return <h6 {...props.attributes}>{props.children}</h6>;
    case "list-item":
      return <li {...props.attributes}>{props.children}</li>;
    case "numbered-list":
      return <ol {...props.attributes}>{props.children}</ol>;
    // case "link":
    //   return (
    //     <a href={element.url} {...props}>
    //       props. {children}
    //     </a>
    //   );
    case "image":
      return <img {...props} />;
    default:
      return <DefaultParagraph {...props} />;
  }
}
