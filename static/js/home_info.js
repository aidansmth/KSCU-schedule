function getSong() {
    request = `/.netlify/functions/song?name="Bob"`
    fetch(request)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            live = data['live']
            show = data['show']
            if (live === true) {
                document.getElementById("title").innerHTML = "Live now: " + show;
            } else {
                document.getElementById("title").innerHTML = "Upcoming show: " + show;
            }
        });
}

getSong()