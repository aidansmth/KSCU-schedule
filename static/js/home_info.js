async function getSong() {
    console.log("Entered function...")
    try {
        request = `/.netlify/functions/song`
        console.log("Request: " + request)
        let response = await fetch(request);
        let data = await response.json();
        console.log("Recieved data...");
        console.log(data)
        let title = data['title']
        console.log("Show title: " + title)
        category = data['category']
        start_time = new Date(data['start_time'])
        end_time = new Date(data['end_time'])
        duration = data['duration']
        DJ_name = data['DJ_name']
        DJ_bio = data['DJ_bio']
        DJ_since = data['DJ_since']

        // Test if the show is currently playing or upcoming
        if (start_time > new Date()) {
            console.log("Show is upcoming...")
            document.getElementById("title").innerHTML = "Up next: " + title + " with " + DJ_name;
        } else {
            if (end_time < new Date()) { // Test to make sure show is still live
                // Throw error
                throw new Error("Show is in the past...")
            }
            console.log("Show is currently playing...")
            document.getElementById("title").innerHTML = "Live now: " + title + " with " + DJ_name;
        }
    }
    catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

getSong()