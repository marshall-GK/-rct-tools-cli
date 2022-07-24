# react-construct
**react-construct** is a cli tool built for react apps to generate react components and other useful seperate files (eg. hooks).

###  Installation/Run
------------

`npx react-construct <command> <relativePath>`

or

`npm install react-construct -g` or `yarn global add react-construct`

### Usage
------------
To use **react-construct** just type `react-construct <commands>` in your terminal.

| Commands | Description |
| ------------ | ------------ |
| fc | For functional components |
| f | For simple function file |
| h | For hook file |
| help | For help |
| v | For version |


------------


Example

| Commands | Example |
| ------------ | ------------ |
| fc | `react-construct fc <component_name> <relative_path>` |
| f | `react-construct f <function_name> <relative_path>` |
| h | `react-construct h <hook_name> <relative_path>` |


##### Functional component

`react-construct fc Boo ./Foo/Faa`, this command will generate required scalable files for a functional component.

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

After using **react-construct**
- Your FC will split into seperate files.
- Less line of a code in a file
- Business logic, styles and view will be in a seperate file.
- Wanna make some changes in view file, you know where to find.
- Change in business logic, directly switch to model file and make the required changes.
- Reviewing such FC code becomes damn easy.

#Project in progress...





