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

    this.numberOfMembers = document.createElement("input");
    this.numberOfMembers.name = "numberOfMembers";
    this.numberOfMembers.id = "numberOfMembers";
    this.numberOfMembers.type = "number";
    this.numberOfMembers.min = "1";
    this.numberOfMembers.max = "100";
    this.numberOfMembers.value = "1";
    this.numberOfMembers.required = true;
    this.numberOfMembers.addEventListener("input", (event) => {
      this.updateTotal();
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
    this.totalPerPerson = document.createElement("h3");
    this.totalPerPerson.innerHTML = " 0€ ";
    this.totalPerPerson.className = "light total-value";

    const valueNameSmallDiv = document.createElement("div");
    valueNameSmallDiv.className = "name-value-pair";

    const totalLabel = document.createElement("h4");
    totalLabel.innerHTML = "total: ";
    totalLabel.className = "light";
    this.total = document.createElement("h4");
    this.total.innerHTML = " 0€";
    this.total.className = "total-value light";

    categoryDiv.appendChild(leftSide);
    categoryDiv.appendChild(rightSide);

    leftSide.appendChild(categoryNameInput);
    leftSide.appendChild(inputGroupDiv);
    inputGroupDiv.appendChild(this.numberOfMembers);
    inputGroupDiv.appendChild(numberOfMembersLabel);
    leftSide.appendChild(this.categoryValuesDiv);
    this.categoryValuesDiv.appendChild(itemHeaderDiv);
    itemHeaderDiv.appendChild(itemHeaderText);
    itemHeaderDiv.appendChild(addItemButton);

    rightSide.appendChild(valueNameDiv);
    rightSide.appendChild(valueNameSmallDiv);
    valueNameDiv.appendChild(totalPerPersonLabel);
    valueNameDiv.appendChild(this.totalPerPerson);
    valueNameSmallDiv.appendChild(totalLabel);
    valueNameSmallDiv.appendChild(this.total);

    this.addValue();
    this.updateTotal();
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
    let TotalSum = 0;
    const itemDivs = this.categoryValuesDiv.getElementsByClassName("item");
    for (const itemDiv of itemDivs) {
      const itemInput = itemDiv.querySelector("input");
      if (itemInput && !isNaN(parseFloat(itemInput.value))) {
        TotalSum += parseFloat(itemInput.value);
      }
    }

    this.total.innerHTML = TotalSum.toFixed(2) + "€";
    const TotalSumPerPerson = TotalSum / parseInt(this.numberOfMembers.value, 10);
    this.totalPerPerson.innerHTML = TotalSumPerPerson.toFixed(2) + "€";
  }
}

function createNewCategory() {
  new Category();
}

newCategoryButton.onclick = createNewCategory;
createNewCategory();
