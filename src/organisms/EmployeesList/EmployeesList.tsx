import React, { FC } from "react";
import { FlatList, StyleSheet } from "react-native";

import { EmployeeListItem } from "@molecules/EmployeeCard";
import { Employee } from "@typings/Employees";

type EmployeeListProps = {
  item: Employee;
  onItemPress: (data: Employee) => void;
};
export const ListItem = React.memo(({ item, onItemPress }: EmployeeListProps) => {
  return <EmployeeListItem key={item.id} data={item} onItemPress={onItemPress} />;
});

type DoNowListProps = {
  data?: Array<Employee>;
  refreshing?: boolean;
  onRefresh?: () => void;
  onItemPress: (data: Employee) => void;
};

export const EmployeesList: FC<DoNowListProps> = ({ data = [], refreshing, onItemPress }) => {
  return (
    <FlatList
      data={data}
      extraData={refreshing}
      contentContainerStyle={styles.container_style}
      style={styles.container}
      ListHeaderComponentStyle={styles.listHeader}
      renderItem={({ item }) => {
        return <ListItem key={item.id} item={item} onItemPress={onItemPress} />;
      }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => `${item.id}${index}`}
    />
  );
};
const styles = StyleSheet.create({
  transitionView: {
    flex: 1,
  },
  container: {
    backgroundColor: "#f3f3ef",
  },
  container_style: {
    paddingBottom: 20,
  },
  listHeader: {
    zIndex: 50,
    overflow: "visible",
    elevation: 999,
  },
});
