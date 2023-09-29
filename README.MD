# StickerfyTestsPlaywright
 
This is the [Playwright](https://playwright.dev/) autotests project for the web application [Stickerfy](https://github.com/meaghanlewis/stickerfy).  
The app is running at https://stickerfy.herokuapp.com/.

## Run tests locally
### Prerequisites

You need the following properly installed before being able to run this project:

- [Node](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm) (which is bundled with Node)

### Set up the project

1. Clone this repository:

``` shell
    git clone https://github.com/gufimtseva/StickerfyTestsPlaywright.git
```
2. Navigate to the project directory:

``` shell
    cd StickerfyTestsPlaywright
```

3. Install dependencies:

``` shell
    npm install
```

4. Install Playwright browsers:

``` shell
    npx playwright install
```
### Run tests

Files with autotests are located in the \tests folder.

- To run all of the tests: `npx playwright test`  
  > Alternatively, you can also review and run the tests using the [Visual Studio Code Extension](https://playwright.dev/docs/getting-started-vscode)
  
  **Note**: the app must be running at https://stickerfy.herokuapp.com/

- To open last report: `npx playwright show-report`