'use client';

import { useState } from 'react';

type ZoneFormProps = {
  onSubmit: (zone: number) => void;
  isLoading?: boolean;
};

export default function ZoneForm({ onSubmit, isLoading }: ZoneFormProps) {
  const [zone, setZone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const zoneNumber = Number.parseInt(zone, 10);
    if (Number.isNaN(zoneNumber)) {
      setError('Please enter a valid number');
      return;
    }

    if (zoneNumber < 1 || zoneNumber > 13) {
      setError('Zone must be between 1 and 13');
      return;
    }

    onSubmit(zoneNumber);
  };

  const handleSetZone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZone(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="zone" className="block text-sm font-medium mb-1">
          Enter your USDA Hardiness Zone (1-13)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            id="zone"
            value={zone}
            onChange={handleSetZone}
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 5"
            min="1"
            max="13"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'Find Plants'}
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </form>
  );
}
