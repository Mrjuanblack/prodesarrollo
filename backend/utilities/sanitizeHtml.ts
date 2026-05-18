import "server-only";
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p",
  "br",
  "strong",
  "em",
  "u",
  "s",
  "a",
  "h1",
  "h2",
  "h3",
  "h4",
  "ul",
  "ol",
  "li",
  "blockquote",
  "code",
  "pre",
  "img",
  "figure",
  "figcaption",
  "hr",
];

const ALLOWED_ATTR = [
  "href",
  "title",
  "target",
  "rel",
  "src",
  "alt",
  "width",
  "height",
  "class",
  "data-*",
];

/**
 * Sanitize rich-text HTML before persisting it. Strips script tags, event
 * handlers, javascript: URLs, etc. — anything DOMPurify deems unsafe.
 */
export const sanitizeRichTextHtml = (html: string): string =>
  DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: true,
    // Force external links to be safer at render time.
    ADD_ATTR: ["target", "rel"],
  });
