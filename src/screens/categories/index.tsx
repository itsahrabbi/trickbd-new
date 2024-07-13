import React from 'react';
import { SafeAreaView } from 'react-native';
import CategoryList from './components/CategoryList';
import Header from '@/src/components/partials/Header';

export default function Categories() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <CategoryList />
    </SafeAreaView>
  );
}
