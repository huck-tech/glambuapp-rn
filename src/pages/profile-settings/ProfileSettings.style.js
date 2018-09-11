import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  gridView: {
    marginHorizontal: 10,
    paddingHorizontal: 0,
    paddingTop: 10,
    flex: 1,
  },
  itemContainer: {
    position: 'relative',
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 90,
    backgroundColor: '#eeeeee',
  },
  action: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    alignItems: 'flex-end',
  },
  itemImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logo: {
    height: 25,
    width: 90,
  },
});
export default style;
