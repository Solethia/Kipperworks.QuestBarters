# Welcome to Quest Barters
The purpose of Quest Barters is to add guns and attachments required for quests, primarily to make quests easier to do on hardcore runs. As I've already made Gunsmith Barters for the gunsmith quests this mod does not cover items for those quests. If you in general just want more barters this mod will also fill that niche. This mod works well with mods that remove non-barters like the Hardcore Rules mod. In an attempt to maintain the spirit of hardcore an attempt to make the barter cost balanced was made. Feel free to give feedback on incorrect, missing or unbalanced entries. Only items normally provided by traders for money will be added using the same trader level and quest requirements as the money trade.

## Quests
Below you can see what quests the mod covers and what barter items was added for those quests.

### Hell on Earth Part 1

| Added Item | Barter Cost | Trader | Quest Restriction |
| ---------- | ----------- | ------ | ----------------- |
| MP-43-1C 12ga double-barrel shotgun | 2xShustrilo sealing foam | Jaeger LVL1 | None |
| MP-43-1C 12ga 510mm barrel | 3xSilicone Tube | Jaeger LVL1 | None |

### Test Drive Part 4

| Added Item | Barter Cost | Trader | Quest Restriction |
| ---------- | ----------- | ------ | ----------------- |
| NPZ 1P78-1 dovetail mount | 1xRechargeable battery 1xOrtodontox toothpaste | Prapor LVL1 | None  |
| NPZ 1P78-1 2.8x scope | 1xRechargeable battery 1xCyclon rechargeable battery | Prapor LVL1 | None  |

## Tools
This project is designed to streamline the initial setup process for building and creating mods in the SPT environment. Follow this guide to set up your environment efficiently.

## **Table of Contents**
- [NodeJS Setup](#nodejs-setup)
- [IDE Setup](#ide-setup)
- [Workspace Configuration](#workspace-configuration)
- [Environment Setup](#environment-setup)
- [Essential Concepts](#essential-concepts)
- [Coding Guidelines](#coding-guidelines)
- [Distribution Guidelines](#distribution-guidelines)

## **NodeJS Setup**

Before you begin, ensure to install NodeJS version `v20.11.1`, which has been tested thoroughly with our mod templates and build scripts. Download it from the [official NodeJS website](https://nodejs.org/).

After installation, it's advised to reboot your system.

## **IDE Setup**

For this project, you can work with either [VSCodium](https://vscodium.com/) or [VSCode](https://code.visualstudio.com/). However, we strongly recommend using VSCode, as all development and testing have been carried out using this IDE, ensuring a smoother experience and compatibility with the project setups. Either way, we have a prepared a workspace file to assist you in setting up your environment.

## **Workspace Configuration**

With NodeJS and your chosen IDE ready, initiate the `mod.code-workspace` file using your IDE:

> File -> Open Workspace from File...

Upon project loading, consider installing recommended plugins like the ESLint plugin.

## **Environment Setup**

An automated task is available to configure your environment for Typescript utilization:

> Terminal -> Run Task... -> Show All Tasks... -> npm: install

Note: Preserve the `node_modules` folder as it contains necessary dependencies for Typescript and other functionalities.

## **Essential Concepts**

Prioritize understanding Dependency Injection and Inversion of Control, the architectural principles SPT adopts. Comprehensive guidelines will be available on the hub upon release.

Some resources to get you started:
 - [A quick intro to Dependency Injection](https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/)
 - [Understanding Inversion of Control (IoC) Principle](https://medium.com/@amitkma/understanding-inversion-of-control-ioc-principle-163b1dc97454)

## **Coding Guidelines**

Focus your mod development around the `mod.ts` file. In the `package.json` file, only alter these properties: `"name"`, `"version"`, `"sptVersion"`, `"loadBefore"`, `"loadAfter"`, `"incompatibilities"`, `"isBundleMod"`, `"author"`, and `"license"`.

New to Typescript? Find comprehensive documentation on the [official website](https://www.typescriptlang.org/docs/).

## **Distribution Guidelines**

Automated tasks are set up to bundle all necessary files for your mod to function in SPT:

> Terminal -> Run Task... -> Show All Tasks... -> npm: build

The ZIP output, located in the `dist` directory, contains all required files. Ensure all files are included and modify the `.buildignore` file as needed. This ZIP file is your uploadable asset for the hub.

## **Conclusion**

With this setup, you're ready to begin modding with SPT. If you run into any trouble be sure to check out the [modding documentation on the hub](https://hub.sp-tarkov.com/doc/lexicon/66-modding/). If you really get stuck feel free to join us in the [#mods-development](https://discord.com/channels/875684761291599922/875803116409323562) official Discord channel.

Build something awesome!
