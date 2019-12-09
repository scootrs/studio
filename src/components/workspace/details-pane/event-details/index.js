import React from 'react';
import View from './view';
import EventConfigDetailsPane from './config';

export default function EventDetails() {
  return (
    <View>
      <EventConfigDetailsPane name="Config" />
    </View>
  );
}
