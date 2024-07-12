import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import TabBar from './components/TabBar';
import Header from './components/Header';
import TabContent from './tabs/TabContent';
import { useColorScheme } from '@/src/hooks/useColorScheme';
const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState('right');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const styles = isDarkMode ? darkStyles : lightStyles;

  const tabs = [
    {
      id: 460,
      name: 'Airtel free net',
      slug: 'airtel-free-net',
      description: 'You will get airtel latest free net tricks from here!',
      count: 284,
    },
    {
      id: 16,
      name: 'Android Custom Rom',
      slug: 'custom-rom',
      description: '',
      count: 260,
    },
    {
      id: 19,
      name: 'Android phone review',
      slug: 'android-phone-review',
      description: '',
      count: 577,
    },
    {
      id: 18,
      name: 'Android root',
      slug: 'android-root',
      description: '',
      count: 545,
    },
    {
      id: 17,
      name: 'Android Tips',
      slug: 'android-tips',
      description: '',
      count: 4407,
    },
    {
      id: 803,
      name: 'Android Xposed Framework',
      slug: 'android-xposed-framework',
      description: '',
      count: 134,
    },
    {
      id: 13,
      name: 'Apps review',
      slug: 'apps-review',
      description: '',
      count: 6963,
    },
    {
      id: 461,
      name: 'Banglalink free net',
      slug: 'banglalink-free-net',
      description: 'You will get banglalink latest free net tricks from here!',
      count: 385,
    },
    {
      id: 89311,
      name: 'Binning',
      slug: 'binning',
      description: '',
      count: 52,
    },
    {
      id: 33157,
      name: 'Blogger',
      slug: 'blogger',
      description: '',
      count: 639,
    },
    {
      id: 23290,
      name: 'Broadband Tricks',
      slug: 'broadband-tricks',
      description: '',
      count: 55,
    },
    {
      id: 35,
      name: 'C programming',
      slug: 'c-programming',
      description: '',
      count: 91,
    },
    {
      id: 67729,
      name: 'Corona Virus Update Bangladesh',
      slug: 'corona-virus-update-bangladesh',
      description: '',
      count: 37,
    },
    {
      id: 78566,
      name: 'Cryptocurrency',
      slug: 'cryptocurrency',
      description:
        '<a href="https://trickbd.com/wp-content/uploads/2021/05/03/Cryptocurrency-for-Beginners.jpeg"><img class="alignnone size-full wp-image-716860" src="https://trickbd.com/wp-content/uploads/2021/05/03/Cryptocurrency-for-Beginners.jpeg" alt="" width="1200" height="628" /></a>\r\n\r\n\u098f\u0995\u099f\u09bf \u0995\u09cd\u09b0\u09bf\u09aa\u09cd\u099f\u09cb\u0995\u09be\u09b0\u09c7\u09a8\u09cd\u09b8\u09bf (\u09ac\u09be "\u0995\u09cd\u09b0\u09bf\u09aa\u09cd\u099f\u09cb") \u098f\u09ae\u09a8 \u098f\u0995\u099f\u09bf \u09a1\u09bf\u099c\u09bf\u099f\u09be\u09b2 \u09ae\u09c1\u09a6\u09cd\u09b0\u09be \u09af\u09be \u09aa\u09a3\u09cd\u09af \u098f\u09ac\u0982 \u09aa\u09b0\u09bf\u09b7\u09c7\u09ac\u09be\u09a6\u09bf \u0995\u09c7\u09a8\u09be\u09b0 \u099c\u09a8\u09cd\u09af \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0 \u0995\u09b0\u09be \u09af\u09c7\u09a4\u09c7 \u09aa\u09be\u09b0\u09c7 \u09a4\u09ac\u09c7 \u0985\u09a8\u09b2\u09be\u0987\u09a8\u09c7 \u09b2\u09c7\u09a8\u09a6\u09c7\u09a8 \u09b8\u09c1\u09b0\u0995\u09cd\u09b7\u09bf\u09a4 \u0995\u09b0\u09be\u09b0 \u099c\u09a8\u09cd\u09af \u09b6\u0995\u09cd\u09a4\u09bf\u09b6\u09be\u09b2\u09c0 \u0995\u09cd\u09b0\u09bf\u09aa\u09cd\u099f\u09cb\u0997\u09cd\u09b0\u09be\u09ab\u09bf \u09b8\u09b9 \u098f\u0995\u099f\u09bf \u0985\u09a8\u09b2\u09be\u0987\u09a8 \u0996\u09be\u09a4\u09be \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0 \u0995\u09b0\u09c7\u0964 \u098f\u0987 \u0985\u09a8\u09bf\u09af\u09bc\u09a8\u09cd\u09a4\u09cd\u09b0\u09bf\u09a4 \u09ae\u09c1\u09a6\u09cd\u09b0\u09be\u0997\u09c1\u09b2\u09bf\u09b0 \u09ac\u09c7\u09b6\u09bf\u09b0\u09ad\u09be\u0997 \u0986\u0997\u09cd\u09b0\u09b9 \u09b9\'\u09b2 \u09ae\u09c1\u09a8\u09be\u09ab\u09be\u09b0 \u099c\u09a8\u09cd\u09af \u09ac\u09be\u09a3\u09bf\u099c\u09cd\u09af \u0995\u09b0\u09be, \u0995\u0996\u09a8\u0993 \u0995\u0996\u09a8\u0993 \u0985\u09a8\u09c1\u09ae\u09be\u09a8\u0995\u09be\u09b0\u09c0\u09b0\u09be \u09a6\u09be\u09ae\u09c7\u09b0 \u0986\u0995\u09be\u09b6\u09c7\u09b0 \u09a6\u09bf\u0995\u09c7 \u099a\u09be\u09b2\u09bf\u09a4 \u0995\u09b0\u09c7\u0964',
      count: 46,
    },
    {
      id: 94458,
      name: 'Education',
      slug: 'education',
      description: '',
      count: 124,
    },
    {
      id: 23,
      name: 'Education Guideline',
      slug: 'education-guideline',
      description: '',
      count: 1604,
    },
    {
      id: 37594,
      name: 'Electronics',
      slug: 'electronics',
      description: 'Get electronics related tricks in Bangla',
      count: 95,
    },
    {
      id: 25,
      name: 'Facebook tricks',
      slug: 'facebook-tricks',
      description: '',
      count: 2145,
    },
    {
      id: 58,
      name: 'Featured',
      slug: 'featured',
      description: '',
      count: 17,
    },
    {
      id: 84993,
      name: 'Freelancing',
      slug: 'freelancing',
      description: '',
      count: 38,
    },
    {
      id: 14,
      name: 'Games Review',
      slug: 'games-review',
      description: '',
      count: 1344,
    },
    {
      id: 463,
      name: 'Gp free net',
      slug: 'gp-free-net',
      description: 'You will get grameenphone free net tricks from here!',
      count: 1147,
    },
    {
      id: 86431,
      name: 'Guidelines',
      slug: 'guidelines',
      description: '',
      count: 176,
    },
    {
      id: 26,
      name: 'Hacking news',
      slug: 'hacking-news',
      description: '',
      count: 253,
    },
    {
      id: 27,
      name: 'Hacking tutorials',
      slug: 'hacking-tutorials',
      description: '',
      count: 1016,
    },
    {
      id: 29,
      name: 'Hadith &amp; Quran',
      slug: 'hadith-quran',
      description: '',
      count: 881,
    },
    {
      id: 528,
      name: 'Hot',
      slug: 'hot',
      description: '',
      count: 19,
    },
    {
      id: 20,
      name: 'Hsc Exam result',
      slug: 'hsc-exam-result',
      description: '',
      count: 84,
    },
    {
      id: 28,
      name: 'Islamic Stories',
      slug: 'islamic-stories',
      description: '',
      count: 943,
    },
    {
      id: 31,
      name: 'Java mobile',
      slug: 'java-mobile',
      description: '',
      count: 602,
    },
    {
      id: 33,
      name: 'Java programming',
      slug: 'java-programming',
      description: '',
      count: 94,
    },
    {
      id: 57057,
      name: 'JavaScript',
      slug: 'javascript',
      description: '',
      count: 48,
    },
    {
      id: 22,
      name: 'Jsc Exam result',
      slug: 'jsc-exam-result',
      description: '',
      count: 50,
    },
    {
      id: 458,
      name: 'LifeStyle',
      slug: 'lifestyle',
      description: '',
      count: 1888,
    },
    {
      id: 88988,
      name: 'Linux',
      slug: 'linux',
      description: '',
      count: 18,
    },
    {
      id: 91107,
      name: 'Mobile Banking',
      slug: 'mobile-banking',
      description: '',
      count: 69,
    },
    {
      id: 88794,
      name: 'Mobile Review',
      slug: 'mobile-review',
      description: '',
      count: 74,
    },
    {
      id: 79489,
      name: 'Movie Review',
      slug: 'movie-review',
      description: '',
      count: 239,
    },
    {
      id: 82526,
      name: 'Offers',
      slug: 'offers',
      description: '',
      count: 126,
    },
    {
      id: 835,
      name: 'Online Earning',
      slug: 'online-earning',
      description: '',
      count: 1834,
    },
    {
      id: 88987,
      name: 'Operating system',
      slug: 'operating-system',
      description: '',
      count: 22,
    },
    {
      id: 78,
      name: 'Operator News',
      slug: 'operator-news',
      description: '',
      count: 2045,
    },
    {
      id: 24,
      name: 'Pdf books',
      slug: 'pdf-books',
      description: '',
      count: 311,
    },
    {
      id: 36,
      name: 'Php',
      slug: 'php',
      description: '',
      count: 164,
    },
    {
      id: 85960,
      name: 'Promo Codes',
      slug: 'promo-codes',
      description: 'Get Latest Promo Codes Updates of Bangladeshi Businesses',
      count: 11,
    },
    {
      id: 34,
      name: 'Python programming',
      slug: 'python-programming',
      description: '',
      count: 79,
    },
    {
      id: 464,
      name: 'Robi free net',
      slug: 'robi-free-net',
      description: 'You will get robi free net tricks from here!',
      count: 390,
    },
    {
      id: 39,
      name: 'Seo tricks',
      slug: 'seo-tricks',
      description: '',
      count: 282,
    },
    {
      id: 47318,
      name: 'Sponsored Posts',
      slug: 'sponsored-posts',
      description: '',
      count: 15,
    },
    {
      id: 21,
      name: 'Ssc Exam result',
      slug: 'ssc-exam-result',
      description: '',
      count: 96,
    },
    {
      id: 32,
      name: 'Symbian Mobile',
      slug: 'symbian',
      description: '',
      count: 48,
    },
    {
      id: 6161,
      name: 'Symphony Custom Rom',
      slug: 'symphony-custom-rom',
      description: 'Here you will get symphony custom rom for your devices',
      count: 36,
    },
    {
      id: 53099,
      name: 'Tech News',
      slug: 'tech-news',
      description: '',
      count: 689,
    },
    {
      id: 77,
      name: 'Technology Updates',
      slug: 'technology-updates',
      description: '',
      count: 2266,
    },
    {
      id: 89265,
      name: 'Termux',
      slug: 'termux',
      description: '',
      count: 38,
    },
    {
      id: 15,
      name: 'Themes Review',
      slug: 'themes-review',
      description: '',
      count: 188,
    },
    {
      id: 27236,
      name: 'Tools',
      slug: 'tools',
      description: '',
      count: 789,
    },
    {
      id: 37,
      name: 'Trainer Competition',
      slug: 'trainer-competition',
      description: '',
      count: 258,
    },
    {
      id: 38,
      name: 'Trickbd Notice',
      slug: 'trickbd-notice',
      description: '',
      count: 154,
    },
    {
      id: 90081,
      name: 'Tricks',
      slug: 'tricks',
      description: '',
      count: 361,
    },
    {
      id: 1,
      name: 'Uncategorized',
      slug: 'uncategorized',
      description: '',
      count: 4749,
    },
    {
      id: 6160,
      name: 'Walton Custom Rom',
      slug: 'walton-custom-rom',
      description: 'Here you will get walton custom rom for your devices',
      count: 16,
    },
    {
      id: 40,
      name: 'Wapka',
      slug: 'wapka',
      description: '',
      count: 761,
    },
    {
      id: 48297,
      name: 'Web Development',
      slug: 'web-development',
      description: '',
      count: 478,
    },
    {
      id: 88946,
      name: 'Website',
      slug: 'website',
      description: '',
      count: 201,
    },
    {
      id: 30,
      name: 'Windows mobile',
      slug: 'windows-mobile',
      description: '',
      count: 40,
    },
    {
      id: 129,
      name: 'Windows PC',
      slug: 'windows-pc',
      description: '',
      count: 1784,
    },
    {
      id: 41,
      name: 'Wordpress',
      slug: 'wordpress',
      description: '',
      count: 896,
    },
    {
      id: 33305,
      name: 'Youtube',
      slug: 'youtube-tips',
      description: '',
      count: 532,
    },
  ];
  const recentPostTabItem = {
    id: 0.5,
    name: 'রিসেন্ট পোস্টস',
    slug: 'com.ahmedrabbi.trickbdnew-for-you',
    description: '',
    count: 0,
  };
  tabs.unshift(recentPostTabItem);
  const handleTabPress = (index) => {
    setDirection(index > activeTab ? 'right' : 'left');
    setActiveTab(index);
  };
  console.log(`Selected tab: ${tabs[activeTab].name}, ID: ${tabs[activeTab].id}`);

  return (
    <View style={styles.container}>
      <Header />
      <TabBar tabs={tabs} activeTab={activeTab} onTabPress={handleTabPress} />
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <TabContent tab={tabs[activeTab]} direction={direction} />
      </View>
    </View>
  );
};

export default Home;
const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
  },
});
const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
});
