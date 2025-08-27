# Ghar Saaz Automation Project

A comprehensive end-to-end (E2E) testing automation project for the Ghar Saaz website using Cypress. This project automates critical user journeys including product browsing, cart management, and checkout processes.

## 🏗️ Project Overview

**Ghar Saaz** is an e-commerce platform for home furnishings and decor. This automation project ensures the website's core functionality works correctly across different scenarios by automating real user interactions.

## 🎯 Test Scenarios

### Current Test Coverage
The main test file (`gharsaaz.cy.js`) covers the following critical user journey:

1. **Homepage Navigation**
   - Visit the homepage
   - Wait for page to fully load
   - Handle initial animations and loading states

2. **New Arrivals Section**
   - Scroll to the "New Arrivals" section
   - Verify section visibility and content
   - Navigate to a product from the New Arrivals collection

3. **Product Page Interaction**
   - Verify product page loads correctly
   - Check product title visibility
   - Add product to cart
   - Monitor cart API responses

4. **Cart Management**
   - Verify cart sidebar appears
   - Navigate to full cart page
   - Apply coupon code "Gharsaaz"
   - Proceed to checkout

5. **Checkout Process**
   - Fill in customer information:
     - Email: test+gharsaaz@example.com
     - Country: Pakistan
     - First Name: TestFirst
     - Last Name: TestLast
     - Address: 123 Test Street
     - City: Karachi
     - Postal Code: 74000
     - Phone: 03001234567
   - Handle marketing opt-in checkbox
   - Save shipping information

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd garsaaz-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify Cypress installation**
   ```bash
   npx cypress verify
   ```

## 🧪 Running Tests

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run cypress:open` | Opens Cypress Test Runner in interactive mode |
| `npm run cypress:run` | Runs all tests in headless mode |
| `npm test` | Alias for `cypress:run` |
| `npm run test:open` | Opens Cypress Test Runner |
| `npm run test:gharsaaz` | Runs only the Ghar Saaz specific test |

### Interactive Mode (Recommended for Development)
```bash
npm run cypress:open
```
This opens the Cypress Test Runner where you can:
- See all test files
- Run tests individually
- Watch tests execute in real-time
- Debug test failures
- View screenshots and videos

### Headless Mode (CI/CD)
```bash
npm run cypress:run
```
This runs all tests in the background, perfect for:
- Continuous Integration pipelines
- Automated testing schedules
- Production deployments

## ⚙️ Configuration

### Cypress Configuration (`cypress.config.js`)

```javascript
{
  projectId: 'dgs57w',                    // Cypress Cloud project ID
  baseUrl: 'https://www.gharsaaz.pk',     // Target website
  defaultCommandTimeout: 10000,           // 10 seconds
  requestTimeout: 15000,                  // 15 seconds
  responseTimeout: 15000,                 // 15 seconds
  pageLoadTimeout: 30000,                 // 30 seconds
  viewportWidth: 1920,                    // Desktop resolution
  viewportHeight: 1080,
  video: false,                           // Disable video recording
  screenshotOnRunFailure: true            // Capture screenshots on failures
}
```

### Test-Specific Configuration
Each test includes custom timeouts and waits:
- **Command Timeout**: 10 seconds for element interactions
- **Request Timeout**: 15 seconds for API calls
- **Response Timeout**: 15 seconds for API responses
- **Page Load Timeout**: 30 seconds for page navigation

## 📁 Project Structure

```
garsaaz-automation/
├── cypress/
│   ├── e2e/
│   │   └── gharsaaz.cy.js          # Main test file
│   ├── support/
│   │   └── e2e.js                  # Support file for custom commands
│   └── fixtures/                    # Test data files
├── cypress.config.js                # Cypress configuration
├── package.json                     # Project dependencies and scripts
├── .gitignore                       # Git ignore patterns
└── README.md                        # This file
```

## 🔧 Dependencies

### Core Dependencies
- **Cypress**: ^15.0.0 - Main testing framework
- **cypress-xpath**: ^2.0.1 - XPath selector support

### Why These Dependencies?

**Cypress 15.0.0**
- Latest stable version with improved performance
- Better TypeScript support
- Enhanced debugging capabilities
- Improved network stubbing and mocking

**cypress-xpath**
- Enables XPath selectors alongside CSS selectors
- Useful for complex DOM navigation
- Provides flexibility in element selection strategies

## 🎨 Test Design Patterns

### 1. **Page Object Model (POM) Ready**
The test structure is designed to easily implement POM:
- Clear separation of concerns
- Reusable selectors
- Maintainable test logic

### 2. **Robust Waiting Strategies**
- **Explicit Waits**: `cy.wait()` for known delays
- **Implicit Waits**: Cypress automatic retry mechanism
- **Conditional Waits**: Wait for specific elements or states

### 3. **Error Handling**
- Intercept API calls to monitor responses
- Verify HTTP status codes
- Handle dynamic content loading

### 4. **Accessibility Considerations**
- Use semantic selectors where possible
- Verify element visibility before interaction
- Check element states (enabled/disabled)

## 🚨 Common Issues & Solutions

### 1. **Element Not Found**
```javascript
// Problem: Element not visible or not in DOM
// Solution: Add proper waits and visibility checks
cy.get('selector').should('be.visible').click()
```

### 2. **Timing Issues**
```javascript
// Problem: Tests fail due to timing
// Solution: Use proper waits and assertions
cy.wait(1000) // Allow animations to complete
cy.get('element').should('exist').should('be.visible')
```

### 3. **Network Requests**
```javascript
// Problem: API calls not completing
// Solution: Intercept and wait for requests
cy.intercept('POST', '**/cart/add*').as('addToCart')
cy.wait('@addToCart', { timeout: 15000 })
```

## 📊 Test Results & Reporting

### Screenshots
- Automatically captured on test failures
- Stored in `cypress/screenshots/` directory
- Useful for debugging visual issues

### Videos (Currently Disabled)
- Can be enabled by setting `video: true` in config
- Useful for understanding test execution flow
- Stored in `cypress/videos/` directory

### Console Output
- Detailed logging of test execution
- Network request/response information
- Element interaction details

## 🔄 Continuous Integration

### GitHub Actions Example
```yaml
name: Cypress Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm ci
      - run: npm run cypress:run
