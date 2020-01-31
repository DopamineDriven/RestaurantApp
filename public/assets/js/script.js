//wait to attach handlers until DOM is full
//$(function() {
  //  $(".create-form").on("submit", function(event) {
    //    event.preventDefault();
    //})
//})

async function handleDevour() {
  try {
    const id = this.dataset.id;
    await fetch(`/api/burgers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({devoured: false})
    });
  } catch (error) {
    if (error) {
      console.log(error)
      throw error
    }
  }
};