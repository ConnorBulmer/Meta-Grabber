function getMetaTags(url) {
  try {
    var response = UrlFetchApp.fetch(url);
    var html = response.getContentText();
    
    // Updated regex patterns
    var title = html.match(/<title>([\s\S]*?)<\/title>/i);
    var metaDescription = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*>/i);
    var h1Tag = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
    
    // Function to strip HTML tags from a string
    function stripHtml(htmlContent) {
      return htmlContent.replace(/(<([^>]+)>)/gi, "");
    }

    // Updated function to decode HTML entities
    function decodeHtmlEntities(str) {
      return str.replace(/&(#(?:x[0-9a-fA-F]+|\d+)|[a-zA-Z]+);/g, function (match, code) {
        if (code.charAt(0) === '#') {
          return String.fromCharCode(
            code.charAt(1).toLowerCase() === 'x'
              ? parseInt(code.substr(2), 16)
              : parseInt(code.substr(1), 10)
          );
        } else {
          var entities = {
            quot: '"',
            amp: '&',
            apos: "'",
            lt: '<',
            gt: '>',
            nbsp: '\u00A0',
            // Add more named entities if needed
          };
          return entities[code.toLowerCase()] || match;
        }
      });
    }

    return [
      title ? decodeHtmlEntities(stripHtml(title[1].trim())) : 'N/A',
      metaDescription ? decodeHtmlEntities(stripHtml(metaDescription[1].trim())) : 'N/A',
      h1Tag ? decodeHtmlEntities(stripHtml(h1Tag[1].trim())) : 'N/A',
    ];
  } catch (e) {
    return ['Error fetching data', 'Error fetching data', 'Error fetching data'];
  }
}

function fillMetaTags() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var urls = sheet.getRange('A2:A' + sheet.getLastRow()).getValues();

  for (var i = 0; i < urls.length; i++) {
    if (urls[i][0]) {
      var metaTags = getMetaTags(urls[i][0]);
      sheet.getRange(i + 2, 2, 1, 3).setValues([metaTags]);
    }
  }
}
