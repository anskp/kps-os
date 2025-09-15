import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const calculate = (firstOperand: number, secondOperand: number, operation: string): number => {
    switch (operation) {
      case '+': return firstOperand + secondOperand;
      case '-': return firstOperand - secondOperand;
      case '×': return firstOperand * secondOperand;
      case '÷': return firstOperand / secondOperand;
      case '=': return secondOperand;
      default: return secondOperand;
    }
  };

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const buttonClass = "h-14 text-lg font-medium acrylic-button";
  const operatorClass = "h-14 text-lg font-medium bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30";
  const equalsClass = "h-14 text-lg font-medium bg-accent/20 hover:bg-accent/30 text-accent border border-accent/30";

  return (
    <div className="p-6">
      <Card className="p-4 mica-card max-w-sm mx-auto">
        {/* Display */}
        <div className="mb-4 p-4 bg-muted/50 rounded-lg text-right">
          <div className="text-3xl font-bold text-foreground truncate">
            {display}
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <Button className={buttonClass} onClick={clear}>C</Button>
          <Button className={buttonClass} onClick={() => setDisplay(display.slice(0, -1) || '0')}>⌫</Button>
          <Button className={buttonClass}>%</Button>
          <Button className={operatorClass} onClick={() => inputOperation('÷')}>÷</Button>

          {/* Row 2 */}
          <Button className={buttonClass} onClick={() => inputNumber('7')}>7</Button>
          <Button className={buttonClass} onClick={() => inputNumber('8')}>8</Button>
          <Button className={buttonClass} onClick={() => inputNumber('9')}>9</Button>
          <Button className={operatorClass} onClick={() => inputOperation('×')}>×</Button>

          {/* Row 3 */}
          <Button className={buttonClass} onClick={() => inputNumber('4')}>4</Button>
          <Button className={buttonClass} onClick={() => inputNumber('5')}>5</Button>
          <Button className={buttonClass} onClick={() => inputNumber('6')}>6</Button>
          <Button className={operatorClass} onClick={() => inputOperation('-')}>-</Button>

          {/* Row 4 */}
          <Button className={buttonClass} onClick={() => inputNumber('1')}>1</Button>
          <Button className={buttonClass} onClick={() => inputNumber('2')}>2</Button>
          <Button className={buttonClass} onClick={() => inputNumber('3')}>3</Button>
          <Button className={operatorClass} onClick={() => inputOperation('+')}>+</Button>

          {/* Row 5 */}
          <Button className={`${buttonClass} col-span-2`} onClick={() => inputNumber('0')}>0</Button>
          <Button className={buttonClass} onClick={() => inputNumber('.')}>.</Button>
          <Button className={equalsClass} onClick={performCalculation}>=</Button>
        </div>
      </Card>
    </div>
  );
};

export default CalculatorApp;