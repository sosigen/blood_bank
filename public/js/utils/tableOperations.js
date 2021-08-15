async function handleDeleteRow(event) {
	//get the ID of row stored in data attribute
	const rowID = event.currentTarget.getAttribute('data-rowId');
	console.log(rowID);
	//send request for deleting
	const response = await fetch(`/api/donors/${rowID}`, { method: 'DELETE' });
	//reload to repopulate table
	console.log(response);
	if (response.status === 200) location.reload();
	else alert('wystąpił błąd podczas usuwania');
}

async function handleFormSubmit(event, method, url) {
	//prevent refreshing page, which is default behaviour
	event.preventDefault();
	//get form inputs
	const inputs = Array.from(event.target.elements);
	//remove button from inputs array
	inputs.pop();

	//name of every input is the same as column names in table
	//so I use it to create data object
	const data = inputs.reduce((data, currentInput) => {
		data[currentInput.name] = currentInput.value;
		return data;
	}, {});
	//then I send it to server endpoint
	const response = await fetch(url, {
		method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	//if everything's ok submit form just to refresh page
	if (response.status === 200) {
		event.target.submit();
	}
	//alert user about error
	else alert('wystąpił błąd');
}
function handleEditWithPopup(event, data, idName) {
	//get the ID of row stored in data attribute
	const rowID = Number(event.currentTarget.getAttribute('data-rowId'));
	//get row by ID from data downloaded earlier
	const record = data.find((row) => {
		return row[idName] === rowID;
	});

	//get form and inputs from it
	const $popupForm = document.querySelector('.edit-row-popup > form');
	const $popupForms = $popupForm.querySelectorAll('input');
	const $popupFormsArray = Array.from($popupForms);
	//set current row value as corresponding input value
	$popupFormsArray.map((input) => {
		input.value = record[input.name];
	});

	//show input
	const $popup = document.querySelector('.edit-row-popup');
	$popup.style.display = 'flex';

	//I want to hide popup onclick
	$popup.addEventListener('click', (event) => {
		//I prevent event bubbling inside the form
		//because clicking inside form should not cause popup to hide
		if (!$popupForm.contains(event.target)) {
			//clear the forms and hide popup
			$popupFormsArray.map((input) => (input.value = ''));
			$popup.style.display = 'none';
		}
	});
	//submitting form should result in sending update API call
	$popupForm.addEventListener('submit', (event) => {
		handleFormSubmit(event, 'PATCH', `/api/donors/${rowID}`);
	});
}
