var eventBus = new Vue()

Vue.component("Header", {
    template: `
    <form class="header-form">
        <h1>
            {{ parkName }} Trail Counter
        </h1>
    </form>
    `
})
var startDate = new Date();
var date = startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate();
var time = startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds();
var startDateTime = date+' '+time;

var endDate = new Date();
date = endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate();
time = endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds();
var endDateTime = date+' '+time;


// Report template
Vue.component("report", {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b> Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>
        <p>
            <label>Name:</label>
            <input id="name" v-model="name" placeholder="name">
        </p>
        <p>
            <label>Date:</label>
            <input id="date"
                v-model="date"
                placeholder="date"
                type="date">
        </p>
        <p>
            <label>Trail or Segment Name:</label>
            <select id="location" v-model="location">
                <option
                    v-for="(trail, index) in trails"
                    :key="index">{{ trail }}</option>
            </select>
        </p>

        <p>
            <p id="status"></p>
            <p id="latitude" v-model="latitude"></p>
            <p id="longitude" v-model="longitude"></p>
        </p>

        <p>
            <label>Number of Encounters (Up Direction): {{ upCount }}</label>
            <img v-on:click="addUpCount"
                src="pics/button_up.png"></img>
        </p>

        <p>
            <label>Number of Encounters (Down Direction): {{ downCount }}</label>
            <img v-on:click="addDownCount"
                src="pics/button_down.png"></img>
        </p>

        <p>
            <label>Weather</label>
            <select id="weatherOptions" v-model="selectedWeatherOption">
                <option
                    v-for="(weather, index) in weatherOptions"
                    :key="index">{{ weather }}</option>
            </select>
        </p>

        <p>
            <label>Notes:</label>
            <textarea id="notes" v-model="notes"></textarea>
        </p>

        <p>
            <label>Visitation</label>
            <select id="visitationOptions" v-model="selectedVisitationOption">
                <option
                    v-for="(visitation, index) in visitationOptions"
                    :key="index">{{ visitation }}</option>
            </select>
        </p>

        <p>
            <label>Trail Status</label>
            <select id="trailStatusOptions" v-model="selectedTrailStatusOption">
                <option
                    v-for="(trailStatus, index) in trailStatusOptions"
                    :key="index">{{ trailStatus }}</option>
            </select>
        </p>

        <p>
            <label>Trail Conditions</label>
            <select id="trailConditionsOptions" v-model="selectedTrailConditionsOption">
                <option
                    v-for="(trailConditions, index) in trailConditionsOptions"
                    :key="index">{{ trailConditions }}</option>
            </select>
        </p>


        <div class="input-wrapper">
            <label id="photos">Photos</label>
            <input type="file" id="file" accept=".jpg, .jpeg, .png" name="file" multiple>
        </div>

        <p>
            <input type="submit" value="Submit">
        </p>

    </form>
    `,
    data() {
        return {
            name: null,
            date: null,
            location: null,
            latitude: null,
            longitude: null,
            upCount: 0,
            downCount: 0,
            errors: [],
            trails: [
                "Upper Emerald Pools",
                "Middle Emerald Pools",
                "Lower Emerald Pools",
                "The Watchman Trail",
                "Visitor Center Strolls",
                "Pa'rus Trail",
                "The Sand Bench Loop",
                "Weeping Rock",
                "Observation Point",
                "Hidden Canyon",
                "Angels Landing",
                "West Rim Trail",
                "The Grotto Trail",
                "Riverside Walk",
                "Banks of the Virgin River",
                "Cable Mountain",
                "Deertrap Mountain",
                "Lower Pine Creek",
                "Menu Falls",
                "Echo Canyon",
                "Behunin Canyon",
                "Archeology Trail",
                "Kayenta Trail",
                "Canyon Overlook Trail",
                "Taylor Creek Trail",
                "Timber Creek Trail",
                "La Verkin Creek Trail",
                "Kolob Arch Trail",
                "Right Fork Trailhead",
                "Left Fork Trailhead",
                "Grapevine Trailhead",
                "Wildcat Trailhead",
                "Subway Trailhead",
                "Chinle Trailhead",
                "Lee Pass Trailhead",
                "Lady Mountain"
            ],
            weatherOptions: [
                "Sunny",
                "Mostly Sunny",
                "Partly Sunny",
                "Cloudy",
                "T-Storms",
                "Rain Showers",
                "Rain",
                "Sleet",
                "Snow",
                "Haze",
                "Smokey"
            ],
            selectedWeatherOption: null,
            notes: null,
            visitationOptions: [
                "Not busy",
                "Not too busy",
                "Little busy",
                "Busy as it gets"
            ],
            selectedVisitationOption: null,
            trailStatusOptions: [
                "Clear",
                "Minor Issue",
                "Significant Issue",
                "Closed or Major Issue"
            ],
            selectedTrailStatusOption: null,
            trailConditionsOptions: [
                "Dry or Normal summer conditions",
                "Mostly Dry with some water",
                "Wet and slippery",
                "Some Snow",
                "Snow",
                "Snow and Ice"
            ],
            selectedTrailConditionsOption: null,
            photos: null
        }
    },
    methods: {

        // need to rewrite onSubmit to send a confirmation to the user
        // and send the report via email.
        onSubmit() {
            if (this.name) {
                let productReview = {
                    name: this.name,
                    date: this.date,
                    location: this.location,
                    upCount: this.upCount,
                    downCount: this.downCount,
                    weather: this.selectedWeatherOption,
                    notes: this.notes,
                    visitation: this.selectedVisitationOption,
                    trailStatus: this.selectedTrailStatusOption,
                    trailConditions: this.selectedTrailConditionsOption
                    //here we need to also grab latitude and longitude
                };

                //We are now able to access the data with these names:
                //It is the data member that is connected to the v-model tag.


                console.log(this.name)
                console.log(this.date)
                console.log(this.location)
                console.log(this.latitude)
                console.log(this.longitude)
                console.log(this.upCount)
                console.log(this.downCount)
                console.log(this.selectedWeatherOption)
                console.log(this.notes)
                console.log(this.selectedVisitationOption)
                console.log(this.selectedTrailStatusOption)
                console.log(this.selectedTrailConditionsOption)

                //The email call should go here:
                //->
                var email = "ckgard27@gmail.com";
                var park = "Zion%20Data%20Submission"
                window.open("mailto:" + email + "?subject=" + park + "&body=" + 
                    "Name:%20" + name + "%0A" +
                    "Date:%20" + date + "%0A" +
                    "Location:%20" + location + "%0A" +
                    "GeoLocation:%20" + latitude + ",%20" + longitude + "%0A" +
                    "Count%20Upwards:%20" + upCount + "%0A" + 
                    "Count%20Downwards:%20" + downCount + "%0A" + 
                    "Weather:%20" + weather + "%0A" + 
                    "Visitation%20Report:%20" + selectedVisitationOption + "%0A" +
                    "Trail%20Status:%20" + selectedTrailStatusOption + "%0A" + 
                    "Trail%20Condition:%20" + selectedTrailConditionsOption + "%0A" +
                    "Notes:%20" + notes
                );
                //

                eventBus.$emit('review-submitted', productReview)
                this.name = null
            }
            else {
                if (!this.name) this.errors.push("Name required.")
            }
        },
        // these simply increment the counters for up and down direction.
        addUpCount() {
            this.upCount += 1
        },
        addDownCount() {
            this.downCount += 1
        }
    }
})

var app = new Vue({
    el: "#app",
    data() {
        return {
            parkName: "Zion"
        }
    },
    methods: {
    }
})


//used to find location:
function geoFindMe() {

    const status = document.querySelector('#status');

    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = "";

        var latitudeMem = document.querySelector("#latitude");
        var longitudeMem = document.querySelector("#longitude");

        latitudeMem.textContent = `Latitude: ${latitude} °`;
        longitudeMem.textContent = `Longitude: ${longitude} °`;
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

}
geoFindMe();

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});
