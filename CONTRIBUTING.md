## Contributing to Huddle01 Sample Apps

Thank you for your interest in contributing to the Sample Apps Monorepo! We welcome contributions from everyone.

## Prerequisites
This is a monorepo powered by yarn that includes a multiple examples. This repository allows you to conveniently manage multiple projects within a single repository.

Before you begin, ensure that you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/download) (version 18.16.0 or later)
- Yarn (https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)

## Getting Started

1. Fork the repository to your GitHub account

2. Clone the repository to your local machine

```bash
git clone [your-forked-repo-url]
```

3. Install dependencies for all the apps inside the monorepo

```bash
yarn 
```

4. Run the app you want to test (Web Apps)

```bash
cd apps/web/[example-app-name]
yarn run dev
```

## Guidelines

- Please make sure that your code follows the existing coding style and conventions.
- Write clear and concise commit messages.
- While adding new sample apps create a new folder inside `apps/web` for web apps and `apps/mobile` for mobile apps.
- If you are making changes to an existing sample app, please make sure that your changes do not break any existing functionality.
- Please make sure that your code is well-documented and includes appropriate comments

