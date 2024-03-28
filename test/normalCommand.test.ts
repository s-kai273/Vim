import { newTest } from './testSimplifier';
import { cleanUpWorkspace, setupWorkspace } from './testUtils';

suite('Execute normal command', () => {
  setup(setupWorkspace);

  teardown(cleanUpWorkspace);

  newTest({
    title: 'One liner',
    start: ['foo =| bar = 1'],
    keysPressed: ':normal f=i!=\n',
    end: ['foo = bar !|== 1'],
  });

  newTest({
    title: 'One liner with selection',
    start: ['foo =| bar = 1'],
    keysPressed: 'V:normal f=i!=\n',
    end: ['foo !|== bar = 1'],
  });

  newTest({
    title: 'Multiple liner with selection',
    start: ['foo =| bar = 1', 'foo = bar = 2'],
    keysPressed: 'Vj:normal f=i!=\n',
    end: ['foo !== bar = 1', 'foo !|== bar = 2'],
  });

  newTest({
    title: 'Multiple liner with line range',
    start: ['foo =| bar = 1', 'foo = bar = 2', 'foo = bar = 3'],
    keysPressed: ':2,3normal f=i!=\n',
    end: ['foo = bar = 1', 'foo !== bar = 2', 'foo !|== bar = 3'],
  });

  newTest({
    title: 'One liner with dot',
    start: ['foo =| bar = 1', 'foo = bar = 2'],
    keysPressed: 'f=i!=<Esc>j^f=:normal .\n',
    end: ['foo = bar !== 1', 'foo !|== bar = 2'],
  });

  // TODO(#8939): remove comment out after fixing dot command bug
  // newTest({
  //   title: 'One liner with multiple dot',
  //   start: ['foo =| bar = 1', 'foo = bar = 2'],
  //   keysPressed: 'f=i!=<Esc>j^f=:normal 2.\n',
  //   end: ['foo = bar !== 1', 'foo !=!|== bar = 2'],
  // });

  newTest({
    title: 'One liner with macro',
    start: ['|1. one, 2. two, 3. three, 4. four'],
    keysPressed: 'qaf.r)q:normal @a\n',
    end: ['1) one, 2|) two, 3. three, 4. four'],
  });

  newTest({
    title: 'One liner with multiple macro',
    start: ['|1. one, 2. two, 3. three, 4. four'],
    keysPressed: 'qaf.r)q:normal 3@a\n',
    end: ['1) one, 2) two, 3) three, 4|) four'],
  });

  newTest({
    title: 'Multiple liner with multiple macro',
    start: ['|0. zero', '1. one, 2. two, 3. three, 4. four', '5. five, 6. six, 7. seven, 8. eight'],
    keysPressed: 'qaf.r)qjVj:normal 4@a\n',
    end: ['0) zero', '1) one, 2) two, 3) three, 4) four', '5) five, 6) six, 7) seven, 8|) eight'],
  });
});
