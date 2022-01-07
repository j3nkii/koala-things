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
    // creates object with input values from DOM
    let koalaToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val().toUpperCase(),
      ready_to_transfer: $('#readyForTransferIn').val().toUpperCase(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
  $(document).on('click', '.deleteButton', deleteKoala)
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

  if(!/^[a-zA-z]+$/.test(newKoala.name) ||
    !/^[MF]$/.test(newKoala.gender) ||
    !/^[0-9]{1,2}$/.test(newKoala.age) ||
    !/^[YN]$/.test(newKoala.ready_to_transfer)){
      return alert('nah son')
    }


  console.log( 'in saveKoala', newKoala );
  // ajax to send new koala
  $.ajax({
		type: 'POST',
		url: '/koalas',
		data: newKoala
	})
		.then(function(response) {
			console.log('Response from server:', response);
			getKoalas();
		})
		.catch(function(error) {
			console.log('Error in POST', error);
			alert('Unable to add koala at this time. Please try again later.');
		});
}

function deleteKoala(){
  $.ajax({
    type: 'DELETE',
    url: `/koalas/${$(this).parents('tr').data('id')}`
}).then((res) => {
    console.log('DELETE:', res);
    getKoalas();
}).catch((err) => {
    console.log('FAILED:', err);
});
}

function renderKoalas(koalas){
  console.log(koalas);
  $('#viewKoalas').empty()
  for(let koala of koalas){
    $('#viewKoalas').append(`
    <tr data-id = "${koala.id}">
      <td>${koala.name}</td>
      <td>${koala.age}</td>
      <td>${koala.gender}</td>
      <td>
        ${koala.ready_to_transfer === 'Y' ? 'Yes' : 'No'}
      </td>
      <td>${koala.notes}</td>
      <td>
        <button class = "deleteButton">DELETE</button>
      </td>
    </tr>
    `);
  }
}