//this function returns string of html table (tbody to be clear) that is created using object
//each row besides data includes edit and delete button
//on the bottom are inputs that can be used to add row to the table and plus button to submit
//function does not add table headers - they have to be created manually
function jsonToTable(data) {
	const headers = Object.keys(data[0]);
	let result = '';
	data.forEach((donor) => {
		result += `<tr data-rowId=${donor[headers[0]]}>`;
		headers.map((header) => {
			result += `<td>${donor[header]}</td>`;
		});
		result += `
			<td>
				<button class="table-button edit-button"><i class="fas fa-edit"></i></button>
				<button class="table-button delete-button"><i class="far fa-trash-alt"></i></button>
			</td>`;
		result += '</tr>';
	});
	result += '<tr>';
	headers.map((header) => {
		result += `<td><input name="add-${header}" class="add-row-input"/></td>`;
	});
	result += '<td><button class="add-row-button">+</button></td>';
	result += '</tr>';

	return result;
}
