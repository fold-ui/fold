# Fold

## Overview

Zero-dependency React components for scaling your product to the next level.

- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Building](#building)
- [Documentation](#documentation)
- [Theming](#theming)
- [Contributing](#contributing)
    - [Reporting Bugs](#reporting-bugs-)
    - [Sharing Feedback](#sharing-feedback-)
- [Code of Conduct](#code-of-conduct-)
- [License](#license)
- [Support](#support)

### Installation

``` bash
# Using npm
npm install @fold-dev/core

# Using yarn
yarn add @fold-dev/core
```

### Usage

```jsx
import React from 'react';
import { FoldProvider, Heading, Button, Card, Input } from '@fold-dev/core';
import '@fold-dev/core/dist/styles.css';

const App = () => {
    return (
        <FoldProvider>
            <Card>
                <Heading>My Component</Heading>
                <Input placeholder="Enter your text" />
                <Button>Submit</Button>
            </Card>
        </FoldProvider>
    );
};

export default App;
```

### Building

Ensure you have the following prerequisites installed:

- [Node](https://nodejs.org/) - v18.17.1
- [Npm](https://www.npmjs.com/) (Node Package Manager) - v9.6.7

1. Clone the repository:

   ```bash
   git clone https://github.com/fold-dev/fold.git
   ```

2. Navigate to the project directory:

   ```bash
   cd fold
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Developing:

   ```bash
   npm run dev
   ```

## Documentation

For detailed information on each component and their props, please refer to our [Documentation](https://www.fold.dev/docs).

## Theming

The library provides easy-to-use theming options. Learn more about them in the [Theming Guide](https://www.fold.dev/docs/theming).

## Contributing

### Reporting Bugs 🐞
If you've come across a bug or an issue, please don't hesitate to open a new issue. To make the process as smooth as possible, we've created some issue templates to get you started.

### Sharing Feedback 📢
We'd love to get your feedback, be it suggestions, feature requests, or general thoughts on your experience. If you believe that creating a new issue isn't the best choice, don't hesitate to initiate a [discussion](https://github.com/fold-dev/fold/discussions) instead.

## Code of Conduct ☀️
Please note that we have a [Code of Conduct](CODE_OF_CONDUCT.md) that we expect everyone to follow when participating in this repository. We want to maintain a welcoming and inclusive environment for everyone.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support

If you encounter any issues or have questions, feel free to [open an issue](https://github.com/fold-dev/fold/issues) or start a [discussion](https://github.com/fold-dev/fold/discussions).

Thank you for being part of our community, and for helping us.
