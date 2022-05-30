export default class TestElement extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot!.innerHTML = `
            <h1>Hello World</h1>
        `;
    }
}

window.customElements.define("test-element", TestElement);
