import React, {useContext, useEffect, useRef, useState} from "react";
import {AntDesign} from "@expo/vector-icons";
import {Animated, Text, View} from "react-native";

import {ToastContext} from "../../providers/ToastProvider";
import cStyles from "../../configs/styles";

interface Props {
  message: string;
  onHide: () => void;
}
const Message = (props: Props) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      props.onHide();
    });
  }, []);

  return (
    <Animated.View
      style={{
        opacity: 1,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0],
            }),
          },
        ],
        margin: 10,
        marginBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ffcc00",
        padding: 10,
        borderRadius: 4,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
      }}
    >
      <AntDesign
        name="warning"
        size={20}
        style={{marginRight: 10, color: cStyles.colors.black}}
      />
      <Text
        style={{fontFamily: cStyles.fontFamily, color: cStyles.colors.black}}
      >
        {props.message}
      </Text>
    </Animated.View>
  );
};

interface ToastProps {}
export default (props: ToastProps) => {
  const {toasts, setToasts} = useContext(ToastContext);

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 45,
          left: 0,
          right: 0,
        }}
      >
        {toasts.map(toast => (
          <Message
            key={toast}
            message={toast}
            onHide={() => {
              setToasts!(toasts =>
                toasts.filter(currentToast => currentToast !== toast)
              );
            }}
          />
        ))}
      </View>
    </>
  );
};
