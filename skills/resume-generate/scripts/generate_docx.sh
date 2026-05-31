#!/bin/bash

# Script to convert generated resume Markdown to Microsoft Word Document (.docx)
# Requirement: pandoc (https://pandoc.org/)

INPUT_FILE="../input/CoverLetter.md"
OUTPUT_FILE="../output/Spectrio_CL.docx"

mkdir -p ../output

if command -v pandoc &> /dev/null
then
    pandoc "$INPUT_FILE" -o "$OUTPUT_FILE"
    echo "Successfully generated resume at: $OUTPUT_FILE"
else
    echo "Error: 'pandoc' is not installed. Please install it (e.g., 'brew install pandoc') to run this script."
    exit 1
fi