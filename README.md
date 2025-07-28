# Release: [@kds215/gemini-cli@0.2.0] - Public Beta for Accessibility Testing

## Overview
Welcome to the public beta release of **gemini for the blind**! This @kds215/gemini-cli@0.2.0 version is intended for use by blind and visually impaired users. Your feedback (especially from blind users) is crucial to making this tool as accessible and effective as possible. With your beta testing support, hopefully, this version will become part of the next official @google/gemini-cli release.

The main difference between the official @google/gemini-cli and **this @kds215/gemini-cli version** is that it has an **added [ -r or --reader ] option** to suppress the output of all ascii-box-drawing characters shown around every gemini output line. Without the **--reader option** it is impractical for blind users to listen at gemini launch time for roughly 3 minutes just for the "Gemini" banner made up of black&white box characters. In addition every gemini generated output line is framed by box-drawing ascii characters that must also by read by a reader.

Using **gemini -r or --reader** option frees readers from sounding-out all (useless) clutter characters and blind users can focus on their AI-gemini tasks at hand.

## Important
With the --reader option gemini returns results without framing borders around output lines. Here are examples of what specific output characters to look for to navigate through gemini's responses:

1. **a new prompt line always starts with** 
- " **>**   Type your message or @path/to/file “
- and the cursor is right after the “ **>** “ character. 
- Your input typing will always override this 'Type your message…' string.
2. after entering your prompt line, type **RETURN**, gemini's response will start with 
- an small plus sign “ **✦** “ (or like a star symbol) in the output line’s first position
- followed by other explanations & comments from gemini etc.
3. now, within this “ **✦** “ response text block, gemini can start a new line with 
- two leading spaces followed by a check-mark character “  **✔**  “.
- This indicates a tool usage like Shell command, WriteFile, ReadFolder, ReadFile, etc.
- Instead of the check-mark there can be also a " **?** " to show the tool to be
- run but you need to give it permission to run.
4. after your **prompt** has been answered 
- a new “ **>** “ prompt line appears as in item 1. above.

## From the official @google/gemini-cli README:

This repository contains the Gemini CLI, a command-line AI workflow tool that connects to your tools, 
understands your code and accelerates your workflows.

With the Gemini CLI you can:

