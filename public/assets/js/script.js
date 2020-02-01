//handling devour add event
async function handleDevourAdd() {
  try {
    const id = this.dataset.id;
    await fetch(`/api/burgers/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ devoured: true })
    });
  } catch (error) {
    if (error) {
      console.log(error);
      throw error;
    }
  }
}

async function handleDevour() {
  try {
    const id = this.dataset.id;
    await fetch(`/api/burgers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ devoured: false })
    });
  } catch (error) {
    if (error) {
      console.log(error);
      throw error;
    }
  }
}

function updatingAll() {
  return new Promise((resolve, reject) => {
    //querySelectorAll returns all element descendants of node that match selectors
    //devourList found in "views/devour.handlebars"
    const devourList = document.querySelectorAll(
      ".devour .card .card-button a"
    );
    for (let i = 0; i < devourList.length; i++) {
      try {
        const id = devourList[i].dataset.id;
        const res = fetch(`/api/burgers/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ devoured: false })
        });
        //essentially, if the response is okay and i is equal to and of the same value as devourlist.length-1 (meaning one has been devoured) then resolve
        if (res.ok && i === devourList.length - 1) {
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    }
  });
}

//handle devouring entire list (reference views/devour.handlebars) via updatingAll handler
async function handleDevourAll() {
  try {
    await updatingAll();
    window.location.replace("/devour");
  } catch (error) {
    if (error) {
      console.log(error);
      throw error;
    }
  }
}

//handClick event
async function handleClick() {
  try {
    const id = this.dataset.id;
    await fetch(`/api/burgers/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ devoured: true })
    });
  } catch (error) {
    if (error) {
      console.log(error);
      throw error;
    }
  }
}

//displaying build a burger modal 
function displayModal () {
  $('#babModal').modal('toggle')
};

async function handleBurgerPost() {
  const checkboxes = document.querySelectorAll('.form-check-input')

  let toppings = []
  //forEach performs specified action for each node in list
  checkboxes.forEach(checkbox => {
    if(checkbox.checked) {
      toppings.push(checkbox.value)
    }
  });
  toppings = toppings.join(', ');

  let burger_info = document.querySelector('.btn.active p').innerText;
  burger_info += `\nToppings: ${toppings}`;
  
  const burger_name = document.querySelector('input[type="text]').value;

  //getAttribute returns element's first attribute whose qualified name is qualifiedName (src in this case)
  const img_url = document.querySelector('.btn.active img').getAttribute('src');

  const data = {
    burger_name = burger_name,
    burger_info = burger_info,
    img_url = img_url,
    devoured: true
  }

  try {
    const res = await fetch('/api/burgers', {
      method: 'POST',
      headers: {
        'Conent-type' : 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      window.location.replace('/devour')
    }
  } catch (error) {
      if (error) {
        console.log(error)
        throw error
      }
  }
}

//add event listener to ensure document object model content is loaded to prevent default 
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(displayModal, 5000)
})