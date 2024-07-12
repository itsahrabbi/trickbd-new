import React, { useCallback, Suspense } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Animated, { SlideInRight, SlideInLeft } from 'react-native-reanimated';

const TabCategoryPosts = React.lazy(() => import('@/src/screens/home/tabs/TabCategoryPosts'));

const TabContent = ({ tab, direction }) => {
  const AnimatedComponent = useCallback(
    () => (
      <Animated.View
        entering={direction === 'right' ? SlideInRight.duration(500) : SlideInLeft.duration(500)}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View>
          <Suspense fallback={<ActivityIndicator size="small" color="gray" animating />}>
            <TabCategoryPosts slug={tab.slug} />
          </Suspense>
        </View>
      </Animated.View>
    ),
    [tab, direction]
  );

  return <AnimatedComponent />;
};

export default TabContent;
