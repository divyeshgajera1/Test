import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

const YoutbePlayer = () => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (isReady) {
    }
  }, [isReady]);
  return (
    <View>
      <YoutubeIframe
        videoId="eIc8vW9eVnY"
        height={220}
        width={380}
        play={true}
        onReady={() => setIsReady(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default YoutbePlayer;
