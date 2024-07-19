# Overview guide for `routes`

## ⚒️ Usage

This project uses Sveltekit which has an in-built file-based routing system. This means that each folder in the `routes` directory represents a route in the application. You can check out the official documentation [here](https://kit.svelte.dev/docs/routing).

## 🏗️ Folder Structure

```bash
└── routes
    ├── +error.svelte
    ├── +layout.svelte
    ├── +layout.ts
    ├── +page.ts
    ├── README.md
    ├── bridge
    │   ├── +layout.svelte
    │   ├── +page.svelte
    │   ├── mPondToPondHistory
    │   │   └── +page.svelte
    │   └── pondToMPondHistory
    │       └── +page.svelte
    ├── oyster
    │   ├── +layout.svelte
    │   ├── +page.ts
    │   ├── history (WIP)
    │   │   └── +page.svelte
    │   ├── inventory
    │   │   └── +page.svelte
    │   ├── marketplace
    │   │   └── +page.svelte
    │   └── operator
    │       ├── +page.svelte
    │       ├── history (WIP)
    │       │   └── +page.svelte
    │       └── jobs
    │           └── +page.svelte
    └── relay
        ├── +layout.svelte
        ├── +page.ts
        └── receiver
            ├── +page.ts
            ├── rewards
            │   └── +page.svelte
            └── staking
                └── +page.svelte

```

## 📚 Guidelines

> You might notice that we don't have any `+page.server.ts` or `+layout.server.ts` that is because we don't have any server side code as of now.

### `+page.ts`

Currently, this file is used to redirect users to correct routes and making sure that each intermediate route lands the user to a route which has a non-empty `+page.svelte`. For example, if the user lands on `/` they will be redirected to `/relay/receiver/staking` and if they land on `/oyster` they will be redirected to `/oyster/marketplace`.

### `+layout.ts`

We currently use this file only at the root level to define [page options](https://kit.svelte.dev/docs/page-options#trailingslash) and [SSG behaviour](https://kit.svelte.dev/docs/adapter-static).

### `+error.svelte`

This file is used to render the error page. We use this file to render the error page for all the routes as of now, this is only defined at the root of `routes/` folder.

### `+layout.svelte`

In the root `+layout.svelte` file we do a couple of things:

- set meta tags,
- add navigation and other global components, and
- disable client side logs for users when in production mode.

In `+layout.ts` files other than the one residing in the root, we do the following:

- add title,
- load data that all the other child routes need access to,
- check if the chain that the user is connected to is supported by the child routes or not, and
- render a network prompt based on the above

### `+page.svelte`

This file is responsible for loading page specific data and rendering appropriate components for the respective page. This file is present in all the routes except the root route.
