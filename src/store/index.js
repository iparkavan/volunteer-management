import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import programReducer from "../features/program/programSlice";
import userProgramReducer from "../features/userprograms/userProgramSlice";
import goalsReducer from "../features/goals/goalsSlice";
import reportsReducer from "../features/reports/reportsSlice";
import helpReducer from "../features/help/helpSlice";
import userListReducer from "../features/userList/userListSlice";
import scheduleReducer from "../features/schedule/scheduleSlice";
import taskReducer from "../features/task/taskSlice";
import profileReducer from "../features/profile/profileSlice";
import feedReducer from "../features/feeds/feedSlice";
import certificateReducer from "../features/certificates/certificateSlice";
import activityReducer from "../features/activities/activitySlice";
import requestReducer from "../features/request/requestSlice";
import launchProgramReducer from "../features/launchProgram/launchProgramSlice";
import memberReducer from "../features/members/memberSlice";
import categoryReducer from "../features/category/categorySlice";
import equipmentReducer from "../component/equipmentManagement/network/equipmentSlice";
import { rtkQueryApiServices } from "../services/api";

const combinedReducer = combineReducers({
  userInfo: userReducer,
  programInfo: programReducer,
  profileInfo: profileReducer,
  userPrograms: userProgramReducer,
  goals: goalsReducer,
  reports: reportsReducer,
  help: helpReducer,
  userList: userListReducer,
  events: scheduleReducer,
  feeds: feedReducer,
  certificates: certificateReducer,
  requestList: requestReducer,
  tasks: taskReducer,
  activity: activityReducer,
  launchProgram: launchProgramReducer,
  members: memberReducer,
  category: categoryReducer,
  equipment: equipmentReducer,
  [rtkQueryApiServices.reducerPath]: rtkQueryApiServices.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === "logout") {
    //We are calling this RESET, but call what you like!
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  // [ticketsApi.reducerPath]: ticketsApi.reducer,

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware().concat(rtkQueryApiServices.middleware),
  ],
});
