//this function returns string of html table (tbody to be clear) that is created using object
//each row besides data includes edit and delete button
//function does not add table headers - they have to be created manually
function jsonToTable(data, buttons) {
	//create headers array using first entry of data
	const headers = Object.keys(data[0]);
	let result = '';
	//for every record I create table row with data
	console.log(data);
	data.forEach((record) => {
		result += `<tr >`;
		//create table cells
		headers.map((header) => {
			result += `<td class="table-data">${record[header]}</td>`;
		});
		//add edit and delete button if needed
		//I add data-id of buttons as id row to easier manipulate it later
		if (buttons) {
			result += `
				<td class="table-buttons">
					<button data-rowId=${
						record[headers[0]]
					} class="table-button edit-button"><i class="fas fa-edit"></i></button>
					<button data-rowId=${
						record[headers[0]]
					} class="table-button delete-button"><i class="far fa-trash-alt"></i></button>
				</td>`;
		}
		// close row tag
		result += '</tr>';
	});

	return result;
}
