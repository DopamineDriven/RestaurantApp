//wait to attach handlers until DOM is full
$(function() {
  $(".create-form").on("submit", event => {
    //prevent default on submit event
    event.preventDefault();

    const nuevoBurger = {
      burger_name: $("#nuevoburger")
        .val()
        .trim(),
      devoured: 0
    };
    $.ajax("/api/burgers", {
      type: "POST",
      data: nuevoBurger
    }).then(() => {
      console.log("New Burger Created");
      //reload page to retrieve updated list
      location.reload();
    });
  });

  //Devour Burger on click event changes devour column to true
  $(".devourburger").on("click", event => {
    //prevent default on devour click event
    event.preventDefault();
    const id = $(this).data("id");
    const devouredState = {
      //if devoured = 1 return true; else devoured = 0 return false
      devoured: 1
    };
    //put request for true
    $.ajax(`/api/burgers/${id}`, {
      type: "PUT",
      data: devouredState
    }).then(() => {
      //reload upon completion of put request
      console.log("Burger Devoured!");
      location.reload();
    });
  });

  //eightySixBurger on click event deletes burger from DB
  $(".eightySixBurger").on("click", event => {
    //prevent default on eightySix click event
    event.preventDefault();
    const id = $(this).data("id");

    //send eightySix request
    $.ajax({
      type: "DELETE",
      url: `/api/burgers/${id}`
    }).then(location.reload());
  });
});

// //preventDefault simplified using modal function
// //window.addEventListener('DOMContentLoaded', () => {
// // setTimeout(modal, 5000)
// //});

// //handling devour add event
// async function handleDevourAdd() {
//   try {
//     const id = this.dataset.id;
//     await fetch(`/api/burgers/${id}`, {
//       method: "PUT",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify({ devoured: true })
//     });
//   } catch (error) {
//     if (error) {
//       console.log(error);
//       throw error;
//     }
//   }
// }

// async function handleDevour() {
//   try {
//     const id = this.dataset.id;
//     await fetch(`/api/burgers/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ devoured: false })
//     });
//   } catch (error) {
//     if (error) {
//       console.log(error);
//       throw error;
//     }
//   }
// }

// function updatingAll() {
//   return new Promise((resolve, reject) => {
//     //querySelectorAll returns all element descendants of node that match selectors
//     //devourList found in "views/devour.handlebars"
//     const devourList = document.querySelectorAll(
//       ".devour .card .card-button a"
//     );
//     for (let i = 0; i < devourList.length; i++) {
//       try {
//         const id = devourList[i].dataset.id;
//         const res = fetch(`/api/burgers/${id}`, {
//           method: "PUT",
//           headers: {
//             "Content-type": "application/json"
//           },
//           body: JSON.stringify({ devoured: false })
//         });
//         //essentially, if the response is okay and i is equal to and of the same value as devourlist.length-1 (meaning one has been devoured) then resolve
//         if (res.ok && i === devourList.length - 1) {
//           resolve();
//         }
//       } catch (error) {
//         reject(error);
//       }
//     }
//   });
// }

// //handle devouring entire list (reference views/devour.handlebars) via updatingAll handler
// async function handleDevourAll() {
//   try {
//     await updatingAll();
//     window.location.replace("/devour");
//   } catch (error) {
//     if (error) {
//       console.log(error);
//       throw error;
//     }
//   }
// }

// //handClick event
// async function handleClick() {
//   try {
//     const id = this.dataset.id;
//     await fetch(`/api/burgers/${id}`, {
//       method: "PUT",
//       headers: { "Content-type": "application/json" },
//       body: JSON.stringify({ devoured: true })
//     });
//   } catch (error) {
//     if (error) {
//       console.log(error);
//       throw error;
//     }
//   }
// }
