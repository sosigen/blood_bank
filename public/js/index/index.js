async function main() {
	//get donationOverview data from db
	const data = await getData('/api/donations/sum');
	const $dataContainer = document.querySelector(
		'.donations-overview > table > tbody'
	);
	//create table and append it
	$dataContainer.innerHTML = jsonToTable(data);
}
main();
