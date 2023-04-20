import React, { FC, useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "@atom/Text";
import { Touch } from "@atom/Touch";
import { Employee } from "@src/typings/Employees";
import { Card } from "react-native-elements";

type AlbumListItemProps = {
  data: Employee;
  onItemPress: (data: Employee) => void;
};
export const EmployeeListItem: FC<AlbumListItemProps> = ({ data, onItemPress }) => {
  const onPress = useCallback(() => {
    onItemPress(data);
  }, [data, onItemPress]);

  return (
    <Touch onPress={onPress}>
      <Card>
        <View style={styles.row}>
          <Text>Employee Name</Text>
          <Text style={styles.bold}>{data?.employee_name}</Text>
        </View>
        <View style={styles.row}>
          <Text>Employee Age</Text>
          <Text style={styles.bold}>{data?.employee_age}</Text>
        </View>
        <View style={styles.row}>
          <Text>Employee Salary</Text>
          <Text style={styles.bold}>{data?.employee_salary}</Text>
        </View>
      </Card>
    </Touch>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#eee",
    marginBottom: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  bold: {
    fontWeight: "bold",
  },
});
