/**
 * Fill in the blanks to create a script
 * that prints the total cost if someone would buy one of every item
 * without applying any discount, but only count items that are currently in stock
 */

const totalPriceImproved = async () => {
  const query = qs.stringify(
    {
      // that prints the total cost if someone would buy one of every item
      // without applying any discount, but only count items that are currently in stock

      fields: ["price"],
      sort: ["price:asc"],
      filters: {
        price: {
          $gt: 0,
        },

        outOfStock: {
          $eq: false,
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );
  console.log("The query string", query);

  // call the matching endpoint and include the querystring after the ?

  const baseUrl = "http://localhost:1337/api/products";
  const response = await fetch(`${baseUrl}?${query}`);
  const result = await response.json();
  const singlePrices = result.data.map((item) => {
    return item.attributes.price;
  });
  renderResult(singlePrices);

  const totalCost = singlePrices.reduce((acc, item) => {
    return acc + item;
  });
  renderTotal(totalCost);
};

// render all single price
const renderResult = (result) => {
  const resultElement = document.querySelector(
    ".array__total__price__improved"
  );
  resultElement.innerHTML = "";
  result.forEach((item) => {
    const space = " +";
    resultElement.innerHTML += `${space}  ${item}€`;
  });
};

// render total price
const renderTotal = (total) => {
  const calculate = document.getElementById(
    "calculate__total__price__improved"
  );

  calculate.addEventListener("click", () => {
    const totalElement = document.querySelector(
      ".container__total__price__improved__result"
    );

    totalElement.innerHTML = `Total price: ${total}€`;
  });
};

totalPriceImproved();
