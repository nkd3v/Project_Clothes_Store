import React, { useEffect } from "react";
import "./additem.css";
import displayimg from "../../assets/images/uploadfield.png";

const Additem = () => {
  let isMount = false;
  function addVariantField() {
    const variantFields = document.getElementById("variantFields");
    const variantField = document.createElement("div");
    variantField.classList.add("variant");
    variantField.innerHTML = `
              <div class="input-field">
              <label for="price">Price:</label>
              <input type="number" name="variants[][price]" required>
              </div>
              <br>

              <label for="size" >Size:
              <label class="optionlabel">
              <select class="optionselect" name="variants[][size]" required >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="3XL">3XL</option>
              </select>
              </label>
              <br>
              


              <label for="color">Color:</label>
              <input type="color" id="color" name="variants[][color]" value="#FF0000"><br>
              <div class="input-field">
              <label for="quantity">Quantity:</label>
              <input type="number" name="variants[][quantity]" required><br>
              </div>

              <label for="image">Image:</label>
              <input type="file" name="variants[][image]" required><br>
              
              <button type="button" class="removeVariant">Remove Variant</button>
          `;

    // Add a click event listener to the "Remove Variant" button
    const removeVariantButton = variantField.querySelector(".removeVariant");
    removeVariantButton.addEventListener("click", () => {
      variantField.remove();
    });

    variantFields.appendChild(variantField);
  }
  async function handleForm(e) {
    const form = document.getElementById("productForm");
  
    e.preventDefault();
    const formData = new FormData(form);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/products`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      const data = await response.json(); // Assuming the error data is in JSON format
    
      if (!response.ok) {
        // Check if the response status is outside the 200-299 range
        alert(data.error);
      } else {
        alert(data.message);
      }
    } catch (error) {
      // Handle network errors here
      alert(`Network Error: ${error.message}`);
    }
  }
  
  useEffect(() => {
    if (isMount) return;
    // Fetch the category hierarchy from the URL
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/categories/hierarchy-for-merchant`)
      .then((response) => response.json())
      .then((data) => {
        const firstLevel = document.getElementById("category1");
        const secondLevel = document.getElementById("category2");
        const thirdLevel = document.getElementById("category3");

        // Populate the first level dropdown
        data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category.name;
          option.textContent = category.name;
          firstLevel.appendChild(option);
        });

        // Handle first-level selection change
        firstLevel.addEventListener("change", () => {
          const selectedFirstLevel = firstLevel.value;
          secondLevel.innerHTML = '<option value="">Select a class</option>';
          thirdLevel.innerHTML = '<option value="">Select a category</option>';
          secondLevel.disabled = true;
          thirdLevel.disabled = true;

          if (selectedFirstLevel) {
            // Find the selected category in the data
            const selectedCategory = data.find(
              (category) => category.name === selectedFirstLevel
            );

            if (selectedCategory && selectedCategory.items) {
              // Populate the second level dropdown if there are items
              selectedCategory.items.forEach((subcategory) => {
                const option = document.createElement("option");
                option.value = subcategory.name;
                option.textContent = subcategory.name;
                secondLevel.appendChild(option);
              });

              secondLevel.disabled = false;
            }
          }
        });

        // Handle second-level selection change
        secondLevel.addEventListener("change", () => {
          const selectedSecondLevel = secondLevel.value;
          thirdLevel.innerHTML = '<option value="">Select a category</option>';
          thirdLevel.disabled = true;

          // Check if the selected subcategory has items
          const selectedCategory = data.find(
            (category) => category.name === firstLevel.value
          );
          if (selectedCategory && selectedCategory.items) {
            const selectedSubcategory = selectedCategory.items.find(
              (subcategory) => subcategory.name === selectedSecondLevel
            );

            if (selectedSubcategory && selectedSubcategory.items) {
              // Populate the third level dropdown if there are sub-subcategories
              selectedSubcategory.items.forEach((subSubcategory) => {
                const option = document.createElement("option");
                option.value = subSubcategory;
                option.textContent = subSubcategory;
                thirdLevel.appendChild(option);
              });

              thirdLevel.disabled = false;
            }
          }
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
    const paletteColors = document.querySelectorAll(".color-palette .color");
    const circleColors = document.getElementById("circle");

    // Function to handle color selection from the palette
    function selectPaletteColor(event) {
      const selectedColor = event.target.style.backgroundColor;
      alert(`You selected color: ${selectedColor}`);
    }

    // Add click event listeners to palette colors
    paletteColors.forEach((color) => {
      color.addEventListener("click", selectPaletteColor);
    });

    // Function to handle color selection from the circle
    function selectCircleColor(event) {
      const selectedColor = event.target.style.backgroundColor;
      alert(`You selected color: ${selectedColor}`);
    }

    // Create color options in the circle dynamically
    const circleColorOptions = [
      "#FF5733",
      "#33FF57",
      "#5733FF",
      "#FFFF33",
      "#33FFFF",
    ];
    circleColorOptions.forEach((color) => {
      const colorDiv = document.createElement("div");
      colorDiv.className = "color";
      colorDiv.style.backgroundColor = color;
      colorDiv.addEventListener("click", selectCircleColor);
      circleColors?.appendChild(colorDiv);
    });
    return () => {
      isMount = true;
    };
  }, []);

  return (
    <div className="additem">
      <div className="div1">
        <h1>ลงขายสินค้า</h1>
      </div>
      <div className="container">
        <div className="wrapper">
          <section className="upload-form">
            <img src={displayimg} alt=""></img>
          </section>
          <form
            id="productForm"
            encType="multipart/form-data"
            method="POST"
            className="additem-form"
            onSubmit={handleForm}
          >
            <div className="input-field">
              <label htmlFor="name">
                <h3>Name/ชื่อ</h3>
              </label>
              <input
                name="name"
                id="name"
                type="text"
                placeholder="ชื่อสินค้า"
                required
              />
            </div>
            <br></br>

            <div className="input-field">
              <label htmlFor="description">
                <h3>Description/คำอธิบายสินค้า</h3>
              </label>
              <input
                name="description"
                id="description"
                type="text"
                placeholder="คำอธิบายสินค้า"
                required
              />
            </div>
            <br></br>

            <div className="input-field">
              <h3>ประเภทสินค้า</h3>
              <div className="optionfield">
                <label className="optionlabel">
                  <select
                    className="optionselect"
                    id="category1"
                    name="gender"
                    required
                  >
                    <option value="">Select a gender</option>
                  </select>
                </label>
                <label className="optionlabel">
                  <select
                    className="optionselect"
                    id="category2"
                    name="className"
                    disabled
                    required
                  >
                    <option value="">Select a class</option>
                    <option value="male">ชาย</option>
                    <option value="female">หญิง</option>
                    <option value="kid">เด็ก</option>
                    <option value="baby">เด็กทารก</option>
                  </select>
                </label>

                <label className="optionlabel">
                  <select
                    className="optionselect"
                    id="category3"
                    name="category"
                    disabled
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="ltshirt">เสื้อยืด(เเขนยาว)</option>
                    <option value="stshirt">เสื้อยืด(เเขนสั้น)</option>
                    <option value="coat">เสื้อกันหนาว</option>
                    <option value="shirt">เสื้อเชิ้ต</option>
                  </select>
                </label>
              </div>
            </div>
            <br></br>

            <div className="input-field">
              <label htmlFor="tags">
                <h3>Tags (comma-separated)</h3>
              </label>
              <input type="text" id="tags" name="tags"></input>
            </div>
            <br></br>

            <label htmlFor="variants">
              <h3>Variants</h3>
            </label>
            <button
              className="variantbtn"
              type="button"
              id="addVariant"
              onClick={addVariantField}
            >
              Add Variant
            </button>
            <div id="variantFields">
              {/* <!-- Variant fields will be added here --> */}
            </div>

            <button className="btn">สร้างรายการสินค้า</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Additem;
