# Contributing to Wallpaper Aggregator

Thank you for your interest in contributing to the Wallpaper Aggregator project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### 1. Fork the Repository
- Click the "Fork" button on the GitHub repository
- Clone your fork locally: `git clone https://github.com/yourusername/wallpaper-aggregator.git`

### 2. Set Up Development Environment
```bash
cd wallpaper-aggregator
npm run install-all
npm run dev
```

### 3. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes
- Write clean, readable code
- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly

### 5. Commit Your Changes
```bash
git add .
git commit -m "Add: your descriptive commit message"
```

### 6. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```
Then create a Pull Request on GitHub.

## 🎯 Contribution Ideas

### Frontend Improvements
- 🎨 UI/UX enhancements
- 📱 Mobile responsiveness improvements
- ⚡ Performance optimizations
- 🌙 Theme customization options

### Backend Features
- 🔍 Advanced search algorithms
- 📊 Analytics and statistics
- 🔐 User authentication system
- 🌐 Additional API endpoints

### Scraping Enhancements
- 🌍 New wallpaper sources
- 🤖 Better anti-bot detection handling
- 📈 Improved scraping efficiency
- 🏷️ Better categorization algorithms

### Documentation
- 📚 API documentation improvements
- 🎥 Video tutorials
- 📖 Better setup guides
- 🌐 Internationalization

## 📋 Code Style Guidelines

### JavaScript/Node.js
- Use ES6+ features
- Use `const` and `let` instead of `var`
- Use arrow functions where appropriate
- Add JSDoc comments for functions
- Use meaningful variable names

### React
- Use functional components with hooks
- Use proper prop types
- Keep components small and focused
- Use meaningful component names

### CSS
- Use consistent naming conventions
- Group related styles together
- Use CSS variables for colors and spacing
- Make responsive designs mobile-first

## 🧪 Testing

### Before Submitting
- Test your changes locally
- Ensure the scraper works
- Check responsive design
- Verify API endpoints work
- Test error handling

### Running Tests
```bash
# Test API endpoints
node test-api.js

# Test scraper functionality
node test-scraper.js

# Test alternative scraper
node server/scraper/alternative-scraper.js
```

## 📝 Pull Request Guidelines

### PR Title Format
- `Add: new feature description`
- `Fix: bug description`
- `Update: improvement description`
- `Docs: documentation changes`

### PR Description Should Include
- Clear description of changes
- Screenshots for UI changes
- Testing steps performed
- Any breaking changes
- Related issue numbers

### Example PR Description
```markdown
## Changes Made
- Added dark/light theme toggle
- Improved mobile navigation
- Fixed search functionality bug

## Screenshots
[Include before/after screenshots]

## Testing
- Tested on Chrome, Firefox, Safari
- Verified mobile responsiveness
- Tested search with various queries

## Breaking Changes
None

## Related Issues
Fixes #123
```

## 🐛 Bug Reports

### Before Reporting
- Check existing issues
- Try to reproduce the bug
- Test on different browsers/devices

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 91]
- Node.js version: [e.g. 18.x]
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
Clear description of the feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other ways to solve this

**Additional Context**
Any other relevant information
```

## 🔒 Security

### Reporting Security Issues
- **DO NOT** create public issues for security vulnerabilities
- Email security concerns privately
- Include detailed reproduction steps
- Allow time for fixes before disclosure

### Security Best Practices
- Never commit API keys or secrets
- Validate all user inputs
- Use HTTPS in production
- Follow OWASP guidelines

## 📚 Resources

### Useful Links
- [React Documentation](https://reactjs.org/docs)
- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/guide)
- [SQLite Documentation](https://sqlite.org/docs.html)

### Development Tools
- [Postman](https://postman.com) - API testing
- [React DevTools](https://react-devtools-tutorial.vercel.app/) - React debugging
- [VS Code](https://code.visualstudio.com/) - Recommended editor

## 🎉 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit in commit messages
- Invited to be maintainers (for significant contributions)

## ❓ Questions?

- Create a GitHub issue with the "question" label
- Join discussions in existing issues
- Check the README for common questions

Thank you for contributing to Wallpaper Aggregator! 🚀