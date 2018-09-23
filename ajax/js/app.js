$(document).ready(function() {
    var startIndex = 0;
    var endIndex =0;
    var totalNumberOfData;
    var numberOfDataToDisplay = 20;
    var activatePagination = (function() {
        $("#multipleData tbody tr").each(function(index) {
            if(index >= numberOfDataToDisplay) {
                $(this).hide();
            }
        });
        startIndex = 0;
        endIndex = startIndex + (numberOfDataToDisplay-1);
        $("#btn_previous").attr("disabled", "disabled");
        $("#btn_next").removeAttr("disabled");
    });
    var displayData = function(data) {
        if(Array.isArray(data)) {
            $("#multipleData").show();
            $("#singleData").hide();
            totalNumberOfData = data.length;
            var rowHTML = "";
            for(var index=0; index<data.length; index++) {
                // rowHTML += "<tr data-index='"+index+"'>";
                // rowHTML += "<td style='border: 1px solid black'>"+data[index].id+"</td>";
                // rowHTML += "<td style='border: 1px solid black'>"+data[index].userId+"</td>";
                // rowHTML += "<td style='border: 1px solid black'>"+data[index].title+"</td>";
                // rowHTML += "<td style='border: 1px solid black'>"+data[index].completed+"</td>";
                // rowHTML += "</tr>";

                rowHTML += `<tr data-index='`+index+`'>
                    <td style="border: 1px solid black">`+data[index].id+`</td>
                    <td style='border: 1px solid black'>`+data[index].userId+`</td>
                    <td style='border: 1px solid black'>`+data[index].title+`</td>
                    <td style='border: 1px solid black'>`+data[index].completed+`</td>
                </tr>    
                `;
            }
            $("#multipleData tbody").html(rowHTML);
            activatePagination();
        } else {
            $("#multipleData").hide();
            $("#singleData").show();

            var html = "<b>id = </b>"+data.id+"<b> userid</b> "+ data.userId + " <b>title </b>"+data.title+"<b> completed </b>"+data.completed;
            $("#singleData").html(html);
            $("#btn_previous").attr("disabled", "disabled");
            $("btn_next").attr("disabled", "disabled");
        }
    }
    $("#btn_search").on("click", function(event) {
        event.preventDefault();
        var id = $("#txt_id").val();
        $.ajax({
            url: "http://jsonplaceholder.typicode.com/todos/"+id,
            type: "GET",
            success: function(data) {
                displayData(data);
            },
            error: function() {
                alert("unable to get data")
            }
        });    
    });

    $("#btn_previous").on('click', function() {
        startIndex -= numberOfDataToDisplay;
        endIndex -= numberOfDataToDisplay;
        if(startIndex <= 0) {
            $("#btn_previous").attr("disabled", "disabled");
            $("#btn_next").removeAttr("disabled");
        }
        $("#multipleData tbody tr").each(function(index) {
            if(index>= startIndex && index <=endIndex) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $("#btn_next").on('click', function() {
        startIndex += numberOfDataToDisplay;
        endIndex += numberOfDataToDisplay;
        if(endIndex >= (totalNumberOfData-1)) {
            $("#btn_previous").removeAttr("disabled");
            $("#btn_next").attr("disabled", "disabled");
        }
        $("#multipleData tbody tr").each(function(index) {
            if(index>= startIndex && index <=endIndex) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});


