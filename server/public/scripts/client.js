console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
  $(document).on('click', '.deleteButton', deleteKoala)
  $(document).on('click', '.koalaReady', onKoalaReady);
}

function onKoalaReady() {
  // console.log(onKoalaReady);
  let id = $(this).parents('tr').data('id');
  let ready_to_transfer = $(this).parents('tr').data('ready_to_transfer');

  $.ajax({
    method: 'PUT',
    // id get put into req.params
    url: `/koalas/${id}`,
    data: {
      ready_to_transfer: ready_to_transfer
    }
})
.then(() => {
    console.log('PUT success!');

    // reload our state from the server
    renderKoalas();
})
.catch((err) => {
    console.log('PUT failed', err);

})

}
function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
		type: 'GET',
		url: '/koalas'
	})
		.then(function(response) {
      console.log('getting koalas:', response)
			renderKoalas(response);
		})
		.catch(function(error) {
			console.log('error in /koalas GET', error);
		});
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}

function deleteKoala(){
  $.ajax({
    type: 'DELETE',
    url: `/koala/${$(this).parents('tr').data('id')}`
}).then((res) => {
    console.log('DELETE:', res);
    getKoalas();
}).catch((err) => {
    console.log('FAILED:', err);
});
}

function renderKoalas(koalas){
  for(let koala of koalas){
    $('#viewKoalas').append(`
    <tr data-id = "${koala.id}">
      <td>${koala.name}</td>
      <td>${koala.gender}</td>
      <td>${koala.age}</td>
      <td>${koala.ready_to_transfer}</td>
      <td>${koala.notes}</td>
      <td>
        <button class = "koalaReady">
        READY GO
        </button>
      </td>
      <td>
        <button class = "deleteButton">DELETE</button>
      </td>
    </tr>
    `)
  }
}