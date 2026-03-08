# QA Automation Portfolio

End-to-end UI test automation project for an Events web application, built with **Playwright** and **JavaScript**.

---

## Project Structure

```
qa-automation-portfolio/
├── images/          # Screenshots and test evidence
├── server/          # Local test server
├── src/             # Source code and helpers
├── styles/          # CSS styles
├── tests/           # Test suites
├── index.html       # Local web application entry point
├── package.json     # Project dependencies and scripts
└── .gitignore
```

---

## Technologies Used

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | End-to-end test automation |
| JavaScript (Node.js) | Primary programming language |
| Chromium | Test browser |

---

## Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

---

## Installation

```bash
# Clone the repository
git clone https://github.com/tgelenchev-QA-Automation/qa-automation-portfolio.git

# Navigate into the project directory
cd qa-automation-portfolio

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run tests with UI mode
npx playwright test --ui

# Run a specific test file
npx playwright test tests/<test-file>.spec.js

# View HTML report
npx playwright show-report
```

> The local server must be running on `http://localhost:3000` before executing the tests.

---

## Test Coverage

### Authentication
- Registration with valid data
- Login with valid credentials
- Logout from the application

### Navigation
- Navigation for guest users (Login/Register visible, user menu hidden)
- Navigation for logged-in users (Events, Add Event, Logout visible)

### Events
- Add a new event
- Edit an existing event
- Delete an event

---

## Author

**tgelenchev-QA-Automation**  
GitHub: [@tgelenchev-QA-Automation](https://github.com/tgelenchev-QA-Automation)

---

## License

This project is open source and available for reference and learning purposes.
