
const revenueInput = document.getElementById("my-revenue-input");
revenueInput.addEventListener("input", function() {
  const revenue = parseFloat(revenueInput.value);
  if (!isNaN(revenue)) {
    revenueInput.value = revenue.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  }
});