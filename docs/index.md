# Welcome

<p align="center">
  <img width="100%" src="https://github.com/luciferreeves/izuku.js/raw/main/render/Izuku.png">
</p>

<p align="center">
  <img src="https://img.shields.io/github/workflow/status/luciferreeves/izuku.js/Node.js%20CI"> <img src="https://img.shields.io/github/license/luciferreeves/izuku.js"> <img src="https://img.shields.io/github/issues-raw/luciferreeves/izuku.js">
</p>

## About Izuku

Izuku is a simple, fast, and powerful tabular data representation and manipulation library written in [TypeScript](https://www.typescriptlang.org/). It is designed to be used to view, manipulate and debug 2D data in NodeJS applications.

The core of Izuku is the `Frame` class that represents a 2D array of data. It is designed to be used as a data structure for tabular data. Izuku is heavily inspired by [Pandas](https://pandas.pydata.org/).

**Note**: Izuku is not a replacement for Pandas and should not be used for data analysis. It is designed to be used for data visualization and debugging. It can, however, handle large datasets and help you understand your data better but comes at some cost in performance. Since, Pandas is based on NumPy, and NumPy is written in C, Pandas would be much faster than Izuku.

To get started, read the [Getting Started](getting-started) section.

## Cloning and Building Izuku

Cloning and Building is helpful for local development. You can clone Izuku from the [GitHub repository](https://github.com/luciferreeves/izuku.js). To build Izuku, you will need to install the [TypeScript compiler](https://www.typescriptlang.org/). To clone the repository, run the following command in your terminal:

```bash
git clone https://github.com/luciferreeves/izuku.js.git
```

Change into the directory and run the following command to install dependencies:

```bash
npm install
```

To build Izuku, run the following command:

```bash
npm run build
```

To run tests, run the following command:

```bash
npm test
```

## Contributing

You can contribute to Izuku by making a pull request on the [GitHub repository](https://github.com/luciferreeves/izuku.js). Take a look at the [CONTRIBUTING.md](https://github.com/luciferreeves/izuku.js/blob/main/CONTRIBUTING.md) file for more information on how to contribute.

## Code of Conduct

You can view the [Code of Conduct](https://github.com/luciferreeves/izuku.js/blob/main/CODE_OF_CONDUCT.md) for Izuku. Code of Conduct is a pledge to conduct yourself in a manner that is respectful to the community. It is also a guideline for how to behave in the community. Here's an extract from [Code of Conduct](https://github.com/luciferreeves/izuku.js/blob/main/CODE_OF_CONDUCT.md):

> We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.
>
> We pledge to act and interact in ways that contribute to an open, welcoming, diverse, inclusive, and healthy community.



## Licensing

Any contributions you make will be under the MIT License. In short, when you submit code changes, your submissions are understood to be under the same [MIT License](https://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

