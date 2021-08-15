//this function returns string of html table (tbody to be clear) that is created using object
//each row besides data includes edit and delete button
//function does not add table headers - they have to be created manually
function jsonToTable(data) {
	//create headers array using first entry of data
	const headers = Object.keys(data[0]);
	let result = '';
	//for every record I create table row with data
	data.forEach((record) => {
		//I add id of record as id row to easier manipulate it later
		result += `<tr >`;
		//create table cells
		headers.map((header) => {
			result += `<td class="table-data">${record[header]}</td>`;
		});
		//add edit and delete button
		result += `
			<td class="table-buttons">
				<button data-rowId=${
					record[headers[0]]
				} class="table-button edit-button"><i class="fas fa-edit"></i></button>
				<button data-rowId=${
					record[headers[0]]
				} class="table-button delete-button"><i class="far fa-trash-alt"></i></button>
			</td>`;
		// close row tag
		result += '</tr>';
	});

	return result;
}
