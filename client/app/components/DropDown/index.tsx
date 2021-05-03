import React from "react";
import {Text, View} from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import styles from "./styles";

interface IdropdownConfigs {
  visible: boolean;
  position: {x: number; y: number};
}
interface Props {
  dropDownConfig: IdropdownConfigs;
  setDropDownConfig: React.Dispatch<React.SetStateAction<IdropdownConfigs>>;
  listItems: {
    name: string;
    action: () => void;
  }[];
}

export const DropDown: React.FC<Props> = ({
  setDropDownConfig,
  listItems,
  dropDownConfig,
}: Props) => {
  const {y: top, x: left} = dropDownConfig.position;
  const width = 100;
  console.log(dropDownConfig.visible);
  return !dropDownConfig.visible ? null : (
    <View>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={styles.container}>
          <View style={[styles.menu, {top: 0, left: left - width / 2, width}]}>
            {listItems.map(item => {
              <TouchableOpacity
                key={item.name}
                style={{width, alignItems: "center", paddingTop: 5}}
                onPress={() => {
                  () => item.action;
                  setDropDownConfig({...dropDownConfig, visible: false});
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>;
            })}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
