import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Card, Title } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

export default function Currency() {
  const [items, setItems] = useState('');

  const renderItem = ({ item }) => {
    return (
      <Card style={styles.card}>
        <Card.Cover source={{ uri: item.image }} />
        <Card.Content>
          <Title>
            1 {item.currency} = ${item.exchangeRate}
          </Title>
        </Card.Content>
      </Card>
    );
  };

  const getDetails = async () => {
    const querySnap = await firestore().collection('exchange').get();
    const result = querySnap.docs.map((docSnap) => docSnap.data());
    setItems(result);
  };

  useEffect(() => {
    getDetails();
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  btn: {
    alignSelf: 'center',
  },
  card: {
    marginTop: 10,
  },
});
