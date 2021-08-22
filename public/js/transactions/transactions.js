async function main() {
  //get transactions data from db
  const data = await getData("/api/transactions/all");
  const headerNames = ["ID", "ID Donacji", "Data", "ID Biorcy"];
  const $dataContainer = document.querySelector(".main-content");
  //create table and append it
  $dataContainer.append(
    jsonToTable(data, headerNames, {
      buttons: true,
      checks: false,
    })
  );

  //populate select input from add and edit forms

  //donation add form
  const $donationAddInput = document.querySelector(
    '.add-user-form > select[name="donation_id"]'
  );
  await populateSelect("/api/donations/all", $donationAddInput, "donation_id");

  //donation edit form
  const $donationEditInput = document.querySelector(
    '.edit-user-form > select[name="donation_id"]'
  );
  await populateSelect("/api/donations/all", $donationEditInput, "donation_id");

  //recipient add form
  const $recipientAddInput = document.querySelector(
    '.add-user-form > select[name="recipient_id"]'
  );
  await populateSelect(
    "/api/recipients/all",
    $recipientAddInput,
    "recipient_id"
  );
  //recipient edit form
  const $recipientEditInput = document.querySelector(
    '.edit-user-form > select[name="recipient_id"]'
  );
  await populateSelect(
    "/api/recipients/all",
    $recipientEditInput,
    "recipient_id"
  );

  //bind editRow function to edit buttons
  const editButtons = document.querySelectorAll(".edit-button");
  const editButtonsArray = Array.from(editButtons);
  editButtonsArray.map((button) =>
    button.addEventListener("click", (event) => {
      handleEditWithPopup(event, data, "transactions");
    })
  );

  //bind deleteRow function to delete buttons
  const deleteButtons = document.querySelectorAll(".delete-button");
  const deleteButtonsArray = Array.from(deleteButtons);
  deleteButtonsArray.map((button) =>
    button.addEventListener("click", (event) => {
      handleDeleteRow(event, "transactions");
    })
  );

  //bind handleAddForm function to add transaction form
  document
    .querySelector(".add-transaction")
    .addEventListener("submit", (event) =>
      handleFormSubmit(event, "POST", "/api/transactions")
    );
}
main();
