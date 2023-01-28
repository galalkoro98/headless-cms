/**
 * Fill in the blanks to create a script
 * that prints the total cost if someone would buy one of every item
 * taking into consideration that it's impossible to buy items that are out of stuck,
 * and taking the discount rates into account
 */

const totalPrcieComplete = async () => {
  const query = qs.stringify(
    {
      fields: ["price", "outOfStock"],
      sort: ["price:asc"],

      filters: {
        price: {
          $gt: 0,
        },

        outOfStock: {
          $eq: false,
        },
      },

      populate: {
        0: "discount",
      },
    },

    {
      encodeValuesOnly: true,
    }
  );

  console.log("The query string", query);

  //   try and catch

  const baseUrl = "http://localhost:1337/api/products";
  const url = `${baseUrl}?${query}`;
  try {
    // call the matching endpoint and include the querystring after the ?
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();

    const allProductBeforeDiscount = data.data.map((item) => {
      return item.attributes.price;
    });

    renderResultallProductBeforeDiscount(allProductBeforeDiscount);

    const totalCostBeforeDiscount = allProductBeforeDiscount.reduce(
      (acc, item) => {
        return acc + item;
      }
    );

    renderTotalCostBeforeDiscount(totalCostBeforeDiscount);

    const allProductAfterDiscount = data.data.map((item) => {
      const price = item.attributes.price;
      const discount = item.attributes.discount;
      if (discount.data) {
        const discountRate = discount.data.attributes.percentage;
        const discountPrice = price - price * (discountRate / 100);
        return discountPrice;
      } else {
        return price;
      }
    });

    renderResultallProductAfterDiscount(allProductAfterDiscount);

    const totalCostAfterDiscount = allProductAfterDiscount.reduce(
      (acc, item) => {
        return acc + item;
      }
    );

    renderTotalCostAfterDiscount(totalCostAfterDiscount);
  } catch (error) {
    console.log(error);
  }
};

// render all Product Before Discount

const renderResultallProductBeforeDiscount = (allProductBeforeDiscount) => {
  const resultElement = document.querySelector(".outOfStuckBeforeDiscount");
  resultElement.innerHTML = "";
  allProductBeforeDiscount.forEach((item) => {
    resultElement.innerHTML += `  ${item}€ |`;
  });
};

// render total cost before discount

const renderTotalCostBeforeDiscount = (totalCostBeforeDiscount) => {
  const totalCostBeforeDiscountElement =
    document.getElementById("totalPriceComplate");
  totalCostBeforeDiscountElement.addEventListener("click", () => {
    const totalCostBeforeDiscountResult = document.querySelector(
      ".container__total__price__complete__result"
    );
    totalCostBeforeDiscountResult.innerHTML = "";
    totalCostBeforeDiscountResult.innerHTML += ` total cost befor discount: ${totalCostBeforeDiscount}€`;
  });
};

// render all Produc after Discount

const renderResultallProductAfterDiscount = (allProductAfterDiscount) => {
  const resultElement = document.querySelector(".outOfStuckAfterDiscount");
  resultElement.innerHTML = "";
  allProductAfterDiscount.forEach((item) => {
    resultElement.innerHTML += `  ${item}€ |`;
  });
};

// render total cost after discount

const renderTotalCostAfterDiscount = (totalCostAfterDiscount) => {
  const totalCostAfterDiscountElement =
    document.getElementById("totalPriceComplate");
  totalCostAfterDiscountElement.addEventListener("click", () => {
    const totalCostAfterDiscountResult = document.querySelector(
      ".total__price__complete__result"
    );
    totalCostAfterDiscountResult.innerHTML = "";
    totalCostAfterDiscountResult.innerHTML += ` total cost after discount: ${totalCostAfterDiscount}€`;
  });
};

totalPrcieComplete();
