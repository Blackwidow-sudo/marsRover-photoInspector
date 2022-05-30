import { CamAbbr, RoverName } from "../types";
import { cameraNames } from "../globals";

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
        <input type="number" id="pages" />
        <label for="cameras">Select a Camera:</label>
        <select name="cameras" id="cameras">
            <option value="none" disabled slected>Select Camera</option>
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

    // TODO: Create type for availableCameras
    private _populateSelectEl(/* availableCameras: Object */) {
        for (const [key, val] of Object.entries(availableCameras)) {
            const option = document.createElement("option");
            option.value = key;
            option.title = val;
            option.textContent = key;

            this.shadowRoot!.querySelector("#cameras")!.appendChild(option);
        }
    }

    connectedCallback() {
        this._populateSelectEl(cameraNames);
    }
}

window.customElements.define("rover-form", RoverForm);
