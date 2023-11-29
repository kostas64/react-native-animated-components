import React from 'react';
import {DATA} from '@assets/homeData';
import {THomeNavigationProps} from 'src/App';
import HomeButton from '@components/HomeButton';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

const HomeBody = () => {
  const navigation = useNavigation<THomeNavigationProps>();
  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      {DATA?.map((mainItem, index) => {
        const props =
          mainItem.iconComp === 'image'
            ? {
                style: styles.icon,
                source: mainItem.iconName,
              }
            : {
                size: mainItem.iconSize,
                color: mainItem.iconColor,
                name: mainItem.iconName,
              };

        const IconComp =
          mainItem.iconComp === 'image'
            ? Image
            : mainItem.iconComp === 'FontAwesome'
            ? FontAwesome
            : Ionicons;

        return (
          <React.Fragment key={index}>
            <View style={styles.sectionContainer}>
              {/*@ts-ignore*/}
              <IconComp {...props} />
              <Text style={styles.listLabel}>{mainItem.iconText}</Text>
            </View>
            <View style={styles.separator} />
            {mainItem?.items?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <HomeButton
                    label={item.label}
                    backgroundColor={item.backgroundColor}
                    onPress={() => navigation.navigate(item.screen)}
                  />
                  <View style={styles.separator} />
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f2f7fd',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listLabel: {
    fontSize: 22,
    fontWeight: '500',
    color: '#3f546a',
    paddingLeft: 4,
  },
  navbarLabel: {
    fontSize: 22,
    fontWeight: '500',
    color: '#3f546a',
    paddingLeft: 8,
  },
  separator: {
    paddingVertical: 8,
  },
  icon: {
    width: 34,
    height: 34,
  },
});

export default HomeBody;
