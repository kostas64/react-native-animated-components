import {StyleSheet} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import Animated, {LinearTransition} from 'react-native-reanimated';

import {
  TEvent,
  TNavigation,
  TCalendarState,
} from '@components/taskCalendar/types';
import {Colors} from '@utils/colors';
import Event from '@components/taskCalendar/Event';
import Header from '@components/taskCalendar/Header';
import Loading from '@components/taskCalendar/Loading';
import {MONTHS} from '@components/taskCalendar/constants';
import ListEmpty from '@components/taskCalendar/ListEmpty';
import StatusBarManager from '@components/common/StatusBarManager';
import {useCalendarEvents} from '@components/taskCalendar/hooks/useCalendarEvents';

export const today = new Date();

const initialState = {
  loading: true,
  month: MONTHS[new Date().getMonth()],
  transitionEnd: false,
  selectedDate: today,
};

const TaskCalendarScreen = ({navigation}: TNavigation) => {
  const [state, setState] = React.useState<TCalendarState>(initialState);

  const filteredEvents = useCalendarEvents(state);

  const events = state.loading ? [] : filteredEvents;

  const onSelecteMonth = useCallback((month: number) => {
    setState(prev => ({
      ...prev,
      month: MONTHS[month],
      loading: true,
    }));
  }, []);

  const renderItem = useCallback(
    ({item, index}: {item: TEvent; index: number}) => {
      return <Event {...item} key={index} />;
    },
    [state.month],
  );

  const selectDate = useCallback((date: Date) => {
    setState(prev => ({...prev, selectedDate: date, loading: true}));
  }, []);

  const stopLoading = useCallback(() => {
    setState(prev => ({...prev, loading: false}));
  }, []);

  useEffect(() => {
    const listener = navigation.addListener('transitionEnd', () => {
      setState(prev => ({...prev, transitionEnd: true}));
    });

    return listener;
  }, []);

  return (
    <Animated.View style={styles.container}>
      <StatusBarManager barStyle={'light'} />
      <Loading loading={state.loading} stopLoading={stopLoading} />
      {state.transitionEnd && (
        <>
          <Header
            month={state.month}
            selectedDate={selectDate}
            onSelecteMonth={onSelecteMonth}
          />
          <Animated.FlatList
            style={styles.container}
            layout={LinearTransition}
            data={events}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentStyle}
            ListEmptyComponent={
              <ListEmpty
                loading={state.loading}
                selectedDate={state.selectedDate}
              />
            }
          />
        </>
      )}
    </Animated.View>
  );
};

export default TaskCalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.CHINESE_BLACK,
  },
  contentStyle: {
    flexGrow: 1,
    paddingBottom: 24,
  },
});
