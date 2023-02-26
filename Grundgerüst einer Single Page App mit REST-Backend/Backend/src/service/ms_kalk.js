// Get the button element
var button = document.getElementById("calculate-button");

// Add a click event listener to the button
button.addEventListener("click", function() {
  calculateTaxSavings();
});
//tax-saving method
function calculateTaxSavings() {
    // Get input values
    var semestergebühren = parseInt(document.getElementById("Semestergebühren").value);
    var werbungskosten = parseInt(document.getElementById("werbungskosten").value);
    var fahrtweg = parseInt(document.getElementById("fahrtweg").value);
  
    // Calculate tax savings
    var fahrtkosten = fahrtweg * 0.3;
    var absetzbarerbetrag = fahrtkosten + werbungskosten + semestergebühren
  
    // Display tax savings
    document.getElementById("absetztbarerbetrag").innerHTML = absetzbarerbetrag.toFixed(2) + " €";
  }