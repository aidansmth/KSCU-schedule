function getSong() {
    request = `/.netlify/functions/song?name="Bob"`
    fetch(request).then((response) => {
        console.log(response);
        response.json().then((data) => {
            console.log(data);
        });
    });
}

getSong()