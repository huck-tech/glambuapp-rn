import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '@theme';

export default StyleSheet.create({
  title: {
    ...Fonts.style.topic,
    paddingBottom: 20,
  },
  commentText: {
    ...Fonts.style.comments,
    paddingLeft: 10,
    flex: 1,
  },
  nameInput: {
    fontSize: Fonts.size.h4,
  },
  desc: {
    ...Fonts.style.description,
  },
  gridView: {
    margin: 0,
    paddingHorizontal: 0,
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    position: 'relative',
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 90,
    backgroundColor: Colors.btnActive,
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
});
