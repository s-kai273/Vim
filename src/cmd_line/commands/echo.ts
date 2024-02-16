import { Parser, all } from 'parsimmon';
import { VimState } from '../../state/vimState';
import { StatusBar } from '../../statusBar';
import { ExCommand } from '../../vimscript/exCommand';

export class EchoCommand extends ExCommand {
  public static readonly argParser: Parser<EchoCommand> = all.map((arg) => new EchoCommand(arg));

  private readonly arg: string;
  constructor(arg: string) {
    super();
    this.arg = arg;
  }
  override execute(vimState: VimState): Promise<void> {
    StatusBar.setText(vimState, this.arg);
    return Promise.resolve();
  }
}
