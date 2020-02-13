$(document).ready(function () {


  getAll();

  $('.enter-text').on('keypress', function(event) {
    var text = $('.enter-text').val();
    if(event.which == 13 && text != 0) {
      insertText(text);
      $('.enter-text').val('');
    }
  });


  $(document).on('click', '.delete', function() {
    var getAttr = $(this).parent('.text').attr('data-id');
    deleteItem(getAttr);
  });



  var currentAttr = '';
  $(document).on('click', '.text p', function() {
    currentAttr = $(this).parent('li').attr('data-id');
    var text = $(this).html();
    $(this).html('');
    $(this).parent('li').prepend('<input class="modify" type="text" value="' + text + '">')
    console.log(currentAttr);
  });


  $(document).on('keypress', '.modify', function(event) {
    var text = $('.modify').val();
    if(event.which == 13) {

      $.ajax({
        url: 'http://157.230.17.132:3025/todos/' + currentAttr,
        method: 'PATCH',
        data: {
        text: text},
        success: function(data) {
          console.log(data);

          $('.list').html('');
          getAll();

        },
        error: function(error) {
          alert(error);
        }
      });

    }

  });



























});






// functions /////////////////////

function getAll(){
  $.ajax({
    url: 'http://157.230.17.132:3025/todos',
    method: 'GET',
    success: function(data) {
      printResult(data);
    },
    error: function(error) {
      alert(error);
    }
  });
}

function printResult(data) {

  var source = $("#list-item").html();
  var template = Handlebars.compile(source);

  data.forEach((item) => {
    var context = {text:item.text, id:item.id};
    var html = template(context);
    $('.list').append(html);
  });

}

function insertText(text) {
  $.ajax({
    url: 'http://157.230.17.132:3025/todos',
    method: 'POST',
    data: {
    text: text},
    success: function(data) {
      console.log(data);

      $('.list').html('');
      getAll();

    },
    error: function(error) {
      alert(error);
    }
  });
}

function deleteItem(getAttr) {
  $.ajax({
    url: 'http://157.230.17.132:3025/todos/' + getAttr,
    method: 'DELETE',
    success: function(data) {
      $('.list').html('');
      getAll();
    },
    error: function(error) {
      alert(error);
    }
  });
}
