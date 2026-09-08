import React from 'react';
import { CropStats } from '@/types/dashboard';

interface CropStageBreakdownProps {
  cropStats: CropStats;
}


const STAGE_CONFIG: Record<string, { label: string; icon: string; bgClass: string }> = {
  SEEDLING: { label: 'Seedling', icon: '🌱', bgClass: 'bg-green-50 text-green-700 border-green-200' },
  VEGETATIVE: { label: 'Vegetative', icon: '🌿', bgClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  FLOWERING: { label: 'Flowering', icon: '🌸', bgClass: 'bg-pink-50 text-pink-700 border-pink-200' },
  FRUITING: { label: 'Fruiting', icon: '🍅', bgClass: 'bg-amber-50 text-amber-700 border-amber-200' },
};

export const CropStageBreakdown: React.FC<CropStageBreakdownProps> = ({ cropStats }) => {
  const activeEntries = Object.entries(cropStats).filter(([_, count]) => count > 0);

  if (activeEntries.length === 0) {
    return (
      <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center items-center h-full min-h-[140px]">
        <p className="text-sm font-medium text-gray-400">No active crops tracked</p>
      </div>
    );
  }

  return (
    <div className="p-5 bg-white rounded-xl border border-gray-100 shadow-sm h-full">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Active Crop Stages
      </h3>
      
      <div className="flex flex-wrap gap-2.5">
        {activeEntries.map(([stage, count]) => {
          const config = STAGE_CONFIG[stage] || { label: stage, icon: '🌾', bgClass: 'bg-gray-50 text-gray-700 border-gray-200' };
          
          return (
            <div
              key={stage}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${config.bgClass}`}
            >
              <span>{config.icon}</span>
              <span>{config.label}:</span>
              <span className="font-bold text-base">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};