
function insertTracks(data) {
    function duration(duration_time) {
        let minutes = Math.floor(duration_time / 60)
        let seconds = duration_time % 60
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        return minutes + ":" + seconds
    }

    // Function to add quotes to a string

    first_duration = data[0]["duration"]
    document.getElementById("current-track").innerHTML = data[0]["song"]
    document.getElementById("current-artist").innerHTML = data[0]["artist"]
    image = String(data[0]['image'])
    console.log(image)
    let imageSRC = document.getElementById("album-art")
    imageSRC.src = image
    let list = document.getElementById("past-tracks");
    // Clear the list
    list.innerHTML = ""
    for (let i = 1; i < data.length; i++) {
        let row = document.createElement("tr");
        song_title = data[i]["song"]
        artist = data[i]["artist"]

        row.innerHTML = song_title + " (" + duration(data[i]["duration"]) + ")";
        list.appendChild(row);
    }
}

function trimToLength(string, length) {
    if (string.length > length) {
        return string.substring(0, length - 3) + "..."
    } else {
        return string
    }
}

async function fetchTracks() {
    console.log("Fetching track data...");
    request = `/.netlify/functions/spins`
    console.log("Request: " + request)
    let response = await fetch(request);
    let data = await response.json();
    console.log("Recieved track data...");
    console.log(data);

    insertTracks(data)
    store("recentTracks", data)
    console.log("Stored track data...");
    insertTracks(data)
    setTimeout(fetchTracks, 15000)
}


async function putRecentTracks() {
    if (store.has("recentTracks")) {
        insertTracks(store.get("recentTracks"));
        console.log("Inserted stored track data...");
    }
    fetchTracks();
}

putRecentTracks()