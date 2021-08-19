async function main() {
  //get donationOverview data from db
  const sumData = await getData("/api/donations/sum");
  const $sumDataContainer = document.querySelector(
    ".donations-overview > table > tbody"
  );
  //create table and append it
  $sumDataContainer.innerHTML = jsonToTable(sumData, {});
}
main();
