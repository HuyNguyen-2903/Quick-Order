import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
  },
  prescriptionBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  prescriptionText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  quantityInput: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    minWidth: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
  },
});

