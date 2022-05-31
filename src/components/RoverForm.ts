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
    </style>

    <h4>Search Photos</h4>
    <div id="searchForm">
        <!--
        <div id="chooseSolOrDate">
            <label for="sol">
                <input type="radio" name="solOrDate" value="sol" id="sol" checked />
                By Martian sol
            </label>
            <label for="date">
                <input type="radio" name="solOrDate" value="date" id="date" />
                By Earth date
            </label>
        </div>

        <label for="bySol">By Martian sol:</label>
        <input type="number" id="bySol" min="0" />

        <label for="byDate">By Earth date</label>
        <input type="date" id="byDate" />
        -->

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

export default class RoverForm extends HTMLElement {
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
        this._initInputs();
    }

    disconnectedCallback() {}

    private _initInputs() {
        // Set min/max values for sol/day input
        const radioGroup = this.shadowRoot!.querySelector(
            "#radioGroup"
        ) as HTMLDivElement;
        radioGroup.addEventListener("change", (e: Event) => {
            const clickedElem = e.target as HTMLInputElement;

            if (clickedElem.value === "date") {
                this._changeDayInputType("date");
            } else {
                this._changeDayInputType("sol");
            }
        });

        // Populate Camera-Selector
        const availCams = availableCams[this.name.toLowerCase()];

        availCams.forEach((cam) => {
            const option = document.createElement("option");
            option.title = cameraDescriptions[cam];
            option.value = cam;
            option.textContent = cam;

            this.shadowRoot!.querySelector("#cameras")!.appendChild(option);
        });
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
}

window.customElements.define("rover-form", RoverForm);
