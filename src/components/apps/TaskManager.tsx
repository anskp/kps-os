import { useState } from 'react';
import { Cpu, HardDrive, Zap, X } from 'lucide-react';

const TaskManager = () => {
  const [activeTab, setActiveTab] = useState('processes');

  const processes = [
    { name: 'System', pid: 4, cpu: 0.1, memory: '12.4 MB', status: 'Running' },
    { name: 'Windows Explorer', pid: 1234, cpu: 2.3, memory: '89.2 MB', status: 'Running' },
    { name: 'Chrome', pid: 5678, cpu: 15.7, memory: '245.8 MB', status: 'Running' },
    { name: 'Visual Studio Code', pid: 9012, cpu: 8.4, memory: '156.3 MB', status: 'Running' },
    { name: 'Steam', pid: 3456, cpu: 1.2, memory: '78.9 MB', status: 'Running' },
    { name: 'Discord', pid: 7890, cpu: 3.8, memory: '134.7 MB', status: 'Running' },
  ];

  const systemInfo = {
    cpu: { usage: 23, name: 'Intel Core i7-12700K' },
    memory: { used: 8.4, total: 16, usage: 52 },
    disk: { used: 256, total: 512, usage: 50 }
  };

  const tabs = [
    { id: 'processes', label: 'Processes' },
    { id: 'performance', label: 'Performance' },
    { id: 'app-history', label: 'App history' },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Tabs */}
      <div className="border-b">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'processes' && (
          <div className="p-4">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Processes ({processes.length})</h2>
              <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                End task
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-2 font-medium">Name</th>
                    <th className="text-right p-2 font-medium">PID</th>
                    <th className="text-right p-2 font-medium">CPU</th>
                    <th className="text-right p-2 font-medium">Memory</th>
                    <th className="text-center p-2 font-medium">Status</th>
                    <th className="text-center p-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {processes.map((process, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-2">{process.name}</td>
                      <td className="text-right p-2">{process.pid}</td>
                      <td className="text-right p-2">{process.cpu}%</td>
                      <td className="text-right p-2">{process.memory}</td>
                      <td className="text-center p-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {process.status}
                        </span>
                      </td>
                      <td className="text-center p-2">
                        <button className="p-1 hover:bg-red-100 text-red-600 rounded">
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="p-4 space-y-6">
            {/* CPU */}
            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Cpu className="text-blue-500" size={20} />
                  <h3 className="font-semibold">CPU</h3>
                </div>
                <span className="text-2xl font-bold text-blue-500">{systemInfo.cpu.usage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${systemInfo.cpu.usage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{systemInfo.cpu.name}</p>
            </div>

            {/* Memory */}
            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Zap className="text-green-500" size={20} />
                  <h3 className="font-semibold">Memory</h3>
                </div>
                <span className="text-2xl font-bold text-green-500">{systemInfo.memory.usage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${systemInfo.memory.usage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                {systemInfo.memory.used} GB / {systemInfo.memory.total} GB
              </p>
            </div>

            {/* Disk */}
            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <HardDrive className="text-orange-500" size={20} />
                  <h3 className="font-semibold">Disk</h3>
                </div>
                <span className="text-2xl font-bold text-orange-500">{systemInfo.disk.usage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-orange-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${systemInfo.disk.usage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                {systemInfo.disk.used} GB / {systemInfo.disk.total} GB
              </p>
            </div>
          </div>
        )}

        {activeTab === 'app-history' && (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">App history</h2>
            <div className="text-center text-gray-500 py-8">
              <p>App usage history will appear here</p>
              <p className="text-sm mt-2">Start using apps to see their resource usage over time</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;