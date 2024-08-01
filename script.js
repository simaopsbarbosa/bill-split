const newCategoryButton = document.getElementById("new-category-button");
const categoriesBox = document.getElementById("categories-box");

class Category {
  constructor() {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category-form";

    const leftSide = document.createElement("div");
    leftSide.className = "left-side";

    const categoryNameInput = document.createElement("input");
    categoryNameInput.placeholder = "category name";

    const inputGroupDiv = document.createElement("div");
    inputGroupDiv.className = "input-group";

    const numberOfMembers = document.createElement("input");
    numberOfMembers.name = "numberOfMembers";
    numberOfMembers.id = "numberOfMembers";
    numberOfMembers.type = "number";
    numberOfMembers.min = "1";
    numberOfMembers.max = "100";
    numberOfMembers.value = "1";
    numberOfMembers.required = true;
    numberOfMembers.addEventListener("input", function (event) {
      this.updateTotal.bind(this);
    });

    const numberOfMembersLabel = document.createElement("label");
    numberOfMembersLabel.innerHTML = "people";

    this.categoryValuesDiv = document.createElement("div");
    this.categoryValuesDiv.className = "category-values";
    this.categoryValuesDiv.id = "category-values";

    const itemHeaderDiv = document.createElement("div");
    itemHeaderDiv.id = "item-header";

    const itemHeaderText = document.createElement("h3");
    itemHeaderText.innerHTML = "items:";

    const addItemButton = document.createElement("button");
    addItemButton.id = "add-item-button";
    addItemButton.innerHTML = "add item";
    addItemButton.onclick = this.addValue.bind(this);

    const rightSide = document.createElement("div");
    rightSide.id = "right-side";

    const valueNameDiv = document.createElement("div");
    valueNameDiv.className = "name-value-pair";

    const totalPerPersonLabel = document.createElement("h3");
    totalPerPersonLabel.className = "light";
    totalPerPersonLabel.innerHTML = "total per person: ";
    const totalPerPerson = document.createElement("h3");
    totalPerPerson.innerHTML = " 0€ ";
    totalPerPerson.className = "light total-value";

    const valueNameSmallDiv = document.createElement("div");
    valueNameSmallDiv.className = "name-value-pair";

    const totalLabel = document.createElement("h4");
    totalLabel.innerHTML = "total: ";
    totalLabel.className = "light";
    const total = document.createElement("h4");
    total.innerHTML = " 0€";
    total.className = "total-value light";

    categoryDiv.appendChild(leftSide);
    categoryDiv.appendChild(rightSide);

    leftSide.appendChild(categoryNameInput);
    leftSide.appendChild(inputGroupDiv);
    inputGroupDiv.appendChild(numberOfMembers);
    inputGroupDiv.appendChild(numberOfMembersLabel);
    leftSide.appendChild(this.categoryValuesDiv);
    this.categoryValuesDiv.appendChild(itemHeaderDiv);
    itemHeaderDiv.appendChild(itemHeaderText);
    itemHeaderDiv.appendChild(addItemButton);

    rightSide.appendChild(valueNameDiv);
    rightSide.appendChild(valueNameSmallDiv);
    valueNameDiv.appendChild(totalPerPersonLabel);
    valueNameDiv.appendChild(totalPerPerson);
    valueNameSmallDiv.appendChild(totalLabel);
    valueNameSmallDiv.appendChild(total);

    this.updateTotal();
    this.addValue();
    categoriesBox.appendChild(categoryDiv);
  }

  addValue() {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    const itemInput = document.createElement("input");
    itemInput.type = "text";
    itemInput.className = "itemPrice";
    itemInput.required = true;
    itemInput.max = "100";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "button remove";
    removeButton.innerText = "X";

    removeButton.onclick = () => {
      this.categoryValuesDiv.removeChild(itemDiv);
      this.updateTotal();
    };

    itemInput.addEventListener("input", (event) => {
      this.updateTotal();
    });

    itemDiv.appendChild(itemInput);
    itemDiv.appendChild(removeButton);
    this.categoryValuesDiv.appendChild(itemDiv);
  }

  updateTotal() {
    console.log("updated");
    let total = 0;

    const itemDivs = this.categoryValuesDiv.getElementsByClassName("item");
    console.log(itemDivs);
    for (const itemDiv of itemDivs) {
      const itemInput = itemDiv.querySelector("input");
      if (itemInput && !isNaN(parseFloat(itemInput.value))) {
        total += parseFloat(itemInput.value);
      }
    }

    const totalValueLabel = document.querySelector(".total-value.light");
    const numPeople = document.getElementById("numberOfMembers");
    if (totalValueLabel && numPeople) {
      totalValueLabel.innerHTML = total.toFixed(2) + "€";
      const totalPerPerson = total / parseInt(numPeople.value, 10);
      this.totalValueLabel.innerHTML = totalPerPerson.toFixed(2) + "€";
    }
  }
}

// function updateTotal() {
//   let total = 0;
//   const categories = categoriesBox.getElementsByClassName("category-values");

//   for (const category of categories) {
//     const itemDivs = category.getElementsByClassName("item");
//     for (const itemDiv of itemDivs) {
//       const itemInput = itemDiv.querySelector("input");
//       if (itemInput && !isNaN(parseFloat(itemInput.value))) {
//         total += parseFloat(itemInput.value);
//       }
//     }
//   }

//   const totalValueLabel = document.querySelector(".total-value.light");
//   const numPeople = document.getElementById("numberOfMembers");
//   if (totalValueLabel && numPeople) {
//     totalValueLabel.innerHTML = total.toFixed(2) + "€";
//     const totalPerPerson = total / parseInt(numPeople.value, 10);
//     totalValueLabel.innerHTML = totalPerPerson.toFixed(2) + "€";
//   }
// }

function createNewCategory() {
  new Category();
}

newCategoryButton.onclick = createNewCategory;
createNewCategory();
