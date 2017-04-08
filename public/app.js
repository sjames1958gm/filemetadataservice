/* global $ */
$(document).ready(function() {
    $("#myform").submit(function(event) {
        event.preventDefault();
        console.log( "Handler for .submit() called." );
        let data = new FormData();
        data.append('recfile', $('#file')[0].files[0]);
        console.log(data);
        
        $.ajax({
            url: '/getfiledata',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: onSuccess,
            error: onError
        });
        
        $("#file").val("");
        $("#fileinfo").html("<h4>Uploading file ...</h4>");
    });
    
    function onSuccess(data) {
        console.log(data);
        let html = `<h4>File Uploaded</h4>`;
        html += `<p class="info">File Size: ${data.size}</p>`;
        html += `<p class="info">Mime Type: ${data.mimetype}</p>`;
        html += `<p class="info">Encoding: ${data.encoding}</p>`;
        $("#fileinfo").html(html);
    }
    
    function onError() {
        console.log('error');
        $("#fileinfo").html(`<h4>Error uploading</h4>`);
    }
});