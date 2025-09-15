import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle, Scan, Activity } from 'lucide-react';

const SecurityScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  
  const vulnerabilities = [
    { id: 1, type: 'SQL Injection', severity: 'High', status: 'Found', url: '/api/users' },
    { id: 2, type: 'XSS', severity: 'Medium', status: 'Fixed', url: '/dashboard' },
    { id: 3, type: 'CSRF', severity: 'Low', status: 'Mitigated', url: '/forms' },
    { id: 4, type: 'Open Redirect', severity: 'Medium', status: 'Found', url: '/auth/callback' },
  ];

  const stats = {
    totalScans: 1247,
    vulnerabilitiesFound: 23,
    criticalIssues: 3,
    lastScan: '2 hours ago'
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-destructive';
      case 'Medium': return 'text-accent';
      case 'Low': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Found': return 'text-destructive';
      case 'Fixed': return 'text-accent';
      case 'Mitigated': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Scanner Status */}
      <Card className="p-6 mica-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Shield className="w-6 h-6 mr-2 text-primary" />
            Security Scanner
          </h2>
          <div className={`px-3 py-1 rounded-full text-sm ${
            isScanning ? 'bg-accent/20 text-accent animate-pulse' : 'bg-muted text-muted-foreground'
          }`}>
            {isScanning ? 'Scanning...' : 'Ready'}
          </div>
        </div>
        
        {isScanning && (
          <div className="mb-4">
            <Progress value={scanProgress} className="mb-2" />
            <div className="text-sm text-muted-foreground">Scanning for vulnerabilities... {scanProgress}%</div>
          </div>
        )}
        
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.totalScans}</div>
            <div className="text-sm text-muted-foreground">Total Scans</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{stats.vulnerabilitiesFound}</div>
            <div className="text-sm text-muted-foreground">Issues Found</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-destructive">{stats.criticalIssues}</div>
            <div className="text-sm text-muted-foreground">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-muted-foreground">{stats.lastScan}</div>
            <div className="text-sm text-muted-foreground">Last Scan</div>
          </div>
        </div>
        
        <Button 
          className="w-full acrylic-button" 
          onClick={startScan}
          disabled={isScanning}
        >
          <Scan className="w-4 h-4 mr-2" />
          {isScanning ? 'Scanning...' : 'Start Security Scan'}
        </Button>
      </Card>

      {/* Live Monitoring */}
      <Card className="p-6 mica-card">
        <h3 className="font-semibold mb-4 flex items-center">
          <Activity className="w-4 h-4 mr-2" />
          Live Threat Monitoring
        </h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Port Scanning Attempts</span>
            <span className="text-accent">24 blocked</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Malicious IPs Detected</span>
            <span className="text-destructive">3 active</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>SSL Certificate Status</span>
            <span className="text-accent">Valid</span>
          </div>
        </div>
      </Card>

      {/* Vulnerabilities List */}
      <Card className="p-4 mica-card">
        <h3 className="font-semibold mb-4 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Recent Vulnerabilities
        </h3>
        <div className="space-y-3">
          {vulnerabilities.map((vuln) => (
            <div key={vuln.id} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <div className="flex-1">
                <div className="font-medium flex items-center">
                  {vuln.status === 'Fixed' ? 
                    <CheckCircle className="w-4 h-4 mr-2 text-accent" /> :
                    <AlertTriangle className="w-4 h-4 mr-2 text-destructive" />
                  }
                  {vuln.type}
                </div>
                <div className="text-sm text-muted-foreground">{vuln.url}</div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getSeverityColor(vuln.severity)}`}>
                  {vuln.severity}
                </div>
                <div className={`text-xs ${getStatusColor(vuln.status)}`}>
                  {vuln.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SecurityScanner;