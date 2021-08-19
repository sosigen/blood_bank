async function main() {
  //get recipients data from db
  const data = await getData("/api/recipients/all");
  const $dataContainer = document.querySelector(
    ".main-content > table > tbody"
  );
  //create table and append it
  $dataContainer.innerHTML = jsonToTable(data, {
    buttons: true,
  });

  //bind editRow function to edit buttons
  const editButtons = document.querySelectorAll(".edit-button");
  const editButtonsArray = Array.from(editButtons);
  editButtonsArray.map((button) =>
    button.addEventListener("click", (event) => {
      handleEditWithPopup(event, data, "recipients");
    })
  );

  //bind deleteRow function to delete buttons
  const deleteButtons = document.querySelectorAll(".delete-button");
  const deleteButtonsArray = Array.from(deleteButtons);
  deleteButtonsArray.map((button) =>
    button.addEventListener("click", (event) => {
      handleDeleteRow(event, "recipients");
    })
  );

  //bind handleAddForm function to add recipient form
  document
    .querySelector(".add-recipient")
    .addEventListener("submit", (event) =>
      handleFormSubmit(event, "POST", "/api/recipients")
    );
}
main();
