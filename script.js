const dataMatrix = [
  { product: "Product A", date: "2022-01-01", price: 10 },
  { product: "Product A", date: "2022-02-01", price: 12 },
  { product: "Product A", date: "2022-03-01", price: 15 },
  { product: "Product B", date: "2022-01-01", price: 8 },
  { product: "Product B", date: "2022-02-01", price: 9 },
  { product: "Product B", date: "2022-03-01", price: 11 },
  { product: "Product C", date: "2022-01-01", price: 15 },
  { product: "Product C", date: "2022-02-01", price: 18 },
  { product: "Product C", date: "2022-03-01", price: 20 },
];

const chartCanvas = document.getElementById("chartCanvas");
const tooltip = document.getElementById("tooltip");
const ctx = chartCanvas.getContext("2d");

function createChart() {
  ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);

  ctx.beginPath();
  ctx.moveTo(50, 20);
  ctx.lineTo(50, 380);
  ctx.lineTo(570, 380);
  ctx.stroke();

  ctx.font = "12px Arial";
  const products = [...new Set(dataMatrix.map((item) => item.product))];
  products.forEach((product, index) => {
    const x = 70 + index * 100;
    const y = 395;
    ctx.fillText(product, x, y);
  });

  ctx.textAlign = "right";
  for (let i = 0; i <= 20; i += 5) {
    const x = 45;
    const y = 380 - i * 15;
    ctx.fillText(i.toString(), x, y);
  }
  ctx.textAlign = "left";

  const colors = ["blue", "green", "red"];
  products.forEach((product, i) => {
    const productData = dataMatrix.filter((item) => item.product === product);
    productData.forEach((item, index) => {
      const x = 70 + index * 100 + i * 20;
      const y = 380 - item.price * 15;
      const height = item.price * 15;
      ctx.fillStyle = colors[i];
      ctx.fillRect(x, y, 50, height);
    });
  });

  chartCanvas.addEventListener("mousemove", handleMouseMove);
  chartCanvas.addEventListener("mouseleave", hideTooltip);
}

function handleMouseMove(event) {
  const mouseX = event.clientX - chartCanvas.getBoundingClientRect().left;
  const mouseY = event.clientY - chartCanvas.getBoundingClientRect().top;

  const products = [...new Set(dataMatrix.map((item) => item.product))];
  products.forEach((product, i) => {
    const productData = dataMatrix.filter((item) => item.product === product);
    productData.forEach((item, index) => {
      const x = 70 + index * 100 + i * 20;
      const y = 380 - item.price * 15;
      if (mouseX >= x && mouseX <= x + 50 && mouseY >= y && mouseY <= 380) {
        showTooltip(
          event.clientX,
          event.clientY,
          `${item.product} - Date: ${item.date}, Price: $${item.price}`
        );
      }
    });
  });
}

function showTooltip(x, y, content) {
  tooltip.style.display = "block";
  tooltip.style.left = x + "px";
  tooltip.style.top = y + "px";
  tooltip.innerHTML = content;
}

function hideTooltip() {}

createChart();
