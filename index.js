// fetch("https://yts.mx/api/v2/list_movies.json")
currentPage = 1
TOTAL_NUMBER_OF_MOVIES = undefined
PAGE_SIZE = 10

async function fetch_movies() {
    try {

        const resp = await fetch(`https://yts.mx/api/v2/list_movies.json?limit=${PAGE_SIZE}&page=${currentPage}`)
        jsonResp = await resp.json()
        console.log(jsonResp)
        TOTAL_NUMBER_OF_MOVIES = jsonResp.data.movie_count
        process_f(jsonResp)
        display_pagination_controls()
        //\  .catch(err => log(err))
    } catch (error) {
        console.log("error in fetch_movies")
    }

}

// this function is from Lab 7 Ajax 
process_f = function (response) {
    try {
        console.log(response);
        the_array = response.data.movies
        document.getElementById("result").innerHTML = "" //clear the result div
        for (let i = 0; i < Math.min(the_array.length, PAGE_SIZE); i++) {
            console.log(the_array[i].title);

            // $("#resultDiv").append("<p>" + the_array[i].title + "</p>");
            // $("#result").append(`<div>  ${the_array[i].title} </div>`);

            $("#result").append
                (`<img src ="star.png" class="this_star">
                    <div class="card" style="position: relative">
                            
                            <a href='${the_array[i].url}'>
                                <div class = "picture"> <img  src= '${the_array[i].large_cover_image}' style = "--s: -1;--b:8px;--d:25px;"> </div> 
                            </a>
                            
                            <div class="rating"> <p> ${the_array[i].rating} <p></div>
                            <div class="genre"> <p> ${the_array[i].genres} <p></div>
                            <div class="title"> <span>${the_array[i].title}</span></div>
                            <div class="year"> ${the_array[i].year}</div>      
                    </div>
        `);
        }
    } catch (error) {
        console.log("error in process_f")
    }
}

// 

// this is also from Lab 7 Ajax
function setup() {
    try {
        $.ajax({
            "type": "GET",
            "url": "https://yts.mx/api/v2/list_movies.json",
            "success": process_f
        })
    } catch (error) {
        console.log("error in setup")
    }

}

//this function will display 10 buttons at a time in the top of the page
//also the display have previous, next, last, and first buttons if appropriate
function display_pagination_controls() {

    //clear te pagination div
    document.getElementById("buttons").innerHTML = ""
    document.getElementById("buttons").innerHTML += `<button id="firstBtn" > FIRST </button>`

    //if the current page is not the first page, then display the previous button
    if (currentPage != 1) {
        document.getElementById("buttons").innerHTML += `<button id="prevBtn" > PREVIOUS</button>`
    }

    for (let i = currentPage; i <= currentPage + PAGE_SIZE - 1; i++) {
        className = ""

        if (i == currentPage) className = "currentBtn"
        const lastNumber = Math.ceil(TOTAL_NUMBER_OF_MOVIES / PAGE_SIZE)

        if (currentPage <= lastNumber && i <= lastNumber)
            document.getElementById("buttons").innerHTML +=
                `<button id="pageBtn${i}" class = "${className} xx" > ${i} </button>`
        let lastPage = Math.ceil(TOTAL_NUMBER_OF_MOVIES / PAGE_SIZE)

        //It will break the for loop if the current page is the last page
        if (currentPage == lastPage) {
            break
        }
    }

    //if the current page is not the last page, then display the next button
    if (currentPage != Math.ceil(TOTAL_NUMBER_OF_MOVIES / PAGE_SIZE)) {
        document.getElementById("buttons").innerHTML += `<button id="nextBtn" > NEXT  </button>`
    }

    document.getElementById("buttons").innerHTML += `<button id="lastBtn" > LAST </button>`
}

//this function will display 10 buttons at a time in the top of the page
//also the display have previous, next, last, and first buttons if appropriate
function display_pagination_controls() {

    //clear te pagination div
    document.getElementById("buttons").innerHTML = ""
    document.getElementById("buttons").innerHTML += `<button id="firstBtn" > FIRST </button>`

    //if the current page is not the first page, then display the previous button
    if (currentPage != 1) {
        document.getElementById("buttons").innerHTML += `<button id="prevBtn" > PREVIOUS</button>`
    }

    for (let i = currentPage; i <= currentPage + PAGE_SIZE - 1; i++) {
        className = ""

        if (i == currentPage) className = "currentBtn"
        const lastNumber = Math.ceil(TOTAL_NUMBER_OF_MOVIES / PAGE_SIZE)

        if (currentPage <= lastNumber && i <= lastNumber)
            document.getElementById("buttons").innerHTML +=
                `<button id="pageBtn${i}" class = "${className} xx" > ${i} </button>`
        let lastPage = Math.ceil(TOTAL_NUMBER_OF_MOVIES / PAGE_SIZE)

        //It will break the for loop if the current page is the last page
        if (currentPage == lastPage) {
            break
        }
    }

    //if the current page is not the last page, then display the next button
    if (currentPage != Math.ceil(TOTAL_NUMBER_OF_MOVIES / PAGE_SIZE)) {
        document.getElementById("buttons").innerHTML += `<button id="nextBtn" > NEXT  </button>`
    }

    document.getElementById("buttons").innerHTML += `<button id="lastBtn" > LAST </button>`
}

async function main() {
    // fetch_movies()
    await fetch_movies()
    display_pagination_controls()
}

document.addEventListener("click", function (e) {
    const target = e.target;
    console.log(target);

    if (target.closest("#nextBtn")) {
        console.log("next button is clicked");
        currentPage++
        console.log(currentPage);
        console.log("next button is clicked");
    }
    else if (target.closest("#prevBtn")) {
        if (target && currentPage <= 1) {
            currentPage++
            console.log("prev button is clicked");
        } else {
            currentPage--
            console.log(currentPage);
            console.log("prev button is clicked");
        }
    }
    else if (target.closest("#lastBtn")) {
        let lastPage = e.target.closest(".xx")
        console.log("Last button is clicked");
        currentPage = Math.ceil(TOTAL_NUMBER_OF_MOVIES / PAGE_SIZE)
        console.log(currentPage);
    }
    else if (target.closest("#firstBtn")) {
        console.log("First button is clicked");
        currentPage = 1
        console.log(currentPage);

    }
    console.log(currentPage);
    fetch_movies()
})

document.addEventListener("click", function (e) {
    const target = e.target.closest(".xx");
    console.log(target);
    if (target) {
        currentPage = parseInt(e.target.innerHTML)
        console.log(currentPage);
        display_pagination_controls();
        fetch_movies()
    }
})

// main()

main()

$(document).ready(setup);


