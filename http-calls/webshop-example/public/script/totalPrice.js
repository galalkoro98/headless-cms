/**
 * Fill in the blanks to create a script
 * that prints the total cost if someone would buy one of every item
 * (ignoring whether it is in stock or not and not applying any discount)
 */

const totalPrice = async () => {
  const query = qs.stringify(
    {
      fields: ["price"],
      sort: ["price:asc"],
      filters: {
        price: {
          $gt: 0,
        },
      },
      aggregate: {
        total: {
          sum: "price",
        },
        groupBy: ["price"],
        page: {
          limit: 100,
        },

        // ignoring whether it is in stock or not and not applying any discount
        filters: {
          price: {
            $gt: 0,
          },

          outOfStock: {
            $eq: false,
          },
          discount: {
            $eq: null,
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  // console.log("the query string", query);

  const baseUrl = "http://localhost:1337/api/products";
  const url = `${baseUrl}?${query}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    const result = data.data.map((product) => product.attributes.price);
    renderResult(result);

    const total = result.reduce((acc, cur) => acc + cur, 0);
    renderTotal(total);
  } catch (error) {
    console.error(error);
  }
};

// render result
const renderResult = (result) => {
  const resultElement = document.getElementById("array__prices");
  resultElement.innerHTML = result.join("  | ");
};

// render total
const renderTotal = (total) => {
  const totalElement = document.getElementById("calculate");
  // add even listener
  totalElement.addEventListener("click", () => {
    const resultTotalElement = document.getElementById("total__price");
    resultTotalElement.innerHTML = total;
  });
};

totalPrice();
