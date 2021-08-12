function editRow(rowID) {
	const $row = document.querySelector(`[data-rowId="${rowID}"]`);
	const rowArray = Array.from($row);
	console.log(rowArray);
}
