$(document).ready(function() {
    $("#btn_search").on("click", function(event) {
        event.preventDefault();
        var id = $("#txt_id").val();
        $.ajax({
            url: "http://jsonplaceholder.typicode.com/todos/"+id,
            type: "GET",
            success: function(data) {
                console.log(data);
                
            },
            error: function() {
                alert("unable to get data")
            }
        });    
    });
});


