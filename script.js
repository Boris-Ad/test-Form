window.onload = async () => {

  const container = document.querySelector(".container");
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    const data = await response.json();
    createList(Object.keys(data));
  } catch (e) {
    console.log(e.message);
  }

  function createList(data) {
    const list = data.slice(1, 3);
    let form = document.createElement("form");
    form.className = "col-6 mx-auto my-3 form";

    new Promise((resolve) => {
      resolve(
        list.forEach((el) => {
          let inputForm = `
      <div class="mb-3 form__name">
      <label for="${el}" name="${el}" class="form-label">${el}</label>
      <input type="text" class="form-control" id="${el}" />
      </div>
      `;
          form.insertAdjacentHTML("beforeend", inputForm );
        })
      );
    }).then(() => {
      form.insertAdjacentHTML(
        "beforeend",
        `
        <div class="mb-3 form-check form__check">
        <label class="form-check-label" for="exampleCheck1"
        >Я согласен на обработку этой формы</label
        >
     <input type="checkbox" class="form-check-input" id="exampleCheck1" />
   </div>
   <button type="submit" class="btn btn-primary">Отправить</button>
     `
      );
    });
    container.append(form);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (validation(form)) {
        try {
          const response = await fetch('url',{
            method: 'POST',
            body: new FormData(form)
          });
          let result = await response.json();
        } catch (e) {
          console.log(e.message);
        }
      }
    });
  }

  function validation(form) {
    let valid = true;
    form.querySelectorAll("input").forEach((el) => {
      let error = document.createElement("div");
      error.className = "form-text";
      error.style.color = "crimson";
      error.textContent = "Заполните поле";

      const checkErrorText = () => {
        valid = false;
        if (el.nextElementSibling) {
          el.nextElementSibling.className === "form-text";
          return false;
        }
        return true;
      };

      if (el.value === "" && checkErrorText()) {
        el.after(error);
      }
      if (el.type === "checkbox" && !el.checked && checkErrorText()) {
        el.after(error);
      }

      el.addEventListener("input", () => {
        error.remove();
      });
    });
    return valid;
  }
};
