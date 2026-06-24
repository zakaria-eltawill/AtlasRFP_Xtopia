# Atlas Jeddah Masterplan

This project contains the source code for the Atlas Jeddah Masterplan website. The single bundled file has been restructured into a standard web development format for easier editing and maintenance.

## Project Structure

```
project-root/
├── index.html       # Main HTML file with structured comments
├── css/
│   └── styles.css   # All extracted CSS styles
├── js/
│   ├── main.js      # Main JavaScript file containing animations and logic
│   └── asset_*.js   # External JS dependencies
├── assets/
│   ├── images/      # Images used in the webpage
│   ├── icons/       # SVGs and icons
│   ├── videos/      # Video files
│   └── fonts/       # Web fonts
├── README.md        # This file
└── .gitignore       # Git ignore file
```

## How to Run Locally

You can run this project using any local web server. If you have Python installed, you can use the built-in HTTP server:

```bash
python -m http.server 8000
```
Then open your browser and navigate to `http://localhost:8000`.

Alternatively, if you are using VS Code, you can install the **Live Server** extension. Right-click on `index.html` and select **Open with Live Server**.

## Deployment

### GitHub Pages
1. Create a new repository on GitHub.
2. Push the contents of this project to the `main` branch.
3. Go to the repository **Settings** > **Pages**.
4. Select `main` as the source branch and `/ (root)` as the folder.
5. Click **Save**. Your site will be published at `https://<username>.github.io/<repo-name>/`.

### Cloudflare Pages
1. Log in to your Cloudflare dashboard and go to **Pages**.
2. Click **Create a project** and select **Connect to Git**.
3. Select your GitHub repository.
4. For the build settings, leave the build command blank and the output directory as `/` (root).
5. Click **Save and Deploy**. Cloudflare will automatically build and host your site on its global network.
