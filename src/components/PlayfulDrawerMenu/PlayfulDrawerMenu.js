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

const firstPinkBarPath = "M95,0 C58.4316261,16 109.899693,55 86.2425142,88.4435447 C74.8179189,104.594201 54.205553,110 40.5753888,110 C21.1307344,110 12.7228554,110 -7.10542736e-14,110 L0.462266845,0 C11.4129205,6.93969635e-29 42.9254982,6.93969635e-29 95,0 Z";

const secondPinkBarPath =
  "M177,5.68434189e-14 C263,13 283.041397,133.315162 252,182.515315 C230.428842,216.70528 186.174786,227 158.169369,227 C98.0535279,227 83.0965924,216.18759 24.057824,210.200153 C15.8236844,209.365085 6.81050933,209.654422 -5.1159077e-13,210.200153 L-5.1159077e-13,5.68434189e-14 L177,5.68434189e-14 Z";
const thirdPinkBarPath =
  "M177,5.68434189e-14 C263,13 370.16996,166.574245 298,253 C217,350 131.096592,296.18759 72.057824,290.200153 C13.0190557,284.212716 8.40127589,335.421458 -7.38964445e-13,342 L-7.38964445e-13,5.68434189e-14 L177,5.68434189e-14 Z";
const fourthPinkPanelPath =
  "M295,5.68434189e-14 C275,48 415.075043,232.431823 321,319 C226.924957,405.568177 147.096592,336.18759 88.057824,330.200153 C29.0190557,324.212716 8.40127589,358.452087 -5.96855898e-13,365.03063 L-5.96855898e-13,5.68434189e-14 L295,5.68434189e-14 Z";
const fifthPinkPanelPath =
  "M375 126.627c-19.346 9.314-33.022 30.27-41.027 62.868-12.008 48.898 1 101.787-22.014 140.705-20.526 34.708-45.784 40.8-73.79 40.8-60.115 0-91.072-34.812-150.111-40.8C29.019 324.213 8.4 358.452 0 365.03V0h375v126.627z";

const firstStepInterpolation = interpolate(firstPinkBarPath, secondPinkBarPath);
const fsecondStepInterpolation = interpolate(
  secondPinkBarPath,
  thirdPinkBarPath
);
const thirdStepInterpolation = interpolate(
  thirdPinkBarPath,
  fourthPinkPanelPath
);
const fourthStepInterpolation = interpolate(
  fourthPinkPanelPath,
  fifthPinkPanelPath
);
//const secondPanelInterpolate = interpolate(firstPinkBarPath, yellowPanelPath);

export class PlayfulDrawerMenu extends Component {
  state = {
    firstPanel: {
      path: new Animated.Value(0)
      // coordinates: new Animated.ValueXY({ x: 15, y: -173 })
    }
    isOpen: false
  };

  componentWillMount() {
    this.state.firstPanel.path.addListener(({ value }) => {
      const path = firstStepInterpolation(value);
      this._path.setNativeProps({
        d: path
      });
    });
    // this.state.secondPanel.path.addListener(({ value }) => {
    //   const path = secondPanelInterpolate(value);
    //   this._path.setNativeProps({
    //     d: path
    //   });
    // });
  }

  _handlePress = isOpen => {
    if (isOpen) {
      Animated.sequence([
        Animated.sequence([
          Animated.timing(this.state.firstPanel.path, {
            toValue: 0,
            duration: 1000
          })
          // Animated.timing(this.state.firstPanel.coordinates, {
          //   toValue: { x: 15, y: -173 }
          // })
        ])
      ]).start();
    } else {
      Animated.sequence([
        Animated.parallel([
          Animated.timing(this.state.firstPanel.path, {
            toValue: 1,
            duration: 1000
          })
          // Animated.timing(this.state.firstPanel.coordinates, {
          //   toValue: { x: 0, y: -205 }
          // })
        ])
      ]).start();
    }
    this.setState({ isOpen: !isOpen });
  };

  render() {
    return (
      <View style={styles.animView}>
        <Animated.View>
          {/* <Animated.View style={this.state.firstPanel.coordinates.getLayout()}> */}
          <Svg width="100%" height="100%" viewBox="0 0 375 812">
            <Path
              d={firstPinkBarPath}
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
