import { ContextConsumer } from "@lit-labs/context";
import { LitElement, html } from "lit";
import { myContext } from "./my-context";

/**
 * An example child element.
 *
 * @slot - This element has a slot
 */
export class ChildElement extends LitElement {
  #onContext = (value) => {
    console.debug("child-element context changed", this.id, value);
  };

  #consumer = new ContextConsumer(this, {
    context: myContext,
    callback: this.#onContext,
    subscribe: true,
  });

  constructor() {
    super();
    console.debug("child-element constructed", this.id);
  }

  connectedCallback() {
    super.connectedCallback();
    console.debug("child-element connected", this.id);
  }

  render() {
    const greeting = this.#consumer.value;
    console.debug("child-element rendering", this.id);
    return html`<h2>${greeting}</h2>
      <slot></slot>`;
  }
}

window.customElements.define("child-element", ChildElement);
