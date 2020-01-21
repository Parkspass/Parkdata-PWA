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
            <select id="location" v-model.number="location">
                <option
                    v-for="(trail, index) in trails" 
                    :key="index">{{ trail }}</option>
            </select>
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
            <label>Start Time</label>

        </p>

        <p>
            <label>End Time</label>

        </p>

        <p>
            <label>Weather</label>
            <select id="weatherOptions" v-model.number="weatherOptions">
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
            <select id="visitationOptions" v-model.number="visitationOptions">
                <option
                    v-for="(visitation, index) in visitationOptions" 
                    :key="index">{{ visitation }}</option>
            </select>
        </p>

        <p>
            <label>Trail Status</label>
            <select id="trailStatusOptions" v-model.number="trailStatusOptions">
                <option
                    v-for="(trailStatus, index) in trailStatusOptions" 
                    :key="index">{{ trailStatus }}</option>
            </select>
        </p>
            
        <p>
            <label>Trail Conditions</label>
            <select id="trailConditionsOptions" v-model.number="trailConditionsOptions">
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
            notes: null,
            visitationOptions: [
                "Not busy",
                "Not too busy",
                "Little busy",
                "Busy as it gets"
            ],
            trailStatusOptions: [
                "Clear",
                "Minor Issue",
                "Significant Issue",
                "Closed or Major Issue"
            ],
            trailConditionsOptions: [
                "Dry or Normal summer conditions",
                "Mostly Dry with some water",
                "Wet and slippery",
                "Some Snow",
                "Snow",
                "Snow and Ice"
            ],
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
                    weather: this.weatherOptions,
                    notes: this.notes,
                    visitation: this.visitation,
                    trailStatus: this.trailStatus,
                    trailConditions: this.trailConditions
                    //here we need to also grab latitude and longitude
                }

                //For some reason we aren't able to access weather, 
                //visitation, trailStatus, or trailConditions from the form.
                //I will continue working on that.

                console.log(this.name)
                console.log(this.date)
                console.log(this.location)
                console.log(this.upCount)
                console.log(this.downCount)
                console.log(this.weatherOptions)
                console.log(this.notes)
                console.log(this.visitationOptions)
                console.log(this.trailStatusOptions)
                console.log(this.trailConditionsOptions)
                
                //For now work here to get the email working and we will add the info later:
                //->

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
    const mapLink = document.querySelector('#map-link');
  
    mapLink.href = '';
    mapLink.textContent = '';
  
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        status.textContent = '';
        mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
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
