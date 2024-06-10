process_f = function (response) {
    console.log(response);
    // $("#resultDiv").html(response)
    the_array = response.data.movies
    
    for(let i = 0; i < the_array.length; i++){
        console.log(the_array[i].title);

        // $("#resultDiv").append("<p>" + the_array[i].title + "</p>");
        // $("#result").append(`<div>  ${the_array[i].title} </div>`);

        $("#result").append
        (`
            <div class="card">
            
                    <a href='${the_array[i].url}'>
                        <div class = "picture"> <img style='--s: -1;--b:8px;--d:25px;' src= '${the_array[i].large_cover_image}'> </div> 
                    </a>
                    <div class='rating'> <p> ${the_array[i].rating} <p></div>
                    <div class='genre'> <p> ${the_array[i].genres} <p></div>
                    <div class='title'> <p>${the_array[i].title}<p></div>
                    <div class='year'> ${the_array[i].year}</div>      
            </div>
        `);



    }

    // for (const color of the_array) {
    //     console.log(color.title)
    //     let x = color.title

    //     $("#result").append(`<div>  ${x} </div>`);
    // }
}

// function process_f(response) {
//     console.log(response);
//     let the_array = response.data.movies; // Extract array of movies from the response
//     document.getElementById("result").innerHTML = ""; // Clear previous results in #result
//     for (let i = 0; i < Math.min(the_array.length, PAGE_SIZE); i++) {   // Always display 10 movies
//         console.log(the_array[i].title);
//         document.getElementById("result").innerHTML += // Append HTML content to #result for each movie
//             `<div>
//         <a href=${the_array[i].url}> 
//         <div class="overlay_container">
//         <img src=${the_array[i].medium_cover_image}>
//         <div class="overlay">
//         <p id="rating"><img src="greenstar.png">${the_array[i].rating}/10</p>
//         </div></div>
//         <p id="title">${the_array[i].title}</p>
//         <br>
//         <p id="year">${the_array[i].year}</p></a>
//         </div>`
//     }
// }

function setup() {
    console.log("Hello World");
    $.ajax({
        "type": "GET",
        "url": "https://yts.mx/api/v2/list_movies.json",
        "success": process_f
    })
    
}

$(document).ready(setup)