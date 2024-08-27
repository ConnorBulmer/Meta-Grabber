function getMetaTags(url) {
  try {
    var response = UrlFetchApp.fetch(url);
    var html = response.getContentText();
    var title = html.match(/<title>(.*?)<\/title>/i);
    var metaDescription = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    var h1Tag = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    
    // Function to strip HTML tags from a string
    function stripHtml(html) {
      var tmp = HtmlService.createHtmlOutput(html);
      return tmp.getContent().replace(/(<([^>]+)>)/gi, "");
    }

    // Function to decode HTML entities
    function decodeHtmlEntities(str) {
      var element = HtmlService.createHtmlOutput(str);
      return element.getContent();
    }

    return [
      title ? decodeHtmlEntities(title[1]) : 'N/A',
      metaDescription ? decodeHtmlEntities(metaDescription[1]) : 'N/A',
      h1Tag ? decodeHtmlEntities(stripHtml(h1Tag[1])) : 'N/A'
    ];
  } catch (e) {
    return ['Error fetching data', 'Error fetching data', 'Error fetching data'];
  }
}

function fillMetaTags() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var urls = sheet.getRange("A2:A" + sheet.getLastRow()).getValues();
  
  for (var i = 0; i < urls.length; i++) {
    if (urls[i][0]) {
      var metaTags = getMetaTags(urls[i][0]);
      sheet.getRange(i + 2, 2, 1, 3).setValues([metaTags]);
    }
  }
}
