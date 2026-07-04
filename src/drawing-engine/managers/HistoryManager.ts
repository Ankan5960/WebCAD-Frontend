import type { Command } from "../commands/Command";

export class HistoryManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  execute(command: Command): void {
    command.execute();

    this.undoStack.push(command);

    this.redoStack.length = 0;
  }

  undo(): void {
    const command = this.undoStack.pop();

    if (!command) return;

    command.undo();

    this.redoStack.push(command);
  }

  redo(): void {
    const command = this.redoStack.pop();

    if (!command) return;

    command.execute();

    this.undoStack.push(command);
  }

  clear(): void {
    this.undoStack.length = 0;
    this.redoStack.length = 0;
  }

  get canUndo() {
    return this.undoStack.length > 0;
  }

  get canRedo() {
    return this.redoStack.length > 0;
  }
}