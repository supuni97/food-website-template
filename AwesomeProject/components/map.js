import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import { Dimensions } from 'react-native';
// import BottomNav from './components/bottom-nav';
// import { SafeAreaProvider } from 'react-native-safe-area-context';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken('pk.eyJ1Ijoic2FuZGFydTA5IiwiYSI6ImNrczc4cWFtbjJvZXoydnFtNmtrNThicXIifQ.s7R1YyvMV0-5mR5uEaAa8w');
MapboxGL.setTelemetryEnabled(false);

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [logitudeVal, setLogitudeVal] = useState(null);
  const [latitudeVal, setLatitudeVal] = useState(null);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        // position.coords.longitude = setLogitude;
        // position.coords.latitude = setLatitude;

        const { latitude, longitude } = position.coords;
        setCurrentLocation([longitude, latitude]);

        setLatitudeVal(latitude);
        setLogitudeVal(longitude);
      },
      error => {
        console.log('Error getting location:', error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000,
      }
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const deviceWidth = Dimensions.get('window').width;


  return (
    // <SafeAreaProvider>

      <View style={styles.page}>
        
        <Text>Latitude: {latitudeVal}</Text>
        <Text>Longitude: {logitudeVal}</Text>
        <Text>Current Location: {currentLocation}</Text>
        <View style={[styles.container, { width: deviceWidth }]}>


          {currentLocation && (
            <MapboxGL.MapView style={styles.map}>
              <MapboxGL.Camera
                centerCoordinate={currentLocation}
                zoomLevel={14}
                animationMode={'flyTo'}
                animationDuration={500}
                markerPosition={[currentLocation]}
                markerTitle={'Current Location'}
              />
              <MapboxGL.PointAnnotation
                id="currentLocationMarker"
                coordinate={currentLocation}
              >
                <View style={styles.annotationContainer}>
                  <View style={styles.annotationFill} />
                </View>
                <MapboxGL.Callout title="Current Location" />
              </MapboxGL.PointAnnotation>
            </MapboxGL.MapView>
          )}
          

        </View>
        
        

      </View>
      
    //   {/* <BottomNav />
    // </SafeAreaProvider> */}

  );
};

export default Map;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 600,
    width: 300,
  },
  map: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    borderRadius: 15,
  },
  annotationFill: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: 'blue',
    transform: [{ scale: 0.6 }],
  }
});
