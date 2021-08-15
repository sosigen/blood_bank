async function getDonors() {
	const donorsResponse = await fetch('api/donors/all');
	let donorsData = await donorsResponse.json();
	const $dataContainer = document.querySelector(
		'.main-content > table > tbody'
	);
	$dataContainer.innerHTML = jsonToTable(donorsData);
	return donorsData;
}
async function main() {
	const data = await getDonors();

	//bind editRow function to edit buttons
	const editButtons = document.querySelectorAll('.edit-button');
	const editButtonsArray = Array.from(editButtons);
	editButtonsArray.map((button) =>
		button.addEventListener('click', (event) => {
			const clonedData = [...data];
			handleEditWithPopup(event, clonedData, 'donor_id');
		})
	);

	//bind deleteRow function to delete buttons
	const deleteButtons = document.querySelectorAll('.delete-button');
	const deleteButtonsArray = Array.from(deleteButtons);
	deleteButtonsArray.map((button) =>
		button.addEventListener('click', (event) => {
			handleDeleteRow(event);
		})
	);

	//bind handleAddForm function to add donor form
	document
		.querySelector('.add-donor-form')
		.addEventListener('submit', (event) =>
			handleFormSubmit(event, 'POST', '/api/donors')
		);
}
main();
