//this function returns table element that is created using object
//also needed are: table headers array and options
//options include:
//  buttons - functions adds edit and delete button to each row
//  checks - turns true/false into check symbols (used in donations)
function jsonToTable(data, headersNames, options) {
  //if there are no headers, then table can't be created
  if (headersNames.length === 0) return null;

  //if there is check option, find 'available' field, then set true to check sign and false to 'x' sign
  if (options.checks) {
    data.map((record) => {
      record.available === 1
        ? (record.available = "&#10003;")
        : (record.available = "&#215;");
    });
  }

  //create main table elements
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  //creating row of main headers by iterating over headersNames
  const headersRow = document.createElement("tr");
  headersNames.map((header) => {
    const tableHeader = document.createElement("th");
    tableHeader.innerText = header;
    headersRow.append(tableHeader);
  });

  //add empty column for buttons
  if (options.buttons) {
    const emptyHeader = document.createElement("th");
    headersRow.append(emptyHeader);
  }
  thead.append(headersRow);
  table.append(thead);

  //if there is no data return empty table with headers
  if (data.length === 0) return table;

  //these are headers taken from data, not name headers
  //they are used to iterate over data
  const headers = Object.keys(data[0]);

  //create table row for each record in data
  data.forEach((record) => {
    const row = document.createElement("tr");
    //iterate over record to create cells with record values
    headers.map((header) => {
      const cell = document.createElement("td");
      cell.classList.add("table-data");
      //add value to cell
      cell.innerHTML = record[header];
      row.append(cell);
    });
    //if buttons are needed create additional cell with edit button and delete button
    if (options.buttons) {
      const buttonCell = document.createElement("td");
      buttonCell.classList.add("table-buttons");

      const editButton = document.createElement("button");
      //add record id as data parameter for easier data manipulation later
      editButton.setAttribute("data-rowID", record[headers[0]]);
      editButton.classList.add("table-button", "edit-button");
      editButton.innerHTML = "&#10000;";
      buttonCell.append(editButton);

      const deleteButton = document.createElement("button");
      deleteButton.setAttribute("data-rowID", record[headers[0]]);
      deleteButton.classList.add("table-button", "delete-button");
      deleteButton.innerHTML = "&#128465;";
      buttonCell.append(deleteButton);

      row.append(buttonCell);
    }
    tbody.append(row);
  });
  table.append(tbody);
  return table;
}
