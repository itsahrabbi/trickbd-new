import React, { useCallback, Suspense } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const TabCategoryPosts = React.lazy(
    () => import("@/src/screens/home/tabs/TabCategoryPosts")
);

const TabContent = ({ tab }) => {
    const AnimatedComponent = useCallback(
        () => (
            <Suspense
                fallback={
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <ActivityIndicator
                            size="small"
                            color="gray"
                            animating
                        />
                    </View>
                }
            >
                <TabCategoryPosts slug={tab.slug} />
            </Suspense>
        ),
        [tab]
    );

    return <AnimatedComponent />;
};

export default TabContent;
