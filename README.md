# Package UI

UI ressources for A-Novel apps.

[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/agorastoryverse)](https://twitter.com/agorastoryverse)
[![Discord](https://img.shields.io/discord/1315240114691248138?logo=discord)](https://discord.gg/rp4Qr8cA)

<hr />

![GitHub repo file or directory count](https://img.shields.io/github/directory-file-count/a-novel/package-ui)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/a-novel/package-ui)

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/a-novel/package-ui/main.yaml)

## Installation

> ⚠️ **Warning**: Even though the package is public, GitHub registry requires you to have a Personal Access Token
> with `repo` and `read:packages` scopes to pull it in your project. See
> [this issue](https://github.com/orgs/community/discussions/23386#discussioncomment-3240193) for more information.

Make sure you have a `.npmrc` with the following content (in your project or in your home directory):

```ini
@a-novel:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${YOUR_PERSONAL_ACCESS_TOKEN}
```

Then, install the package using pnpm:

```bash
# pnpm config set auto-install-peers true
#  Or
# pnpm config set auto-install-peers true --location project
pnpm add @a-novel/package-ui
```
