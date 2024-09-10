import React from 'react';
import {StyleSheet, View} from 'react-native';

import Tab from './Tab';
import {WIDTH} from '@utils/device';
import Indicator from './Indicator';
import {TMeasure, TTabs} from './types';

const Tabs = ({data, scrollX, onItemPress}: TTabs) => {
  const [measures, setMeasures] = React.useState<TMeasure[]>([]);
  const containerRef = React.useRef<any>();

  React.useEffect(() => {
    const m: TMeasure[] = [];
    data.forEach(item => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x: number, y: number, width: number, height: number) => {
          m.push({
            x,
            y,
            width,
            height,
          });

          if (m.length === data.length) {
            setMeasures(m);
          }
        },
      );
    });
  }, [measures]);

  return (
    <View style={styles.container}>
      <View ref={containerRef} style={styles.tabsContainer}>
        {data.map((item, index) => (
          <Tab
            ref={item.ref}
            key={item.key}
            item={item}
            onItemPress={() => {
              onItemPress(index);
            }}
          />
        ))}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    width: WIDTH,
  },
  tabsContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});

export default Tabs;
