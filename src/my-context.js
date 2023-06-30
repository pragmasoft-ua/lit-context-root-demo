import { ContextRoot, createContext } from "@lit-labs/context";

console.debug("my-context initialized");

new ContextRoot().attach(document.documentElement);

export const myContext = createContext("my-context");
