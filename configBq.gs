function configBQ(input) {
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty('PROJECT_ID', input['projectId']);
  scriptProperties.setProperty('DATASET_ID', input['datasetId']);
  scriptProperties.setProperty('TABLE_NAME', input['tableName']);
  Utilities.sleep(2000);
  var output = HtmlService.createHtmlOutput('<script>google.script.host.close();</script>');
  SpreadsheetApp.getUi().showModalDialog(output, 'Loading...');
  SpreadsheetApp.getUi().alert("Configurations saved successfully!")
}