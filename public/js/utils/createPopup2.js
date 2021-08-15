function createPopup(event, data, idName) {
	//get the ID of row stored in data attribute
	const rowID = Number(event.currentTarget.getAttribute('data-rowId'));
	//get row by ID from data downloaded earlier
	const record = data.find((row) => {
		return row[idName] === rowID;
	});
	//remove ID, because we don't want allow user to edit it
	delete record[idName];

	const $popupForm = document.querySelector('.edit-row-popup > form');

	for (const [key, value] of Object.entries(record)) {
		//based on data, create input for each field with key as name and value as value
		$popupForm.innerHTML += `<input name=${key} value=${value} />`;
	}
	$popupForm.innerHTML += `<input type="submit" value="Zatwierdź" />`;
	const $popup = document.querySelector('.edit-row-popup');
	$popup.style.display = 'flex';
	//I want to close popup onclick
	$popup.addEventListener('click', (event) => {
		if (!$popupForm.contains(event.target)) {
			$popupForm.innerHTML = '';
			$popup.styles.display = 'none';
		}
	});
	$popupForm.addEventListener('submit', (event) => {
		handleFormSubmit(event, 'PATCH', `/api/donors/${rowID}`);
	});
}
