 /*jshint esversion: 6 */
var eventBus = new Vue();

Vue.component("Header", {
    template: `
    <form class="header-form">
        <h1>
            {{ parkName }} Trail Counter
        </h1>
    </form>
    `
});
var startDate = new Date();
var startTime = startDate.getHours() + ":" + startDate.getMinutes() + ":" + startDate.getSeconds();


// Report template
Vue.component("report", {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p>
            <div class="inputline">
                <img id="name_button" src="pics/name_button.svg"><input id="name" v-model="name" placeholder="Staff/VIP Name(s)">
            </div>
        </p>
        <p>
            <div class="inputline">
                <img id="date_button" src="pics/date_button.svg"><input id="date"
                    v-model="date"
                    placeholder="date"
                    type="date">
            </div>
        </p>
        <p>
            <div class="inputline">
                <img id="trail_button" src="pics/trail_button.svg"><select id="location" v-model="location">
                    <option :value="null" disabled>Select a Trail...</option>
                    <option
                        v-for="(trail, index) in trails"
                        :key="index">{{ trail }}</option>
                </select>
            </div>
        </p>

        <p>
            <label>Number of Encounters: </label><label class="counter_right">Number of Encounters: </label><br>
            <label id="counts">{{ upCount }}</label><label class="counter_right" id="counts">{{ downCount }}</label>
        </p>

        <p>
            <div class="count_buttons">
                <img id="up_direction" v-on:click="addUpCount"
                    src="pics/up_direction.svg"></img>
                <img id="down_direction" v-on:click="addDownCount"
                    src="pics/down_direction.svg"></img>
            </div>
        </p>

        <p>
            <div class="inputline">
                <img id="weather_button" src="pics/weather_button.svg"><select id="weatherOptions" v-model="selectedWeatherOption">
                <option :value="null" disabled>Weather...</option>
                <option
                    v-for="(weather, index) in weatherOptions"
                    :key="index">{{ weather }}</option>
                </select>
            </div>
        </p>

        <p>
            <div class="inputline">
                <img id="notes_button" src="pics/notes_button.svg">
                <textarea id="notes" v-model="notes" placeholder="Notes"></textarea>
            </div>
        </p>

        <p>
            <div class="inputline">
                <img id="visitation_button" src="pics/visitation_button.svg">
                <select id="visitationOptions" v-model="selectedVisitationOption">
                    <option :value="null" disabled>Visitation Status...</option>
                    <option
                        v-for="(visitation, index) in visitationOptions"
                        :key="index">{{ visitation }}</option>
                </select>
            </div>
        </p>

        <p>
            <div class="inputline">
                <img id="trail_status_button" src="pics/trail_status_button.svg">
                <select id="trailStatusOptions" v-model="selectedTrailStatusOption">
                    <option :value="null" disabled>Trail Status...</option>
                    <option
                        v-for="(trailStatus, index) in trailStatusOptions"
                        :key="index">{{ trailStatus }}</option>
                </select>
            </div>
        </p>

        <p>
            <div class="inputline">
                <img id="trail_conditions_button" src="pics/trail_conditions_button.svg">
                <select id="trailConditionsOptions" v-model="selectedTrailConditionsOption">
                    <option :value="null" disabled>Trail Condition...</option>
                    <option
                        v-for="(trailConditions, index) in trailConditionsOptions"
                        :key="index">{{ trailConditions }}</option>
                </select>
            </div>
        </p>

        <p>
            <div id="addPicWrapper">
                <input class="hide_file" 
                type="file" 
                ref="file"
                name="image" 
                accept="image/*" 
                capture="environment"
                style="display:none;boder:none;">
                <img id="addPictureCss"
                src="pics/add_picture_button.svg"
                @click="$refs.file.click()"
                >
                </input>
            </div>
            <p id="centerP">Please insert the taken photo into the email.</p>
        </p>

        <p>
            <input id="submit" type="submit" value="Send" style="border-radius:5px;">
        </p>
        <p v-if="errors.length">
            <b> Please correct the following error(s):</b>
            <ul>
                <li class="errorMessages" v-for="error in errors">{{ error }}</li>
            </ul>
        </p>

    </form>
    `,
    data() {
        return {
            name: null,
            date: null,
            location: null,
            latitude: null,
            geolocation: null,
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
        };
    },

    //used to find location:
    mounted(){
        
        function error() {
            status.textContent = 'Unable to retrieve your location';
        }

        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        }
        else {
            status.textContent = 'Locating…';
            navigator.geolocation.getCurrentPosition(this.handleGetGeoLocation, error);
        }
    },


    methods: {

        handleGetGeoLocation(pos){
            var crd = pos.coords;

            const status = document.querySelector('#status');
            const latitude  = crd.latitude;
            const longitude = crd.longitude;

            console.log('Your current position is:');
            console.log(`Latitude : ${latitude}`);
            console.log(`Longitude: ${longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);

            this.latitude = latitude;
            this.longitude = longitude;
        },

        // need to rewrite onSubmit to send a confirmation to the user
        // and send the report via email.
        onSubmit() {
            //reset the errors list:
            console.log(this.errors.length);
            for(i = 0; i <= this.errors.length; i++){
                this.errors.pop();
            }
            var endDate = new Date();
            var endTime = endDate.getHours() + ":" + endDate.getMinutes() + ":" + endDate.getSeconds();
            if (this.name && this.location) {

                //We are now able to access the data with these names:
                //It is the data member that is connected to the v-model tag.


                console.log(this.name);
                console.log(this.date);
                console.log(startTime);
                console.log(endTime);
                console.log(this.location);
                console.log(this.latitude);
                console.log(this.longitude);
                console.log(this.upCount);
                console.log(this.downCount);
                console.log(this.selectedWeatherOption);
                console.log(this.notes);
                console.log(this.selectedVisitationOption);
                console.log(this.selectedTrailStatusOption);
                console.log(this.selectedTrailConditionsOption);

                //The email call should go here:
                //->
                var park = "Zion%20Data%20Submission";
                window.open("mailto:" + "?subject=" + park + "&body=" + 
                    this.name + ";" +
                    this.date + ";" +
                    startTime + ";" +
                    endTime + ";" +
                    this.location + ";" +
                    this.latitude + ";" +
                    this.longitude + ";" +
                    this.upCount + ";" + 
                    this.downCount + ";" + 
                    this.selectedWeatherOption + ";" + 
                    this.selectedVisitationOption + ";" +
                    this.selectedTrailStatusOption + ";" + 
                    this.selectedTrailConditionsOption + ";" +
                    this.notes + ";"

                );
                //

            }
            else {
                if (!this.name) this.errors.push("Name required.");
                if (!this.location) this.errors.push("Trail required.");
            }
        },
        // these simply increment the counters for up and down direction.
        addUpCount() {
            this.upCount += 1;
        },
        addDownCount() {
            this.downCount += 1;
        },
        addPicButton(){
            
        }
    }
});

var app = new Vue({
    el: "#app",
    data() {
        return {
            parkName: "Zion"
        };
    },
    methods: {
    }
});


//used to make it persist:
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
// addBtn.style.display = 'none';

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
