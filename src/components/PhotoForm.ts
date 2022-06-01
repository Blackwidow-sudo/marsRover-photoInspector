import { RoverInformation, RoverName } from "../types";
import { availableCams, cameraDescriptions } from "../globals";

const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: inline-block;
        }

        #searchForm {
            /*
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            */

            margin: 20px auto;
        }

        #search {
            border: 2px solid #91e5b7;
            border-radius: 5px;
            background-color: #fff;
            padding: 5px 10px;
            margin-top: 20px;
        }

        #searchForm > label,
        #searchForm > input,
        #searchForm > select {
            display: block;
            width: 100%;
            margin-top: 10px;

            text-align: center;
        }

        #search:hover {
            cursor: pointer;
            background-color: #91e5b7;
        }

        #day {
            width: 100%;
        }
    </style>

    <h4>Search Photos</h4>
    <div id="searchForm">
        <div id="dayPicker">
            <div id="radioGroup">
                <label for="bySol">
                    <input type="radio" value="sol" name="solOrDate" id="bySol" />
                    <span>By Martian sol</span>
                </label>
                <label for="byDate">
                    <input type="radio" value="date" name="solOrDate" id="byDate" />
                    <span>By Earth date</span>
                </label>
            </div>

            <input type="number" type="number" min="0" id="day" />
        </div>
        
        <label for="pages">Pages (25 Items per page):</label>
        <input type="number" id="pages" value="1" />

        <label for="cameras">Select a Camera:</label>
        <select name="cameras" id="cameras">
            <option value="none" disabled selected>Select Camera</option>
        </select>

        <input type="button" value="Search Photos" id="search" />
    </div>
`;

export default class PhotoForm extends HTMLElement {
    private _roverInfo: RoverInformation;

    constructor(roverInfo: RoverInformation) {
        super();

        this._roverInfo = roverInfo;
        this.attachShadow({ mode: "open" });
        this.shadowRoot!.appendChild(template.content.cloneNode(true));
    }

    public get rover() {
        return this._roverInfo;
    }

    public get name() {
        return this.rover.name;
    }

    connectedCallback() {
        this._initForm();
    }

    disconnectedCallback() {}

    private _initForm() {
        this._initDayInput();

        // Set min/max values for sol/day input
        const radioGroup = this.shadowRoot!.querySelector(
            "#radioGroup"
        ) as HTMLDivElement;

        // Important to bind the Web-Component as "this" to the eventHandler
        radioGroup.addEventListener("change", this._handleRadio.bind(this));

        // Populate Camera-Selector
        const availCams = availableCams[this.name.toLowerCase()];

        availCams.forEach((cam) => {
            const option = document.createElement("option");
            option.title = cameraDescriptions[cam];
            option.value = cam;
            option.textContent = cam;

            this.shadowRoot!.querySelector("#cameras")!.appendChild(option);
        });

        // Important to bind the Web-Component as "this" to the eventHandler
        (this.shadowRoot!.querySelector("#search") as HTMLInputElement).addEventListener(
            "click",
            this._handleSubmit.bind(this)
        );
    }

    private _initDayInput() {
        const dayInput = this.shadowRoot!.querySelector("#day") as HTMLInputElement;

        (this.shadowRoot!.querySelector("#bySol") as HTMLInputElement)!.checked = true;

        dayInput.type = "number";
        dayInput.placeholder = this.rover.max_sol.toString();
        dayInput.min = "0";
        dayInput.max = this.rover.max_sol.toString();
    }

    private _changeDayInputType(to: "sol" | "date") {
        const dayInput = this.shadowRoot!.querySelector("#day") as HTMLInputElement;

        if (to === "date") {
            dayInput.type = "date";
            dayInput.min = this.rover.landing_date;
            dayInput.max = this.rover.max_date;
        } else {
            dayInput.type = "number";
            dayInput.min = "0";
            dayInput.max = this.rover.max_sol.toString();
        }
    }

    private _handleRadio(e: Event) {
        const clickedElem = e.target as HTMLInputElement;

        if (clickedElem.value === "date") {
            this._changeDayInputType("date");
        } else {
            this._changeDayInputType("sol");
        }
    }

    private _handleSubmit(e: Event) {
        const clickedElem = e.target;
        console.log(clickedElem);
    }
}

window.customElements.define("photo-form", PhotoForm);
