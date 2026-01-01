import ProductItem from '@/components/ProductItem';
import QuickOrderSummary from '@/components/QuickOrderSummary';
import productsData from '@/data/products.json';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  Product,
  selectFilteredProducts,
  setProducts,
  setSearchQuery,
  setSelectedCategory,
} from '@/store/slices/productsSlice';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './index.styles';

const CATEGORIES = ['All', 'Pain Relief', 'Antibiotic', 'Supplement', 'Allergy'];

export default function ProductsScreen() {
  const dispatch = useAppDispatch();
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const selectedCategory = useAppSelector(
    (state) => state.products.selectedCategory
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        dispatch(setProducts(productsData as Product[]));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [dispatch]);

  const handleSearch = useCallback((text: string) => {
    dispatch(setSearchQuery(text));
  }, [dispatch]);

  const handleCategoryFilter = useCallback((category: string) => {
    dispatch(setSelectedCategory(category));
  }, [dispatch]);

  const renderProductItem = useCallback(({ item }: { item: Product }) => (
    <ProductItem product={item} />
  ), []);

  const renderEmptyState = useCallback(() => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>No products found</Text>
      <Text style={styles.emptyStateSubtext}>
        Try adjusting your search or filter
      </Text>
    </View>
  ), []);

  const renderFilterChip = useCallback(({ item }: { item: string }) => {
    const isSelected = selectedCategory === item;
    return (
      <TouchableOpacity
        style={[
          styles.filterChip,
          isSelected && styles.filterChipSelected,
        ]}
        onPress={() => handleCategoryFilter(item)}
      >
        <Text
          style={[
            styles.filterChipText,
            isSelected && styles.filterChipTextSelected,
          ]}
        >
          {item}
        </Text>
      </TouchableOpacity>
    );
  }, [selectedCategory, handleCategoryFilter]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.filterContainer}>
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={renderFilterChip}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        />
      </View>
      </SafeAreaView>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyState}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
        getItemLayout={(data, index) => ({
          length: 120,
          offset: 120 * index,
          index,
        })}
      />
      <QuickOrderSummary />
    </View>
  );
}
