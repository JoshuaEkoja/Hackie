import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExportControls = ({ onExport }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleExport = async (format) => {
    setIsExporting(true);
    setShowMenu(false);
    
    if (onExport) {
      await onExport(format);
    }
    
    setTimeout(() => {
      setIsExporting(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        iconName="Download"
        iconPosition="left"
        onClick={() => setShowMenu(!showMenu)}
        loading={isExporting}
      >
        Export
      </Button>

      {showMenu && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 animate-fadeIn">
          <button
            onClick={() => handleExport('pdf')}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-smooth text-left"
          >
            <Icon name="FileText" size={18} />
            <span className="text-sm">Export as PDF</span>
          </button>
          <button
            onClick={() => handleExport('csv')}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-smooth text-left border-t border-border"
          >
            <Icon name="Table" size={18} />
            <span className="text-sm">Export as CSV</span>
          </button>
          <button
            onClick={() => handleExport('excel')}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-smooth text-left border-t border-border rounded-b-lg"
          >
            <Icon name="Sheet" size={18} />
            <span className="text-sm">Export as Excel</span>
          </button>
        </div>
      )}

      {showMenu && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default ExportControls;