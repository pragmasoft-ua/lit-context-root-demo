import { ContextProvider } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { myContext } from "./my-context";

/**
 * An example element.
 *
 * @slot - This element has a slot
 */
export class MyElement extends LitElement {
  static properties = {
    greeting: { type: String },
  };

  #provider = new ContextProvider(this, {
    context: myContext,
    initialValue: "Default",
  });

  constructor() {
    super();
    console.debug("my-element constructed", this.id);
  }

  connectedCallback() {
    super.connectedCallback();
    console.debug("my-element connected", this.id);
    this.#provider.setValue(this.greeting);
  }

  render() {
    return html`<slot></slot>`;
  }
}

window.customElements.define("my-element", MyElement);
