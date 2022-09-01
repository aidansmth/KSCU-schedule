
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
    title = localStorage.getItem('title')
    if (title !== null) {
        start_time = new Date(localStorage.getItem('start_time'))
        end_time = new Date(localStorage.getItem('end_time'))
        DJ_name = localStorage.getItem('DJ_name')
        console.log("Found show data in local memory...")
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
        return
    }
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

        localStorage.setItem('title', title)
        localStorage.setItem('category', category)
        localStorage.setItem('start_time', start_time)
        localStorage.setItem('end_time', end_time)
        localStorage.setItem('duration', duration)
        localStorage.setItem('DJ_name', DJ_name)
        localStorage.setItem('DJ_bio', DJ_bio)
        localStorage.setItem('DJ_since', DJ_since)
        console.log("Set local storage...")

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