import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

export default function DurationSlider({ onChange }) {
  const [interval, setInterval] = useState(1800); // default 30 min

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const hr = Math.floor(min / 60);
    const minLeft = min % 60;
    if (hr > 0) return `${hr}h ${minLeft}m`;
    return `${minLeft} min`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Update every {formatTime(interval)}</Text>
      <Slider
        style={{ width: "100%" }}
        minimumValue={1000}
        maximumValue={14400}
        step={60}
        minimumTrackTintColor="#6200EE"
        maximumTrackTintColor="#ccc"
        onValueChange={(v) => setInterval(v)}
        onSlidingComplete={onChange}
        value={interval}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  label: { textAlign: "center", fontSize: 16, marginBottom: 10 },
});
