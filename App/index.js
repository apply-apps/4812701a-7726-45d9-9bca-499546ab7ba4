// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Text, TextInput, Button, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const [hero, setHero] = useState('');
  const [villain, setVillain] = useState('');
  const [plot, setPlot] = useState('');
  const [story, setStory] = useState('');

  const generateStory = async () => {
    const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';
    const requestData = {
      messages: [
        { role: 'system', content: 'You are a helpful assistant. Please generate a fairy tale based on given hero, villain, and plot.' },
        { role: 'user', content: `Hero: ${hero}, Villain: ${villain}, Plot: ${plot}` }
      ],
      model: 'gpt-4o'
    };
    
    try {
      const response = await axios.post(API_URL, requestData);
      setStory(response.data.response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Fairy Tale Generator</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Hero Name"
          value={hero}
          onChangeText={text => setHero(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Villain Name"
          value={villain}
          onChangeText={text => setVillain(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Plot"
          value={plot}
          onChangeText={text => setPlot(text)}
        />
        <Button
          title="Generate Story"
          onPress={generateStory}
        />
        <View style={styles.storyContainer}>
          <Text style={styles.storyText}>{story}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#f3f4f6',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  storyContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  storyText: {
    fontSize: 16,
  },
});