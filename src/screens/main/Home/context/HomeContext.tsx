import { useCallback, useReducer, useRef } from "react";

import { Employee } from "@src/typings/Employees";
import { api, DefaultApiResponse } from "@src/util/api";
import { GET_EMPLOYEES } from "@src/util/api/constants";
import { createAsyncActions, createContainer, createReducer } from "@src/util/context";
import { TransitioningView } from "react-native-reanimated";

export type HomeContext = {
  employeesLoading: boolean;
  employeesList?: Array<Employee>;
};

const initialState: HomeContext = {
  employeesList: undefined,
  employeesLoading: true,
};

const actions = {
  employeesList: createAsyncActions("GET_EMPLOYEE_DATA"),
};

const homeReducer = createReducer<HomeContext>({
  [`${actions.employeesList.loading}`]: (state) => ({
    ...state,
    employeesLoading: true,
    employeesList: undefined,
  }),
  [`${actions.employeesList.success}`]: (state, { payload }) => ({
    ...state,
    employeesLoading: false,
    employeesList: payload.employeesList,
  }),
  [`${actions.employeesList.failure}`]: (state) => ({
    ...state,
    employeesLoading: false,
  }),
});

export const { useContext: useHome, Context: DoNowContext, Provider: HomeProvider, TestProvider } = createContainer(
  () => {
    const [state, dispatch] = useReducer(homeReducer, initialState);
    const transitionRef = useRef<TransitioningView>(null);

    const getEmployeesList = useCallback(async () => {
      dispatch(actions.employeesList.loading());

      try {
        const { data } = await api.get<DefaultApiResponse>(GET_EMPLOYEES, {});
        dispatch(
          actions.employeesList.success({
            employeesList: data.data,
          }),
        );
      } catch (e) {
        dispatch(actions.employeesList.failure());
        console.warn(e);
      }
    }, []);

    return {
      refs: {
        transitionRef,
      },
      state,
      actions: {
        getEmployeesList,
      },
    };
  },
);
export default useHome;
