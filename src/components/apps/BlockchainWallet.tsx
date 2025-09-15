import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Plus, Coins, TrendingUp, Wallet } from 'lucide-react';

const BlockchainWallet = () => {
  const [balance] = useState('2,847.32');
  const [sendAmount, setSendAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const transactions = [
    { id: 1, type: 'received', amount: '+150.00', from: '0x742d...89AB', time: '2 mins ago' },
    { id: 2, type: 'sent', amount: '-75.50', to: '0x123f...45CD', time: '1 hour ago' },
    { id: 3, type: 'minted', amount: '+200.00', token: 'USDC', time: '3 hours ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Wallet Balance */}
      <Card className="p-6 mica-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Wallet className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">Main Wallet</h2>
          </div>
          <TrendingUp className="w-5 h-5 text-accent" />
        </div>
        <div className="text-3xl font-bold text-primary mb-2">${balance}</div>
        <div className="text-sm text-muted-foreground">+12.5% from last month</div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="acrylic-button h-12 flex items-center space-x-2">
          <Send className="w-4 h-4" />
          <span>Send</span>
        </Button>
        <Button className="acrylic-button h-12 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Mint Token</span>
        </Button>
      </div>

      {/* Send Transaction Form */}
      <Card className="p-4 mica-card">
        <h3 className="font-semibold mb-4 flex items-center">
          <Send className="w-4 h-4 mr-2" />
          Quick Send
        </h3>
        <div className="space-y-3">
          <Input
            placeholder="Recipient address (0x...)"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="bg-input border-border"
          />
          <Input
            placeholder="Amount"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
            className="bg-input border-border"
          />
          <Button className="w-full acrylic-button">Send Transaction</Button>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-4 mica-card">
        <h3 className="font-semibold mb-4 flex items-center">
          <Coins className="w-4 h-4 mr-2" />
          Recent Transactions
        </h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <div>
                <div className="font-medium">{tx.type}</div>
                <div className="text-sm text-muted-foreground">{tx.time}</div>
              </div>
              <div className={`font-bold ${
                tx.type === 'received' || tx.type === 'minted' 
                  ? 'text-accent' 
                  : 'text-destructive'
              }`}>
                {tx.amount}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BlockchainWallet;