- Query and edit large codebases in and beyond Gemini's 1M token context window.
- Generate new apps from PDFs or sketches, using Gemini's multimodal capabilities (prompt and images input).
- Automate operational tasks, like querying pull requests or handling complex rebases.
- Use tools and MCP servers to connect new capabilities, including [media generation with Imagen,
  Veo or Lyria](https://github.com/GoogleCloudPlatform/vertex-ai-creative-studio/tree/main/experiments/mcp-genmedia)
- Ground your queries with the [Google Search](https://ai.google.dev/gemini-api/docs/grounding) tool, built into Gemini.


## Quickstart

You have two options to install Gemini CLI.

### With Node

1. **Prerequisites:** Ensure you have [Node.js version 20](https://nodejs.org/en/download) or higher installed.
2. **Run the CLI:** Execute the following command in your terminal:

   ```bash
   npx https://github.com/kds215/gemini-cli -r or --reader    ( -r or reader with 2 dashes )
   ```

   **Or install** first with:

   ```bash
   npm install -g @kds215/gemini-cli
   ```

   Then second, run the CLI from anywhere:

   ```bash
   gemini -r or --reader     ( -r or reader with 2 dashes )
   ```

### With Homebrew

1. **Prerequisites:** Ensure you have [Homebrew](https://brew.sh/) installed.
2. **Install the CLI** Execute the following command in your terminal first:

   ```bash
   brew install gemini-cli
   ```

   Then second, run the CLI from anywhere:

   ```bash
   gemini -r or --reader    (reader with 2 dashes)
   ```

### Common Configuration steps when running gemini using /commands

3. **Pick a color theme** using /theme command to pick a suitable color theme for your VI needs.
4. **Authenticate:** When prompted, sign in with your **personal** Google account. This will grant you up to 60 model requests per minute and 1,000 model requests per day using Gemini.

You are now ready to use the Gemini CLI!

### Use a Gemini API key:

The Gemini API provides a free tier with [100 requests per day](https://ai.google.dev/gemini-api/docs/rate-limits#free-tier) using Gemini 2.5 Pro, control over which model you use, and access to higher rate limits (with a paid plan):

1. Generate a key from [Google AI Studio](https://aistudio.google.com/apikey).
2. Set it as an environment variable in your terminal. Replace `YOUR_API_KEY` with your generated key.

   ```bash
   export GEMINI_API_KEY="YOUR_API_KEY"
   ```

3. (Optionally) Upgrade your Gemini API project to a paid plan on the API key page (will automatically unlock [Tier 1 rate limits](https://ai.google.dev/gemini-api/docs/rate-limits#tier-1))

### Use a Vertex AI API key:

The Vertex AI API provides a [free tier](https://cloud.google.com/vertex-ai/generative-ai/docs/start/express-mode/overview) using express mode for Gemini 2.5 Pro, control over which model you use, and access to higher rate limits with a billing account:

1. Generate a key from [Google Cloud](https://cloud.google.com/vertex-ai/generative-ai/docs/start/api-keys).
2. Set it as an environment variable in your terminal. Replace `YOUR_API_KEY` with your generated key and set GOOGLE_GENAI_USE_VERTEXAI to true

   ```bash
   export GOOGLE_API_KEY="YOUR_API_KEY"
   export GOOGLE_GENAI_USE_VERTEXAI=true
   ```

3. (Optionally) Add a billing account on your project to get access to [higher usage limits](https://cloud.google.com/vertex-ai/generative-ai/docs/quotas)

For other authentication methods, including Google Workspace accounts, see the [authentication](./docs/cli/authentication.md) guide.

## Examples

Once the CLI is running, you can start interacting with Gemini from your shell/terminal.

You can start a project from a new directory:

```sh
cd new-project/
gemini
> Write me a Gemini Discord bot that answers questions using a FAQ.md file I will provide
```

Or work with an existing project:

```sh
git clone https://github.com/google-gemini/gemini-cli
cd gemini-cli
gemini
> Give me a summary of all of the changes that went in yesterday
```

### Next steps

- Learn how to [contribute to or build from the source](./CONTRIBUTING.md).
- Explore the available **[CLI Commands](./docs/cli/commands.md)**.
- If you encounter any issues, review the **[troubleshooting guide](./docs/troubleshooting.md)**.
- For more comprehensive documentation, see the [full documentation](./docs/index.md).
- Take a look at some [popular tasks](#popular-tasks) for more inspiration.
- Check out our **[Official Roadmap](./ROADMAP.md)**

### Troubleshooting

Head over to the [troubleshooting guide](docs/troubleshooting.md) if you're
having issues.

## Popular tasks

### Explore a new codebase

Start by `cd`ing into an existing or newly-cloned repository and running `gemini`.

```text
> Describe the main pieces of this system's architecture.
```

```text
> What security mechanisms are in place?
```

### Work with your existing code

```text
> Implement a first draft for GitHub issue #123.
```

```text
> Help me migrate this codebase to the latest version of Java. Start with a plan.
```

### Automate your workflows

Use MCP servers to integrate your local system tools with your enterprise collaboration suite.

```text
> Make me a slide deck showing the git history from the last 7 days, grouped by feature and team member.
```

```text
> Make a full-screen web app for a wall display to show our most interacted-with GitHub issues.
```

### Interact with your system

```text
> Convert all the images in this directory to png, and rename them to use dates from the exif data.
```

```text
> Organize my PDF invoices by month of expenditure.
```

### Uninstall

Head over to the [Uninstall](docs/Uninstall.md) guide for uninstallation instructions.

## Accessibility Features
- Keyboard-only navigation support.
- Screen reader compatibility.
- use **gemini -r or --reader** option for no clutter output to quiet down readers.

## Known Issues / Limitations
- tested with reader: VoiceOver (macOS)
- tested on macOS 15.5 and windows11

## How to Give Feedback
We value your input! Please report bugs, accessibility issues, or suggestions:

- [Open an issue on GitHub.](https://github.com/kds215/gemini-cli/issues)
- Email: [klaus@szyska.com]
- [Other feedback channels, if any.]

## Changelog
- [List major changes since the previous version, if applicable.]

## Contributors
Thank you to everyone who is testing this release! And thanks to gemini-cli itself who graciously has changed its own frontend code.

---

*Please note: This is a beta release. There may be bugs or incomplete features. Your feedback helps us improve!*
