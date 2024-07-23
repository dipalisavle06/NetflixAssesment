import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle the search
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Please enter a search term');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchQuery}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      Alert.alert('Error', 'Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };

  // Function to render each item in the search results
  const renderSearchItem = ({ item }) => (
    <ImageBackground
      style={styles.movieBanner}
      resizeMode='cover'
      source={{ uri: item.show.image?.original || 'https://via.placeholder.com/500x700' }}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.show.name}</Text>
      </View>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a show..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch} // Execute search on pressing enter key
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#E50914" style={styles.loader} />
      ) : (
        <FlatList
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          horizontal
          data={searchResults}
          renderItem={renderSearchItem}
          keyExtractor={(item) => item.show.id.toString()}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>No results found</Text>}
        />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1c1c1c',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 8,
    color: '#FFF',
    paddingHorizontal: 10,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  movieBanner: {
    width: responsiveWidth(100),
    height: responsiveHeight(70),
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  overlay: {
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
  emptyText: {
    color: '#CCC',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
