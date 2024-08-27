# Meta Grabber: A Google Apps Script for Extracting Meta Tags

## Overview
This Google Apps Script provides a convenient way to extract meta tags from web pages directly into a Google Spreadsheet. It fetches the `<title>`, `<meta name="description">`, and the first `<h1>` tag from specified URLs and decodes HTML entities from these tags.

## Features
- Fetches and decodes the title, meta description, and first h1 tag from URLs.
- Outputs the extracted information into a Google Spreadsheet.
- Handles HTML tag stripping and HTML entity decoding.

## How to Use
To use this script, follow these steps:
1. **Open a new Google Spreadsheet**: This will be where the extracted meta tag data will be populated.
2. **Add URLs**: Enter each URL from which you want to extract meta tags in column A, starting from cell A2.
3. **Script Setup**:
    - Open the script editor by selecting `Extensions > Apps Script`.
    - Copy and paste the provided script into the script editor.
    - Save and name your project.
4. **Run the Script**:
    - Run the `fillMetaTags` function from the Apps Script interface to begin the extraction process.
    - Authorise the script if prompted to allow URL fetching and spreadsheet operations.
5. **View Results**: Once the script has processed the URLs, the title, meta description, and h1 content will appear in columns B, C, and D respectively.

## Current Limitations
- **Character Decoding**: The script does not always decode characters perfectly. Special characters may not render as expected in some cases, which can affect the accuracy of the data retrieved.

## Contributing
Feel free to fork this repository and contribute to improving the decoding functionality or extending the script's capabilities. Your contributions are welcome!

## License
This project is released under the MIT License. See the LICENSE file for more details.
