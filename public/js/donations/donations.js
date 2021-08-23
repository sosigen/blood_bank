async function main() {
  //get donations data from db
  const data = await getData("/api/donations/all");
  const headerNames = ["ID", "Data", "Dawca", "ID Dawcy", "Dostępna"];
  const $dataContainer = document.querySelector(".main-content");
  //create table and append it
  $dataContainer.append(
    jsonToTable(data, headerNames, {
      buttons: true,
      checks: true,
    })
  );

  //populate donor select input from add form
  const $addSelectInput = document.querySelector(".add-user-form > select");
  const donorsData = await getData("/api/donors/all");
  await populateSelect(donorsData, $addSelectInput, [
    "donor_id",
    "forename",
    "surname",
  ]);

  //bind editRow function to edit buttons
  const editButtons = document.querySelectorAll(".edit-button");
  const editButtonsArray = Array.from(editButtons);
  editButtonsArray.map((button) =>
    button.addEventListener("click", (event) => {
      handleEditWithPopup(event, data, "donations");
    })
  );

  //bind deleteRow function to delete buttons
  const deleteButtons = document.querySelectorAll(".delete-button");
  const deleteButtonsArray = Array.from(deleteButtons);
  deleteButtonsArray.map((button) =>
    button.addEventListener("click", (event) => {
      handleDeleteRow(event, "donations");
    })
  );

  //bind handleAddForm function to add donation form
  document
    .querySelector(".add-donation")
    .addEventListener("submit", (event) =>
      handleFormSubmit(event, "POST", "/api/donations")
    );
}
main();
