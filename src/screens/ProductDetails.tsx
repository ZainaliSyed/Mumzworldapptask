import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const ProductDetails = ({route}) => {
  const {product} = route.params;
  return (
    <View style={styles.container}>
      <Image source={{uri: product?.small_image.url}} style={styles.image} />
      <Text style={styles.name}>{product?.brand_info.title}</Text>
      <Text style={styles.price}>
        {product.price.regularPrice.amount.value}{' '}
        {product.price.regularPrice.amount.currency}
      </Text>
      <Text style={styles.description}>{product.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ProductDetails;
