async function main() {
  //get donors data from db
  const data = await getData("/api/donors/all");
  const $dataContainer = document.querySelector(".main-content");
  const headerNames = [
    "ID",
    "Imię",
    "Nazwisko",
    "Email",
    "Telefon",
    "Typ krwi",
  ];
  //create table and append it
  $dataContainer.append(
    jsonToTable(data, headerNames, {
      buttons: true,
      checks: false,
    })
  );

  //bind editRow function to edit buttons
  const editButtons = document.querySelectorAll(".edit-button");
  const editButtonsArray = Array.from(editButtons);
  editButtonsArray.map((button) =>
    button.addEventListener("click", (event) => {
      handleEditWithPopup(event, data, "donors");
    })
  );

  //bind deleteRow function to delete buttons
  const deleteButtons = document.querySelectorAll(".delete-button");
  const deleteButtonsArray = Array.from(deleteButtons);
  deleteButtonsArray.map((button) =>
    button.addEventListener("click", (event) => {
      handleDeleteRow(event, "donors");
    })
  );

  //bind handleAddForm function to add donor form
  document
    .querySelector(".add-donor")
    .addEventListener("submit", (event) =>
      handleFormSubmit(event, "POST", "/api/donors")
    );
}
main();