```

### Environment Variables
- `CYPRESS_BASE_URL`: Override base URL for different environments
- `CYPRESS_VIDEO`: Enable/disable video recording
- `CYPRESS_SCREENSHOTS`: Enable/disable screenshots

## 🚀 Future Enhancements

### Planned Features
1. **Page Object Model Implementation**
   - Separate page classes for each major section
   - Reusable component methods
   - Better maintainability

2. **Data-Driven Testing**
   - External test data files
   - Multiple test scenarios
   - Parameterized tests

3. **Cross-Browser Testing**
   - Firefox and Edge support
   - Browser-specific test configurations
   - Parallel test execution

4. **Performance Testing**
   - Page load time measurements
   - API response time monitoring
   - Performance regression detection

5. **Mobile Testing**
   - Responsive design verification
   - Touch interaction testing
   - Mobile-specific user journeys

## 🤝 Contributing

### Development Workflow
1. Create a feature branch
2. Write tests following existing patterns
3. Ensure all tests pass locally
4. Submit a pull request
5. Code review and approval

### Code Standards
- Use descriptive test names
- Add comments for complex logic
- Follow existing naming conventions
- Maintain consistent formatting

## 📞 Support & Maintenance

### Troubleshooting
- Check Cypress documentation: [docs.cypress.io](https://docs.cypress.io)
- Review test logs and screenshots
- Verify website accessibility and changes
- Check network connectivity and API endpoints

### Regular Maintenance
- Update Cypress version quarterly
- Review and update selectors as website evolves
- Monitor test stability and flakiness
- Update test data and scenarios

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Ghar Saaz team for providing the test environment
- Cypress community for the excellent testing framework
- Contributors and maintainers of this project

---

**Last Updated**: December 2024  
**Cypress Version**: 15.0.0  
**Test Coverage**: E2E User Journey Testing  
**Status**: Active Development
