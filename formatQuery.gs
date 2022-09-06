function formatQuery(input) {
  var columnStr = input['columnStr'];
  var conditionStr = input['conditionStr'];
  var groupByStr = input['groupByStr'];
  var orderByStr = input['orderByStr'];
  var sheetNameStr = input['sheetNameStr'];

  var scriptProperties = PropertiesService.getScriptProperties();
  var projectId = scriptProperties.getProperty('PROJECT_ID');
  var datasetId = scriptProperties.getProperty('DATASET_ID');
  var tableName = scriptProperties.getProperty('TABLE_NAME');

  formattedQuery = `SELECT ${columnStr} FROM \`${projectId}.${datasetId}.${tableName}\` WHERE ${conditionStr} GROUP BY ${groupByStr} ORDER BY ${orderByStr}`
  runQuery(formattedQuery,sheetNameStr);
  Utilities.sleep(2000);
  var output = HtmlService.createHtmlOutput('<script>google.script.host.close();</script>');
  SpreadsheetApp.getUi().showModalDialog(output, 'Loading...');
  SpreadsheetApp.getUi().alert("Configurations saved successfully!")
}