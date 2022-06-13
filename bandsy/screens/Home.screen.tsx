import React from 'react';
import { StyleSheet, View, Animated, Text, Dimensions } from 'react-native';
import { useAppContext } from '../utils/App.provider';
import { UserCard } from '../components/UserCard';
import { getOtherUsers } from '../services/userServices';
import { userWithInfo } from '../Types';
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width;
//const height = Dimensions.get('window').height;

const CONTAINER_WIDTH = width * 1;
const HORIZONTAL_MARGIN = (width - CONTAINER_WIDTH) / 2;

export const HomeScreen: React.FC = () => {
  const [otherUsers, setOtherUsers] = React.useState<userWithInfo[]>([]);
  const appContext = useAppContext();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const fetchOtherUsers = React.useCallback(async () => {
    console.log(appContext.sessionToken);
    const otherUsersArray = await getOtherUsers(appContext.sessionToken);
    otherUsersArray && setOtherUsers(otherUsersArray);
    console.log(otherUsers);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    fetchOtherUsers();
  }, [fetchOtherUsers]);
  return (
    <View style={styles.background}>
      {otherUsers[0] ? (
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          data={otherUsers}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToInterval={CONTAINER_WIDTH}
          contentContainerStyle={styles.carousel}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * CONTAINER_WIDTH,
              index * CONTAINER_WIDTH,
              (index + 1) * CONTAINER_WIDTH,
            ];
            const outputRange = [0, -50, 0];
            const translateY = scrollX.interpolate({
              inputRange,
              outputRange,
            });
            return (
              <Animated.View
                style={[
                  styles.carouselItem,
                  {
                    width: CONTAINER_WIDTH,
                    transform: [{ translateY }],
                  },
                ]}>
                <UserCard user={item} />
              </Animated.View>
            );
          }}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: 'center',
  },
  carousel: {
    paddingTop: 100,
    marginHorizontal: HORIZONTAL_MARGIN,
  },
  carouselItem: {
    justifyContent: 'space-around',
    alignContent: 'flex-start',
  },
});
