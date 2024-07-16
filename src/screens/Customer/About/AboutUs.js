import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context as AboutContext} from '../../../context/AboutContext';
import {BottomTabView} from '../../../components/common/TabView';
export default function AboutUs({navigation}) {
  // const {
  //   state: {form, GetAbout},
  //   FetchAboutDetail,
  // } = useContext(AboutContext);
  // useEffect(() => {
  //   FetchAboutDetail();
  // }, []);
  const Detail = [
    {
      id: 1,
      content:
        "Service Lane Vehicle wash is a team of trained and professional operatives who are committed to giving you the best daily express car wash in the community. We focus on exceeding our customer's expectations by providing safe and superior wash using prime tools. Everybody wants their wagon to always look shine and spotless but they don't wish to give it in wrong hands so, here we are!",
    },
  ];
  // const {AboutUsDetail} = GetAbout;
  // console.log(AboutUsDetail, 'aboutus');
  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <View style={[styles.flexbox, {paddingLeft: 4}]}>
          <View style={[styles.flexbox, {paddingLeft: 4}]}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <MaterialCommunityIcons
                name="keyboard-backspace"
                color="black"
                size={30}
              />
            </TouchableOpacity>
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 22,
                  textTransform: 'uppercase',

                  fontWeight: 'bold',
                  width: Dimensions.get('window').width * 1,
                  flexShrink: 1,
                  color: '#000000',
                  paddingLeft: 20,
                  // textAlign:'center'
                }}>
                About Us
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={Detail}
          scrollEnabled={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Text style={{color: 'black',fontSize:18}}>{item.content}</Text>
          )}
        />
      </View>
      <BottomTabView navigation={navigation} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  flexbox: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginTop: 10,
    paddingLeft: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});
