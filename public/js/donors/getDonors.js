async function getDonors() {
	const donorsResponse = await fetch('api/donors/all');
	const donorsData = await donorsResponse.json();
	const $dataContainer = document.querySelector(
		'.main-content > table > tbody'
	);
	$dataContainer.innerHTML = jsonToTable(donorsData);
	console.log('hej1');
}
async function main() {
	await getDonors();
	console.log('hej2');
	const editButtons = document.querySelectorAll('.edit-button');
	const editButtonsArray = Array.from(editButtons);

	editButtonsArray.map((button) =>
		button.addEventListener('click', (event) => {
			const rowID = event.path[2].dataset.rowid;
			console.log(rowID);
			editRow(rowID);
		})
	);
}
main();
