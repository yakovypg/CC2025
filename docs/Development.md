# Development

This document provides useful information for developers to enhance the project.

## Table Of Contents

*    [Quick Start](#quick-start)
     *    [Build](#build)
     *    [Start](#start)
*    [Scripts](#scripts)

## Quick Start

This application was developed for the VK mini-app ecosystem, so everything you can do with it is described in the complete and detailed [documentation](https://dev.vk.com/ru/mini-apps/getting-started). In this regard, we will not duplicate information about the integration with VK.

To run the application locally, just start the [server](https://github.com/yakovypg/CC2025-Server) (refer to its documentation for instructions on how to do this), and then execute the `yarn start` command.

You should also execute the `yarn init` command before `yarn start` if you are going to start the application for the first time.

After these steps, the application should be available on your host. More information about it can be found in the output of `yarn start`.

### Build

You can build the server using the following command.

```bash
yarn build
```

### Start

You can start the server using the following command.

```bash
yarn start
```

## Scripts

You can utilize the scripts included in the `package.json` file to work efficiently with the server and its code. For example, you can run `yarn format` to format all source files.
