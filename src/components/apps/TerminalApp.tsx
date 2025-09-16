import { useState, useRef, useEffect } from 'react';

const TerminalApp = () => {
  const [history, setHistory] = useState<string[]>([
    'Microsoft Windows [Version 11.0.22000.194]',
    '(c) Microsoft Corporation. All rights reserved.',
    '',
    'C:\\Users\\User>',
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentPath, setCurrentPath] = useState('C:\\Users\\User');
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    const newHistory = [...history, `${currentPath}>${command}`];

    switch (cmd) {
      case 'help':
        newHistory.push(
          'Available commands:',
          '  help     - Show this help message',
          '  dir      - List directory contents',
          '  cd       - Change directory',
          '  cls      - Clear screen',
          '  date     - Show current date',
          '  time     - Show current time',
          '  echo     - Display text',
          '  ver      - Show Windows version',
          '  whoami   - Show current user',
          '  ipconfig - Show network configuration',
          ''
        );
        break;

      case 'dir':
        newHistory.push(
          ' Volume in drive C has no label.',
          ' Volume Serial Number is 1234-ABCD',
          '',
          ' Directory of ' + currentPath,
          '',
          '01/15/2024  10:30 AM    <DIR>          .',
          '01/15/2024  10:30 AM    <DIR>          ..',
          '01/15/2024  09:45 AM    <DIR>          Documents',
          '01/15/2024  09:45 AM    <DIR>          Downloads',
          '01/15/2024  09:45 AM    <DIR>          Pictures',
          '01/15/2024  11:20 AM           1,024   readme.txt',
          '01/15/2024  02:15 PM          15,360   project.exe',
          '               2 File(s)         16,384 bytes',
          '               5 Dir(s)  256,123,456,789 bytes free',
          ''
        );
        break;

      case 'cls':
        setHistory([`${currentPath}>`]);
        return;

      case 'date':
        newHistory.push(new Date().toLocaleDateString(), '');
        break;

      case 'time':
        newHistory.push(new Date().toLocaleTimeString(), '');
        break;

      case 'ver':
        newHistory.push('Microsoft Windows [Version 11.0.22000.194]', '');
        break;

      case 'whoami':
        newHistory.push('desktop\\user', '');
        break;

      case 'ipconfig':
        newHistory.push(
          'Windows IP Configuration',
          '',
          'Ethernet adapter Ethernet:',
          '',
          '   Connection-specific DNS Suffix  . : ',
          '   IPv4 Address. . . . . . . . . . . : 192.168.1.100',
          '   Subnet Mask . . . . . . . . . . . : 255.255.255.0',
          '   Default Gateway . . . . . . . . . : 192.168.1.1',
          ''
        );
        break;

      default:
        if (cmd.startsWith('echo ')) {
          newHistory.push(command.substring(5), '');
        } else if (cmd.startsWith('cd ')) {
          const newPath = command.substring(3).trim();
          if (newPath === '..') {
            const parts = currentPath.split('\\');
            if (parts.length > 1) {
              parts.pop();
              setCurrentPath(parts.join('\\'));
            }
          } else if (newPath) {
            setCurrentPath(currentPath + '\\' + newPath);
          }
          newHistory.push('');
        } else if (cmd === '') {
          newHistory.push('');
        } else {
          newHistory.push(`'${command}' is not recognized as an internal or external command,`, 'operable program or batch file.', '');
        }
        break;
    }

    newHistory.push(`${currentPath}>`);
    setHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div 
      className="h-full bg-black text-green-400 font-mono text-sm p-4 overflow-auto cursor-text"
      onClick={handleTerminalClick}
      ref={terminalRef}
    >
      {history.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {line}
        </div>
      ))}
      <div className="flex">
        <span>{currentPath}&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400 ml-1"
          autoFocus
        />
      </div>
    </div>
  );
};

export default TerminalApp;