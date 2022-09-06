function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Initiate Required User Credentials & Authentication
  ui.createMenu('Custom BigQuery Adapter')
    .addItem('Change BigQuery Data Source','openConfigDialog')
    .addItem('Get Schema of Data Source', 'insertSchema')
    .addItem('Fetch Data From BigQuery', 'openQueryDialog')
.addToUi();
}


function openConfigDialog() {
  var html = HtmlService.createHtmlOutputFromFile('configBQForm')
      .setWidth(500)
      .setHeight(800);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html,'Change BigQuery Data Source');
}


function insertSchema() {
  var ui = SpreadsheetApp.getUi();
  var userProperties = PropertiesService.getUserProperties();
  var clientResp = ui.prompt(`Currently Selected Sheet: ${userProperties.getProperty('TABLE_SCHEMA_SHEET_NAME')} \n Set New Sheet To Input Schema:` , ui.ButtonSet.OK_CANCEL);
  var button = clientResp.getSelectedButton();
  if (button == ui.Button.OK) {
    userProperties.setProperty('TABLE_SCHEMA_SHEET_NAME', clientResp.getResponseText());
    }
  getSchema();
}


function openQueryDialog() {
  var html = HtmlService.createHtmlOutputFromFile('queryForm')
      .setWidth(500)
      .setHeight(800);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html,'Fetch Data From BigQuery');
}


// function openTestDialog() {
//   var html = HtmlService.createHtmlOutputFromFile('queryForm')
//       .setWidth(500)
//       .setHeight(800);
//   SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
//       .showModalDialog(html,'Fetch Data From BigQuery');
// }