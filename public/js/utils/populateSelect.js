async function populateSelect(data, $selectElement, fieldNames) {
  const idName = Object.keys(data[0])[0];
  data.map((row) => {
    if (row.available === 0) return;
    const option = document.createElement("option");
    option.value = row[idName];
    const text = fieldNames.reduce((wholeText, currentField) => {
      return wholeText + row[currentField] + " ";
    }, "");
    option.text = text;
    $selectElement.add(option);
  });
}
