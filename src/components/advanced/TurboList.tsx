import React, { PureComponent } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';

const ViewTypes = {
  ITEM: 0,
};

class TurboList extends PureComponent {
  constructor(props) {
    super(props);

    // Create a data provider
    this.dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    }).cloneWithRows(props.data);

    // Create a layout provider
    this.layoutProvider = new LayoutProvider(
      index => ViewTypes.ITEM,
      (type, dim) => {
        switch (type) {
          case ViewTypes.ITEM:
            dim.width = Dimensions.get('window').width;
            dim.height = 100; // Set item height, adjust as needed
            break;
          default:
            dim.width = 0;
            dim.height = 0;
            break;
        }
      }
    );

    // Bind render row
    this.rowRenderer = this.rowRenderer.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.dataProvider = this.dataProvider.cloneWithRows(this.props.data);
    }
  }

  rowRenderer(type, data) {
    const { renderItem } = this.props;
    return renderItem({ item: data });
  }

  render() {
    return (
      <View style={styles.container}>
        <RecyclerListView
          style={styles.list}
          rowRenderer={this.rowRenderer}
          dataProvider={this.dataProvider}
          layoutProvider={this.layoutProvider}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

export default TurboList;
