import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const PAGE_SIZE = 10;

const ProductList = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://storage.googleapis.com/mumzrn/product-list-large?page=${page}&pageSize=${PAGE_SIZE}`,
      );
      setProducts([...products, ...response.data.data.products.items]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const renderItem = ({item}) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', {product: item})}>
      <Image source={{uri: item.small_image.url}} style={styles.image} />
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.name}>
          {item.name}
        </Text>
        <Text style={styles.price}>
          {item.price.regularPrice.amount.value}{' '}
          {item.price.regularPrice.amount.currency}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading && <ActivityIndicator size="large" color="#0000ff" />
      }
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 100,
    borderRadius: 25,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'center',
    width: '80%',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
});

export default ProductList;
