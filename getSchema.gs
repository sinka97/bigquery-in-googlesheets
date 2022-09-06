function getSchema() {
  var scriptProperties = PropertiesService.getScriptProperties();
  var projectId = scriptProperties.getProperty('PROJECT_ID');
  var datasetId = scriptProperties.getProperty('DATASET_ID');
  var tableName = scriptProperties.getProperty('TABLE_NAME');

  var userProperties = PropertiesService.getUserProperties();
  var sheetName = userProperties.getProperty('TABLE_SCHEMA_SHEET_NAME');

  const request = {
    query: `SELECT column_name,data_type FROM \`${projectId}\`.${datasetId}.INFORMATION_SCHEMA.COLUMNS WHERE table_name = '${tableName}'`,
    useLegacySql: false
  };
  let queryResults = BigQuery.Jobs.query(request, projectId);
  const jobId = queryResults.jobReference.jobId;

  // Check on status of the Query Job.
  let sleepTimeMs = 500;
  while (!queryResults.jobComplete) {
    Utilities.sleep(sleepTimeMs);
    sleepTimeMs *= 2;
    queryResults = BigQuery.Jobs.getQueryResults(projectId, jobId);
  }

  // Get all the rows of results.
  let rows = queryResults.rows;
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);
  sheet.clearContents();
  sheet.appendRow(['Column Headers','Data Types']);
  for (var iter in rows) {
    let row = rows[iter]['f'];
    let column = row[0]['v'];
    let dType = row[1]['v'];
    sheet.appendRow([column,dType]);
  }

}
