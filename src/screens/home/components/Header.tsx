import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TabBar from './TabBar';
import { useColorScheme } from '@/src/hooks/useColorScheme';

const Header = ({ tabs, onTabPress, selectedTab }) => {
  const colorScheme = useColorScheme();
  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>ট্রিকবিডি</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color={styles.iconColor} />
        </TouchableOpacity>
      </View>
      {/**<TabBar tabs={tabs} onTabPress={onTabPress} />**/}
    </View>
  );
};
const lightStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: StatusBar.currentHeight + 16 * 3,
  },
  headerText: {
    color: '#18879c',
    fontSize: 26,
    fontFamily: 'HindShiliguriBold',
  },
  iconColor: 'black',
});
const darkStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: StatusBar.currentHeight + 16 * 3,
  },
  headerText: {
    color: '#18879c',
    fontSize: 26,
    fontFamily: 'HindShiliguriBold',
  },
  iconColor: 'white',
});

export default Header;
