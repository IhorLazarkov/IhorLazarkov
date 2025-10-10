import React from 'react';

// Define the return type for clarity.
// The function returns an array of React nodes (elements, strings, etc.)
type FormattedContent = (string | React.ReactElement | null)[];

/**
 * Helper function to apply inline formatting (bold, italic, line breaks).
 * It processes a string chunk to convert Markdown syntax (**bold**, *italic*)
 * and single newlines (\n) into React elements.
 *
 * @param {string} text The text chunk to process.
 * @returns {FormattedContent} An array of React nodes.
 */
function formatInlineText(text: string): FormattedContent {
    const parts: FormattedContent = [];
    let remainingText = text;
    let keyIndex = 0;

    // Regex to match inline formatting and single newlines in one go
    // Group 1: **bold** | Group 2: *italic* | Group 3: \n (single newline)
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|\n)/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(remainingText)) !== null) {
        // Text before the match (if any)
        const precedingText = remainingText.substring(0, match.index);
        if (precedingText) {
            // Split by single newline and use React.Fragment and <br /> to handle line breaks
            const linesWithBreaks = precedingText.split('\n').map((line, i) => (
                <React.Fragment key={`text-${keyIndex++}-${i}`}>
                    {line}
                    {/* Add <br /> only if it's not the last line */}
                    {i < precedingText.split('\n').length - 1 && <br />}
                </React.Fragment>
            ));
            parts.push(...linesWithBreaks);
        }

        const matchedString = match[0];

        if (matchedString.startsWith('**') && matchedString.endsWith('**')) {
            // Bold text
            // Extract content by slicing off the ** on both sides
            parts.push(<strong key={`b-${keyIndex++}`}>{matchedString.slice(2, -2)}</strong>);
        } else if (matchedString.startsWith('*') && matchedString.endsWith('*')) {
            // Italic text
            // Extract content by slicing off the * on both sides
            parts.push(<em key={`i-${keyIndex++}`}>{matchedString.slice(1, -1)}</em>);
        } else if (matchedString === '\n') {
            // Single newline -> Line break
            parts.push(<br key={`br-${keyIndex++}`} />);
        }

        // Update remaining text to process the rest
        remainingText = remainingText.substring(match.index + matchedString.length);
        regex.lastIndex = 0; // Reset for the new remainingText
    }

    // Add any remaining text after the last match
    if (remainingText) {
        // Handle potential single newlines as <br> in the final chunk
        const linesWithBreaks = remainingText.split('\n').map((line, i) => (
            <React.Fragment key={`text-${keyIndex++}-${i}`}>
                {line}
                {i < remainingText.split('\n').length - 1 && <br />}
            </React.Fragment>
        ));
        parts.push(...linesWithBreaks);
    }

    return parts;
}

// -----------------------------------------------------------------------------
// MAIN FUNCTION
// -----------------------------------------------------------------------------

/**
 * Parses a plain text response from a language model (e.g., Gemma)
 * into an array of React elements suitable for rendering as HTML.
 * It handles:
 * - Markdown bold (**) and italic (*)
 * - Double newlines (\n\n) to create paragraphs (<p>)
 * - Single newlines (\n) to create line breaks (<br>)
 *
 * @param {string} rawText The raw text string from the model.
 * @returns {JSX.Element[]} An array of paragraph elements, ready for rendering.
 */
export function parseGemmaResponseToHtml(rawText: string): React.ReactElement[] {
    if (!rawText) return [];

    // 1. Sanitize text and ensure proper line endings
    const cleanText = rawText.trim().replace(/\r\n/g, '\n');

    // 2. Split into paragraphs based on double newlines (\n\n)
    // The '+' ensures that multiple newlines (e.g., \n\n\n) are treated as one separator
    const paragraphStrings = cleanText.split(/\n\n+/);

    // 3. Process each paragraph
    return paragraphStrings.map((pString, pIndex) => {
        // If the string is empty or just whitespace, we'll return an empty p or a br if needed
        if (!pString.trim()) {
            return <p key={`p-${pIndex}`} style={{ margin: '0' }} />;
        }

        // Process the text within the paragraph for inline formatting
        const formattedTextNodes = formatInlineText(pString);

        // Wrap the results in a <p> tag for block-level separation
        return (
            <p className="answer-area" key={`p-${pIndex}`} style={{ margin: '0 0 1em 0' }}>
                {formattedTextNodes}
            </p>
        );
    });
}