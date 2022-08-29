
const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    let strTime = hours + ':' + minutes + '' + ampm;
    return strTime;
}

async function getShow() {
    console.log("Entered function...")
    try {
        request = `/.netlify/functions/show`
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
            document.getElementById("title").innerHTML = "Next Show: " + title;
            document.getElementById("DJ").innerHTML += " with " + DJ_name + " at " + formatAMPM(start_time) + "\n"
        } else {
            if (end_time < new Date()) { // Test to make sure show is still live
                // Throw error
                throw new Error("Show is in the past...")
            }
            console.log("Show is currently playing...")
            document.getElementById("title").innerHTML = "Live now: " + title;
            document.getElementById("DJ").innerHTML += " with " + DJ_name + " till " + formatAMPM(end_time) + "\n"
        }
        return { statusCode: 500, body: "Next Show: " + title }
    }
    catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

getShow()