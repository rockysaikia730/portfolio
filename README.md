# rockysaikia730.github.io

Personal portfolio of Ahmed Rockey Saikia: plain HTML, CSS and JS, with no build step.

```
index.html      Home
about.html      About Me (education, experience, publications, awards, skills)
projects.html   Projects (filterable)
assets/css/     Styles (light + dark theme)
assets/js/      Theme toggle and project filters
assets/img/     Favicon; drop a square photo here as profile.jpg to replace the "AR" avatar
```

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy to GitHub Pages

1. Create a public repository named exactly `rockysaikia730.github.io`.
2. Push the contents of this folder to its `main` branch.
3. In the repository's **Settings → Pages**, set the source to **Deploy from a branch**, using `main` and `/ (root)`.
4. The site will be live at https://rockysaikia730.github.io within a minute or two.

The `CV/` folder is listed in `.gitignore` so the LaTeX source, which contains a phone number and address, is not published.
