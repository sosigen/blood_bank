async function main() {
  //get donationOverview data from db
  const sumData = await getData("/api/donations/sum");
  const headerNames = ["Grupa Krwi", "Ilość ( x 450 ml )"];
  const $sumDataContainer = document.querySelector(".donations-overview");
  //create table and append it
  $sumDataContainer.append(jsonToTable(sumData, headerNames, {}));
}
main();
