# Developer Mode

This page is for Development **only**.

To see this page, set your local environment variable `NODE_ENV` to `development`.

```
NODE_ENV=development npm run start
```

## How it works

- If you have multiple versions of the same major release in the `versions.json` file, only one minor release for each major release will be shown in the dropdown
- If you have an empty `versions.json` file, you will see the `/docs` folder (and this page)
