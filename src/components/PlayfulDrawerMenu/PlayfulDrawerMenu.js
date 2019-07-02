import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import Svg, { Rect, Path } from "react-native-svg";
import { interpolatePath } from "d3-interpolate-path";
import { interpolate } from "flubber";

const startPath =
  "M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z";
const endPath =
  "M375 126.627c-19.346 9.314-33.022 30.27-41.027 62.868-12.008 48.898 1 101.787-22.014 140.705-20.526 34.708-45.784 40.8-73.79 40.8-60.115 0-91.072-34.812-150.111-40.8C29.019 324.213 8.4 358.452 0 365.03V0h375v126.627z";

export class PlayfulDrawerMenu extends Component {
  state = {
    firstBar: {
      path: new Animated.Value(0),
      coordinates: new Animated.ValueXY({ x: 15, y: -173 })
    },
    isOpen: false
  };

  componentWillMount() {
    const pathInterpolate = interpolate(startPath, endPath);
    this.state.firstBar.path.addListener(({ value }) => {
      const path = pathInterpolate(value);
      this._path.setNativeProps({
        d: path
      });
    });
  }

  _handlePress = isOpen => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(this.state.firstBar.path, {
          toValue: 0,
          duration: 1000
        }),
        Animated.timing(this.state.firstBar.coordinates, {
          toValue: { x: 15, y: -173 }
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(this.state.firstBar.path, {
          toValue: 1,
          duration: 1000
        }),
        Animated.timing(this.state.firstBar.coordinates, {
          toValue: { x: 0, y: -205 }
        })
      ]).start();
    }
    this.setState({ isOpen: !isOpen });
  };
  render() {
    return (
      <View style={styles.animView}>
        <Animated.View style={this.state.firstBar.coordinates.getLayout()}>
          <Svg width="100%" height="100%" viewBox="0 0 375 381">
            <Path
              d={startPath}
              fill="#FF4D89"
              ref={path => (this._path = path)}
            />
          </Svg>
        </Animated.View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this._handlePress(this.state.isOpen)}
        >
          <Svg height={32} width={32} viewBox="0 0 32 32">
            <Path
              d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z"
              fill="white"
              stroke="white"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    );
  }
  s;
}
const styles = StyleSheet.create({
  animView: {
    height: "100%"
  },
  button: {
    top: 30,
    left: 15,
    height: 32,
    width: 32,
    position: "absolute"
  },
  text: {
    color: "black"
  }
});
