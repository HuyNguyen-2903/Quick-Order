import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addToCart,
  removeFromCart,
  selectCartItemQuantity,
  setQuantity,
} from '@/store/slices/cartSlice';
import { Product } from '@/store/slices/productsSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './ProductItem.styles';

interface ProductItemProps {
  product: Product;
}

function ProductItem({ product }: ProductItemProps) {
  const dispatch = useAppDispatch();
  const quantity = useAppSelector((state) =>
    selectCartItemQuantity(state, product.id)
  );
  const [inputValue, setInputValue] = useState(quantity.toString());

  useEffect(() => {
    setInputValue(quantity.toString());
  }, [quantity]);

  const handleQuantityChange = useCallback((text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setInputValue(numericValue);
  }, []);

  const handleQuantityBlur = useCallback(() => {
    const numValue = parseInt(inputValue, 10) || 0;
    let finalValue = numValue;

    if (numValue < 0) {
      finalValue = 0;
    } else if (numValue > 99) {
      finalValue = 99;
    }

    setInputValue(finalValue.toString());
    dispatch(setQuantity({ productId: product.id, quantity: finalValue }));
  }, [dispatch, product.id, inputValue]);

  const handleDecrement = useCallback(() => {
    dispatch(removeFromCart(product.id));
  }, [dispatch, product.id]);

  const handleIncrement = useCallback(() => {
    dispatch(addToCart(product.id));
  }, [dispatch, product.id]);

  return (
    <View style={styles.productCard}>
      <View style={styles.productHeader}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.productMeta}>
            <Text style={styles.productCategory}>{product.category}</Text>
            {product.isPrescription && (
              <View style={styles.prescriptionBadge}>
                <Text style={styles.prescriptionText}>Rx</Text>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.productPrice}>
          {product.price.toLocaleString('vi-VN')} ₫
        </Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={[styles.quantityButton, quantity === 0 && styles.buttonDisabled]}
          onPress={handleDecrement}
          disabled={quantity === 0}
        >
          <Text style={styles.quantityButtonText}>−</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.quantityInput}
          value={inputValue}
          onChangeText={handleQuantityChange}
          onBlur={handleQuantityBlur}
          keyboardType="numeric"
          maxLength={2}
          selectTextOnFocus
        />
        <TouchableOpacity
          style={[styles.quantityButton, quantity >= 99 && styles.buttonDisabled]}
          onPress={handleIncrement}
          disabled={quantity >= 99}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(ProductItem);

