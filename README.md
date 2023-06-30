# Lit `ContextRoot` usage demo

This sample project demonstrates a solution to the incorrect initialization order of custom components.

[Link to the discussion thread](https://github.com/lit/lit/discussions/3302#discussioncomment-6319569)

I seems found one serious shortcoming of the [Context protocol](https://github.com/webcomponents-cg/community-protocols/blob/main/proposals/context.md).

The problem is, that it depends on the order of the initialization of participated elements.

Precisely, it expects, that context provider is initialized before context consumer, otherwise it will miss the context-request event from the consumer.

If consumer is in the shadow dom of a provider, this is always the case.

Though, if both provider and consumer are in the light dom, this may not be the case anymore, even if provider is a consumer's parent.

I created two elements and a demo page like this one:

```
<html lang="en">
  <head>
    <link rel="stylesheet" href="./src/index.css" />
    <script type="module" src="/src/child-element.js"></script>
    <script type="module" src="/src/my-element.js"></script>
  </head>
  <body>
    <my-element id="my">
      <child-element id="child"><h1>Vite + Lit</h1></child-element>
    </my-element>
  </body>
</html>
```

and got the following initialization order:

```
child-element constructed child
child-element connected child
my-element constructed my
my-element connected my
```

If I change the order of scripts in the html page, that is, my-element.js module is loaded before the child-element.js, the initialization order changes to

```
my-element constructed my
my-element connected my
child-element constructed child
child-element connected child
```

It was advised to use [ContextRoot](https://lit.dev/docs/data/context/#contextroot) as a solution

I ended up with the following solution, which in my opinion has minimal overhead.

I added `ContextRoot` initialization as a side effect to the same module where context is created, since it is imported by both provider and consumer modules and thus is executed before them and only once:

`my-context.js`

```
import { ContextRoot, createContext } from "@lit-labs/context";

console.debug("my-context initialized");

new ContextRoot().attach(document.documentElement);

export const myContext = createContext("my-context");

```
