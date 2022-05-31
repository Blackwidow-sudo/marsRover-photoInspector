import { RoverName } from "../types";
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

        label,
        input,
        select {
            display: block;
            width: 100%;
            margin-top: 10px;

            text-align: center;
        }

        #search {
            border: 2px solid #91e5b7;
            border-radius: 5px;
            background-color: #fff;
            padding: 5px 10px;
            margin-top: 20px;
        }

        #search:hover {
            cursor: pointer;
            background-color: #91e5b7;
        }
    </style>

    <div id="searchForm">
        <label for="bySol">By Martian sol:</label>
        <input type="number" id="bySol" />
        <label for="byDate">By Earth date</label>
        <input type="date" id="byDate" />
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
    private _roverName: RoverName;

    constructor(roverName: RoverName) {
        super();

        this._roverName = roverName;
        this.attachShadow({ mode: "open" });
        this.shadowRoot!.appendChild(template.content.cloneNode(true));
    }

    private _configureInputElements() {
        /**
         * TODO:
         * set min/max value for Sol
         * set min/max value for Date
         * set max value for Pages
         */ 
    }

    private _populateSelectEl() {
        const avblCams = availableCams[this._roverName.toLowerCase()]

        avblCams.forEach(cam => {
            const option = document.createElement("option")
            option.title = cameraDescriptions[cam]
            option.value = cam
            option.textContent = cam

            this.shadowRoot!.querySelector("#cameras")!.appendChild(option)
        })
    }

    private _handleSubmit(e: Event) {
        
    }

    connectedCallback() {
        this._populateSelectEl();

        const sbmtBtn = this.shadowRoot!.querySelector("#search") as HTMLInputElement

        sbmtBtn.addEventListener("click", this._handleSubmit)
    }

    disconnectedCallback() {
        this.shadowRoot!.querySelector("#search")!.removeEventListener("click", this._handleSubmit)
    }
}

window.customElements.define("rover-form", RoverForm);
