

function trimToLength(string, length) {
    if (string.length > length) {
        return string.substring(0, length - 3) + "..."
    } else {
        return string
    }
}

async function putRecentTracks() {
    function duration(duration_time) {
        let minutes = Math.floor(duration_time / 60)
        let seconds = duration_time % 60
        if (seconds < 10) {
            seconds = "0" + seconds
        }
        return minutes + ":" + seconds
    }
    request = `/.netlify/functions/spins`
    console.log("Request: " + request)
    let response = await fetch(request);
    let data = await response.json();
    console.log("Recieved track data...");
    console.log(data)
    console.log(typeof data)
    document.getElementById("current-track").innerHTML = "Currently playing:\n"
    first_duration = data[0]["duration"]
    document.getElementById("current-track").innerHTML += data[0]["song"] + " by " + data[0]["artist"] + " (" + duration(first_duration) + ")\n"
    document.getElementById("past-tracks").innerHTML = "Past tracks:"
    let list = document.getElementById("tracks-list");
    for (let i = 1; i < data.length; i++) {
        let row = document.createElement("tr");
        song_title = data[i]["song"]
        artist = data[i]["artist"]

        row.innerHTML = song_title + " by " + artist + " (" + duration(data[i]["duration"]) + ")";
        list.appendChild(row);
    }

}

putRecentTracks()
