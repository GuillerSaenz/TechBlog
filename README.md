# Tech Blog

[![License](https://img.shields.io/badge/License-MIT_License-green)](http://opensource.org/licenses/MIT)

## Description

The Tech Blog is a CMS-style blog site where developers can publish articles, blog posts, and their thoughts and opinions. Users can sign up, log in, create, edit, and delete their posts, as well as comment on other developers' posts. The application is built following the Model-View-Controller (MVC) paradigm, using Handlebars.js as the templating language, Sequelize as the ORM, and express-session for authentication.


## Table of Contents

-   [Description](#description)
-   [Installation](#installation)
-   [Usage](#usage)
-   [License](#license)
-   [Contributing](#contributing)
-   [Questions](#questions)

## Installation

To set up the Tech Blog locally, follow these steps:

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/GuillerSaenz/tech-blog.git
    ```

2. Navigate to the project directory:

    ```bash
    cd tech-blog
    ```

3. Install the necessary dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root of the project and add the following environment variables:

    ```plaintext
    DB_NAME='your_database_name'
    DB_USER='your_database_username'
    DB_PASSWORD='your_database_password'
    ```

5. Start the server:

    ```bash
    npm start
    ```

6. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

The Tech Blog application provides the following features:

-   **Homepage**:

    -   View existing blog posts with the post title and date created.
    -   Navigate to the homepage, dashboard, and login/signup page.

-   **User Authentication**:

    -   Sign up with a username and password.
    -   Log in with existing credentials.
    -   Log out to end the session.

-   **Dashboard**:

    -   View all blog posts created by the logged-in user.
    -   Create new blog posts.
    -   Edit or delete existing blog posts.

-   **Blog Posts**:

    -   View a single blog post with its title, content, author's username, and date created.
    -   Comment on a blog post while logged in.

-   **Comments**:
    -   Add comments to blog posts.
    -   View comments with the commenter's username and date created.

## License

This project is licensed under the [MIT License](LICENSE).

## Questions

If you have any questions about the project or need further assistance, feel free to reach out:

-   GitHub: [GuillerSaenz](https://github.com/GuillerSaenz)
-   Email: guillersaenzs@gmail.com