async function populateSelect(url, $selectElement, fieldName) {
  const data = await getData(url);
  data.map((row) => {
    if (row.available === 0) return;
    const option = document.createElement("option");
    option.value = row[fieldName];
    option.text = row[fieldName];
    $selectElement.add(option);
  });
}
