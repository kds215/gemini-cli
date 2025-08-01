/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as vscode from 'vscode';
import { IDEServer } from './ide-server';
import { createLogger } from './utils/logger';

let ideServer: IDEServer;
let logger: vscode.OutputChannel;
let log: (message: string) => void = () => {};

export async function activate(context: vscode.ExtensionContext) {
  logger = vscode.window.createOutputChannel('Gemini CLI IDE Companion');
  log = createLogger(context, logger);

  log('Extension activated');

  const commandRegistration = vscode.commands.registerCommand(
    'gemini.cli.generateCommitMessage',
    async () => {
      const config = vscode.workspace.getConfiguration('gemini.cli');
      const readerMode = config.get('readerMode', true);

      const gitExtension = vscode.extensions.getExtension('vscode.git');
      if (!gitExtension) {
        vscode.window.showErrorMessage(
          'The built-in Git extension is not available.',
        );
        return;
      }
      const git = gitExtension.exports.getAPI(1);
      if (git.repositories.length === 0) {
        vscode.window.showErrorMessage('No Git repository found.');
        return;
      }
      const repo = git.repositories[0];
      const diff = await repo.diff(true); // Get staged changes

      if (!diff) {
        vscode.window.showInformationMessage(
          'No staged changes found to generate a commit message.',
        );
        return;
      }

      const prompt = `Generate a concise, conventional commit message for the following changes:\n\n---\n${diff}\n---\n`;

      const command = `gemini ${
        readerMode ? '--reader' : ''
      } -p -`;

      const terminal = vscode.window.createTerminal({
        name: 'Gemini CLI',
        isTransient: true,
      });
      // Send the command to the terminal. The `-p -` tells gemini to read from stdin.
      terminal.sendText(command, true);
      // Send the prompt content to the stdin of the gemini process.
      terminal.sendText(prompt, false);
      // End the stdin stream.
      terminal.sendText('\x04', false);
      terminal.show();
    },
  );
  context.subscriptions.push(commandRegistration);

  ideServer = new IDEServer(log);
  try {
    await ideServer.start(context);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log(`Failed to start IDE server: ${message}`);
  }
}

export async function deactivate(): Promise<void> {
  log('Extension deactivated');
  try {
    if (ideServer) {
      await ideServer.stop();
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log(`Failed to stop IDE server during deactivation: ${message}`);
  } finally {
    if (logger) {
      logger.dispose();
    }
  }
}
