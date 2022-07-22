# rtwister
**rtwister** is a cli tool built for react apps to generate react components and other useful seperate files (eg. hooks).

###  Installation/Run
------------

`npx rtwister <command> <relativePath>`

or

`npm install rtwister -g` or `yarn global add rtwister`

### Usage
------------
To use **rtwister** just type `rtwister <commands>` in your terminal.

| Commands | Description |
| ------------ | ------------ |
| fc | For functional components |
| f | For simple function file |
| h | For hook file |
| --help or -h | For help |


------------


Example

| Commands | Example |
| ------------ | ------------ |
| fc | `rtwister fc <component_name> <relative_path>` |
| f | `rtwister f <function_name> <relative_path>` |
| h | `rtwister h <hook_name> <relative_path>` |


##### Functional component

`rtwister fc Boo ./Foo/Faa`, this command will generate required scalable files for a functional component.

```
|-- /Foo
    |-- /Faa
        |-- /Boo
            |-- Boo.tsx
            |-- Boo.model.tsx
            |-- Boo.styles.ts
            |-- Boo.constants.ts
            |-- Boo.view.tsx
```

------------

| File  | Description  |
| ------------ | ------------ |
| Boo.tsx | Your main FC file  |
| Boo.model.tsx | This file will have your business logic  |
| Boo.view.tsx | Your view or JSX file |
| Boo.styles.tsx | Your CSS module file |
| Boo.constants.ts | Here FC constants | 

------------

# Why such file structure?

- Tons of lines of code hurts your eyes.
- Imagine 10000+ line of a code in just a single file.
- Searching\debugging becomes a mess.
- Before adding something new in between will make you think twice.
- Managing your components can become a mess.

After using **rtwister**
- Your FC will split into seperate files.
- Less line of a code in a file
- Business logic, styles and view will be in a seperate file.
- Wanna make some changes in view file, you know where to find.
- Change in business logic, directly switch to model file and make the required changes.
- Reviewing such FC code becomes damn easy.

#Project in progress...





