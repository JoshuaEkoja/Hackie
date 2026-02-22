import React from 'react';
import Select from '../../../components/ui/Select';

const EventSelector = ({ selectedEvent, onEventChange, events }) => {
  const eventOptions = events?.map(event => ({
    value: event?.id,
    label: event?.name,
    description: `${event?.participants} participants • ${event?.date}`
  }));

  return (
    <div className="w-full md:w-64 lg:w-80">
      <Select
        label="Select Event"
        options={eventOptions}
        value={selectedEvent}
        onChange={onEventChange}
        searchable
        placeholder="Choose an event..."
      />
    </div>
  );
};

export default EventSelector;