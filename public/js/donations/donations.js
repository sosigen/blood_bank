async function main() {
	//get donations data from db
	const data = await getData('/api/donations/all');
	const $dataContainer = document.querySelector(
		'.main-content > table > tbody'
	);
	//create table and append it
	$dataContainer.innerHTML = jsonToTable(data, true);

	//populate select input from add form
	const $addSelectInput = document.querySelector('.add-user-form > select');
	await populateSelect('/api/donors/all', $addSelectInput, 'donor_id');

	//bind editRow function to edit buttons
	const editButtons = document.querySelectorAll('.edit-button');
	const editButtonsArray = Array.from(editButtons);
	editButtonsArray.map((button) =>
		button.addEventListener('click', (event) => {
			handleEditWithPopup(event, data, 'donations');
		})
	);

	//bind deleteRow function to delete buttons
	const deleteButtons = document.querySelectorAll('.delete-button');
	const deleteButtonsArray = Array.from(deleteButtons);
	deleteButtonsArray.map((button) =>
		button.addEventListener('click', (event) => {
			handleDeleteRow(event, 'donations');
		})
	);

	//bind handleAddForm function to add donation form
	document
		.querySelector('.add-donation')
		.addEventListener('submit', (event) =>
			handleFormSubmit(event, 'POST', '/api/donations')
		);
}
main();
