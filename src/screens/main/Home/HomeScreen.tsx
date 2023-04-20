import React, { useCallback, useEffect } from "react";

import { FullPageLoader } from "@molecules/FullPageLoader";
import { Screen } from "@molecules/Screen";
import { Employee } from "@typings/Employees";

import { EmployeesList } from "../../../organisms/EmployeesList";

import { useHome } from "./context/HomeContext";

export const HomeScreen: React.FC = () => {
  const {
    state: { employeesList, employeesLoading },
    actions: { getEmployeesList },
  } = useHome();

  useEffect(() => {
    getEmployeesList();
  }, [getEmployeesList]);

  useEffect(() => {
    //do some task
  }, []);

  const onItemPress = useCallback((item: Employee) => {
    console.info(item.employee_name);
  }, []);

  if (employeesLoading) {
    return <FullPageLoader />;
  }
  return (
    <Screen
      headerProps={{
        title: "Home",
      }}>
      <EmployeesList data={employeesList} onItemPress={onItemPress} />
    </Screen>
  );
};
