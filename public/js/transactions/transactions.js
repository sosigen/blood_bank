async function main() {
  //get transactions data from db
  const data = await getData("/api/transactions/all");
  const headerNames = [
    "ID",
    "Data",
    "Dawca",
    "ID Donacji",
    "Biorca",
    "ID Biorcy",
  ];
  const $dataContainer = document.querySelector(".main-content");
  //create table and append it
  $dataContainer.append(
    jsonToTable(data, headerNames, {
      buttons: true,
      checks: false,
    })
  );

  //populate select input from add and edit forms
  const donationsData = await getData("/api/donations/all");
  const recipientsData = await getData("/api/recipients/all");

  //donation add form
  const $donationAddInput = document.querySelector(
    '.add-user-form > select[name="donation_id"]'
  );
  await populateSelect(donationsData, $donationAddInput, [
    "donation_date",
    "donor",
  ]);

  //donation edit form
  const $donationEditInput = document.querySelector(
    '.edit-user-form > select[name="donation_id"]'
  );
  await populateSelect(donationsData, $donationEditInput, [
    "donation_date",
    "donor",
  ]);

  //recipient add form
  const $recipientAddInput = document.querySelector(
    '.add-user-form > select[name="recipient_id"]'
  );
  await populateSelect(recipientsData, $recipientAddInput, [
    "recipient_id",
    "forename",
    "surname",
  ]);
  //recipient edit form
  const $recipientEditInput = document.querySelector(
    '.edit-user-form > select[name="recipient_id"]'
  );
  await populateSelect(recipientsData, $recipientEditInput, [
    "recipient_id",
    "forename",
    "surname",
  ]);

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
