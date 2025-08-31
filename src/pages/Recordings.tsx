import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Recording, TableSort, RecordingFilters } from '../types';
import { mockRecordings } from '../data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';

const Recordings: React.FC = () => {
  const [recordings] = useState<Recording[]>(mockRecordings);
  const [filters, setFilters] = useState<RecordingFilters>({
    name: '',
    dateFrom: undefined,
    dateTo: undefined,
  });
  const [sort, setSort] = useState<TableSort>({
    field: 'dateUploaded',
    direction: 'desc',
  });

  const filteredAndSortedRecordings = useMemo(() => {
    let filtered = recordings.filter((recording) => {
      const nameMatch = recording.name.toLowerCase().includes(filters.name.toLowerCase());
      const dateFromMatch = !filters.dateFrom || recording.dateUploaded >= filters.dateFrom;
      const dateToMatch = !filters.dateTo || recording.dateUploaded <= filters.dateTo;
      
      return nameMatch && dateFromMatch && dateToMatch;
    });

    filtered.sort((a, b) => {
      let aValue = a[sort.field];
      let bValue = b[sort.field];

      if (aValue instanceof Date && bValue instanceof Date) {
        aValue = aValue.getTime();
        bValue = bValue.getTime();
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sort.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [recordings, filters, sort]);

  const handleSort = (field: keyof Recording) => {
    setSort((prevSort) => ({
      field,
      direction: prevSort.field === field && prevSort.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleEdit = (id: string) => {
    console.log('Edit recording:', id);
    // Navigate to edit page or open modal
  };

  const handleView = (id: string) => {
    console.log('View recording:', id);
    // Navigate to recording detail page
    window.location.href = `/recordings/${id}`;
  };

  const handleRemove = (id: string) => {
    console.log('Remove recording:', id);
    // Show confirmation dialog and remove
    if (window.confirm('Are you sure you want to remove this recording?')) {
      // Remove from state
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recordings</h1>
          <p className="text-gray-600 mt-2">Manage and organize your audio recordings</p>
        </div>
        <Button className="btn-primary">
          📤 Upload Recording
        </Button>
      </div>

      {/* Filters */}
      <Card>
        {/* <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter recordings by name and date range</CardDescription>
        </CardHeader> */}
        <CardContent className='pt-6'>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nameFilter">Recording Name</Label>
              <Input
                id="nameFilter"
                type="text"
                placeholder="Search by name..."
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFromFilter">From Date</Label>
              <Input
                id="dateFromFilter"
                type="date"
                value={filters.dateFrom?.toISOString().split('T')[0] || ''}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    dateFrom: e.target.value ? new Date(e.target.value) : undefined,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateToFilter">To Date</Label>
              <Input
                id="dateToFilter"
                type="date"
                value={filters.dateTo?.toISOString().split('T')[0] || ''}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    dateTo: e.target.value ? new Date(e.target.value) : undefined,
                  })
                }
              />
            </div>

            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => setFilters({ name: '', dateFrom: undefined, dateTo: undefined })}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recordings Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                      sort.field === 'name' ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleSort('name')}
                  >
                    Name
                    <span className="ml-2">
                      {sort.field === 'name' ? (sort.direction === 'asc' ? '↑' : '↓') : '↕'}
                    </span>
                  </th>
                  <th 
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                      sort.field === 'dateUploaded' ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleSort('dateUploaded')}
                  >
                    Date Uploaded
                    <span className="ml-2">
                      {sort.field === 'dateUploaded' ? (sort.direction === 'asc' ? '↑' : '↓') : '↕'}
                    </span>
                  </th>
                  <th 
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
                      sort.field === 'duration' ? 'bg-gray-100' : ''
                    }`}
                    onClick={() => handleSort('duration')}
                  >
                    Duration
                    <span className="ml-2">
                      {sort.field === 'duration' ? (sort.direction === 'asc' ? '↑' : '↓') : '↕'}
                    </span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedRecordings.map((recording) => (
                  <tr key={recording.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{recording.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {formatDate(recording.dateUploaded)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="secondary">{formatDuration(recording.duration)}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(recording.id)}
                          title="View Details"
                        >
                          👁️
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(recording.id)}
                          title="Edit"
                        >
                          ✏️
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemove(recording.id)}
                          title="Remove"
                        >
                          🗑️
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedRecordings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No recordings found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-sm text-gray-500">
        Showing {filteredAndSortedRecordings.length} of {recordings.length} recordings
      </div>
    </div>
  );
};

export default Recordings;
