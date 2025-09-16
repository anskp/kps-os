import { useState } from 'react';
import { 
  Trash2, 
  RefreshCw, 
  X, 
  FileText, 
  Image, 
  Folder,
  AlertTriangle,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeletedItem {
  id: string;
  name: string;
  originalPath: string;
  deletedDate: string;
  size: string;
  type: 'file' | 'folder';
}

const RecycleBin = () => {
  const [deletedItems, setDeletedItems] = useState<DeletedItem[]>([
    {
      id: '1',
      name: 'old_project.zip',
      originalPath: 'C:\\Users\\User\\Downloads',
      deletedDate: '1/14/2024 3:30 PM',
      size: '15.2 MB',
      type: 'file'
    },
    {
      id: '2',
      name: 'temp_folder',
      originalPath: 'C:\\Users\\User\\Documents',
      deletedDate: '1/13/2024 11:45 AM',
      size: '2.1 MB',
      type: 'folder'
    },
    {
      id: '3',
      name: 'screenshot.png',
      originalPath: 'C:\\Users\\User\\Pictures',
      deletedDate: '1/12/2024 9:20 AM',
      size: '892 KB',
      type: 'file'
    },
    {
      id: '4',
      name: 'draft.docx',
      originalPath: 'C:\\Users\\User\\Documents',
      deletedDate: '1/11/2024 2:15 PM',
      size: '1.3 MB',
      type: 'file'
    }
  ]);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showEmptyConfirm, setShowEmptyConfirm] = useState(false);

  const getItemIcon = (item: DeletedItem) => {
    if (item.type === 'folder') return Folder;
    
    const ext = item.name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return Image;
      default:
        return FileText;
    }
  };

  const handleItemClick = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([itemId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === deletedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(deletedItems.map(item => item.id));
    }
  };

  const handleRestore = () => {
    const itemsToRestore = selectedItems.length > 0 ? selectedItems : deletedItems.map(item => item.id);
    setDeletedItems(prev => prev.filter(item => !itemsToRestore.includes(item.id)));
    setSelectedItems([]);
  };

  const handleDeletePermanently = () => {
    const itemsToDelete = selectedItems.length > 0 ? selectedItems : deletedItems.map(item => item.id);
    setDeletedItems(prev => prev.filter(item => !itemsToDelete.includes(item.id)));
    setSelectedItems([]);
  };

  const handleEmptyRecycleBin = () => {
    setDeletedItems([]);
    setSelectedItems([]);
    setShowEmptyConfirm(false);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Trash2 size={24} className="text-gray-600" />
            <h1 className="text-lg font-semibold">Recycle Bin</h1>
          </div>
          <div className="text-sm text-gray-500">
            {deletedItems.length} items
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleRestore}
            disabled={deletedItems.length === 0}
            className="flex items-center space-x-2 text-sm"
            variant="outline"
          >
            <RefreshCw size={14} />
            <span>Restore</span>
          </Button>
          
          <Button
            onClick={handleDeletePermanently}
            disabled={deletedItems.length === 0}
            className="flex items-center space-x-2 text-sm"
            variant="outline"
          >
            <X size={14} />
            <span>Delete permanently</span>
          </Button>
          
          <div className="w-px h-6 bg-gray-300 mx-2"></div>
          
          <Button
            onClick={() => setShowEmptyConfirm(true)}
            disabled={deletedItems.length === 0}
            className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700"
            variant="ghost"
          >
            <Trash2 size={14} />
            <span>Empty Recycle Bin</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {deletedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Trash2 size={64} className="mb-4 opacity-50" />
            <h2 className="text-xl font-medium mb-2">Recycle Bin is empty</h2>
            <p className="text-sm">Items you delete will appear here.</p>
          </div>
        ) : (
          <div className="p-3">
            {/* Select All */}
            <div className="flex items-center mb-3 pb-2 border-b border-gray-200">
              <input
                type="checkbox"
                checked={selectedItems.length === deletedItems.length}
                onChange={handleSelectAll}
                className="mr-3"
              />
              <span className="text-sm font-medium">Name</span>
              <span className="text-sm font-medium ml-auto mr-32">Original Location</span>
              <span className="text-sm font-medium mr-24">Date Deleted</span>
              <span className="text-sm font-medium mr-16">Size</span>
            </div>

            {/* Items List */}
            <div className="space-y-1">
              {deletedItems.map((item) => {
                const IconComponent = getItemIcon(item);
                const isSelected = selectedItems.includes(item.id);
                
                return (
                  <div
                    key={item.id}
                    className={`flex items-center p-2 rounded cursor-pointer hover:bg-blue-50 ${
                      isSelected ? 'bg-blue-100 border border-blue-300' : ''
                    }`}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleItemClick(item.id)}
                      className="mr-3"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <IconComponent 
                      size={16} 
                      className={`mr-3 ${item.type === 'folder' ? 'text-yellow-600' : 'text-gray-600'}`} 
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.name}</div>
                    </div>
                    <div className="text-xs text-gray-500 w-64 truncate mr-4">
                      {item.originalPath}
                    </div>
                    <div className="text-xs text-gray-500 w-32 text-right mr-4">
                      {item.deletedDate}
                    </div>
                    <div className="text-xs text-gray-500 w-20 text-right mr-4">
                      {item.size}
                    </div>
                    <button className="p-1 rounded hover:bg-gray-200">
                      <MoreVertical size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Empty Confirmation Dialog */}
      {showEmptyConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle size={24} className="text-amber-500 mr-3" />
              <h3 className="text-lg font-semibold">Empty Recycle Bin</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to permanently delete all {deletedItems.length} items? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => setShowEmptyConfirm(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={handleEmptyRecycleBin}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Empty Recycle Bin
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecycleBin;