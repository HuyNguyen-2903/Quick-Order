import { useAppSelector } from '@/store/hooks';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './QuickOrderSummary.styles';

function QuickOrderSummary() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const products = useAppSelector((state) => state.products.items);

  let totalSKUs = cartItems.length;
  let totalQuantity = 0;
  let totalAmount = 0;

  cartItems.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    if (product) {
      totalQuantity += cartItem.quantity;
      totalAmount += product.price * cartItem.quantity;
    }
  });

  if (totalSKUs === 0) {
    return null;
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.summaryContainer}>
      <View style={styles.summaryContent}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>SKUs:</Text>
          <Text style={styles.summaryValue}>{totalSKUs}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Quantity:</Text>
          <Text style={styles.summaryValue}>{totalQuantity}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total:</Text>
          <Text style={styles.summaryTotal}>
            {totalAmount.toLocaleString('vi-VN')} ₫
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(QuickOrderSummary);

