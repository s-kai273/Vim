// eslint-disable-next-line id-denylist
import { Parser, regexp, seq, string } from 'parsimmon';
import { VimState } from '../../state/vimState';
import { ExCommand } from '../../vimscript/exCommand';
import { LineRange } from '../../vimscript/lineRange';

const patternParser = regexp(/[^/]+/).desc('pattern');
const commandParser = regexp(/.*/).desc('command');

export class GlobalCommand extends ExCommand {
  public static readonly argParser: Parser<GlobalCommand> = seq(
    patternParser,
    string('/'),
    commandParser,
  ).map(([pattern, _, command]) => new GlobalCommand(pattern, command));

  private readonly pattern: string;
  private readonly command: string;
  constructor(pattern: string, command: string) {
    super();
    this.pattern = pattern;
    this.command = command;
  }

  override async execute(vimState: VimState): Promise<void> {
    // TODO: implement this method
  }

  override async executeWithRange(vimState: VimState, lineRange: LineRange): Promise<void> {
    // TODO: implement this method
  }
}
