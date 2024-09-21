import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Types from "../types";
import { Axios } from "../config/utils";
import { API_URL } from "../config";
import axios from "axios";

export const addNewRef = createAsyncThunk<
  Types.RefResponse,
  Types.AddNewRefParams,
  { rejectValue: Types.ErrorResponse }
>("client/add-new-ref", async ({ uuid, walletId, referralCode }, thunkAPI) => {
  const infos = { uuid, walletId, referralCode };
  try {
    // Axios.defaults.headers.common["Content-Type"] = "application/json";
    // Axios.defaults.headers.common["Authorization"] = `Bearer ${ER()}`;
    const { data } = await Axios.post<Types.RefResponse>("add-new-ref", infos);
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.response?.status === 400) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: error?.response?.data,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.message === "Network Error") {
      const errors: Types.ErrorResponse = {
        status: 0,
        statusText: null,
        detail:
          "Unable to process your request, We are working to fix this issue.",
      };
      return thunkAPI.rejectWithValue(errors);
    } else {
      const errors: Types.ErrorResponse = {
        status: null,
        statusText: null,
        detail: error?.response?.data,
      };
      if (error?.response?.status === 302) {
        window.location.replace("/");
      }
      return thunkAPI.rejectWithValue(errors);
    }
  }
});

export const removeRef = createAsyncThunk<
  string,
  Types.removeRefParams,
  { rejectValue: Types.ErrorResponse }
>("client/remove-ref", async ({ id }, thunkAPI) => {
  try {
    // Axios.defaults.headers.common["Content-Type"] = "application/json";
    // Axios.defaults.headers.common["Authorization"] = `Bearer ${ER()}`;
    const { data } = await Axios.delete<string>(`referral/${id}`);
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.response?.status === 400) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: error?.response?.data,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.message === "Network Error") {
      const errors: Types.ErrorResponse = {
        status: 0,
        statusText: null,
        detail:
          "Unable to process your request, We are working to fix this issue.",
      };
      return thunkAPI.rejectWithValue(errors);
    } else {
      const errors: Types.ErrorResponse = {
        status: null,
        statusText: null,
        detail: error?.response?.data,
      };
      if (error?.response?.status === 302) {
        window.location.replace("/");
      }
      return thunkAPI.rejectWithValue(errors);
    }
  }
});

export const getRef = createAsyncThunk<
  Types.getRefResponse,
  Types.getSelfRefParams,
  { rejectValue: Types.ErrorResponse }
>("client/get-ref", async ({ address }, thunkAPI) => {
  try {
    // Axios.defaults.headers.common["Content-Type"] = "application/json";
    // Axios.defaults.headers.common["Authorization"] = `Bearer ${ER()}`;
    const { data } = await Axios.get<Types.getRefResponse>(
      `get-referral?ref=${address}`
    );
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.response?.status === 400) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: error?.response?.data,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.message === "Network Error") {
      const errors: Types.ErrorResponse = {
        status: 0,
        statusText: null,
        detail:
          "Unable to process your request, We are working to fix this issue.",
      };
      return thunkAPI.rejectWithValue(errors);
    } else {
      const errors: Types.ErrorResponse = {
        status: null,
        statusText: null,
        detail: error?.response?.data,
      };
      if (error?.response?.status === 302) {
        window.location.replace("/");
      }
      return thunkAPI.rejectWithValue(errors);
    }
  }
});

export const getWallets = createAsyncThunk<
  Types.adminWalletResponse,
  Types.blankParams,
  { rejectValue: Types.ErrorResponse }
>("client/get-admin-wallets", async ({ blank }, thunkAPI) => {
  try {
    const { data } = await Axios.get<Types.adminWalletResponse>(
      `admin-address`
    );
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.response?.status === 400) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: error?.response?.data,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.message === "Network Error") {
      const errors: Types.ErrorResponse = {
        status: 0,
        statusText: null,
        detail:
          "Unable to process your request, We are working to fix this issue.",
      };
      return thunkAPI.rejectWithValue(errors);
    } else {
      const errors: Types.ErrorResponse = {
        status: null,
        statusText: null,
        detail: error?.response?.data,
      };
      if (error?.response?.status === 302) {
        window.location.replace("/");
      }
      return thunkAPI.rejectWithValue(errors);
    }
  }
});

export const createRefs = createAsyncThunk<
  Types.createRefResponse,
  Types.createRefParams,
  { rejectValue: Types.ErrorResponse }
>("client/get-create-ref", async ({ selfAddress, code }, thunkAPI) => {
  try {
    const infos = { selfAddress, code };

    const { data } = await Axios.post<Types.createRefResponse>(
      "referral",
      infos
      // {
      //   transformRequest: () => infos,
      // }
    );

    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.response?.status === 400) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: error?.response?.data,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.message === "Network Error") {
      const errors: Types.ErrorResponse = {
        status: 0,
        statusText: null,
        detail:
          "Unable to process your request, We are working to fix this issue.",
      };
      return thunkAPI.rejectWithValue(errors);
    } else {
      const errors: Types.ErrorResponse = {
        status: null,
        statusText: null,
        detail: error?.response?.data,
      };
      if (error?.response?.status === 302) {
        window.location.replace("/");
      }
      return thunkAPI.rejectWithValue(errors);
    }
  }
});

export const createUser = createAsyncThunk<
  Types.createUserResponse,
  Types.createUserParams,
  { rejectValue: Types.ErrorResponse }
>("client/create-user", async ({ selfAddress }, thunkAPI) => {
  try {
    const infos = { address: selfAddress };
    const { data } = await Axios.post<Types.createUserResponse>(`user`, infos);
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.response?.status === 400) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: error?.response?.data,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.message === "Network Error") {
      const errors: Types.ErrorResponse = {
        status: 0,
        statusText: null,
        detail:
          "Unable to process your request, We are working to fix this issue.",
      };
      return thunkAPI.rejectWithValue(errors);
    } else {
      const errors: Types.ErrorResponse = {
        status: null,
        statusText: null,
        detail: error?.response?.data,
      };
      if (error?.response?.status === 302) {
        window.location.replace("/");
      }
      return thunkAPI.rejectWithValue(errors);
    }
  }
});

export const getUser = createAsyncThunk<
  Types.createUserResponse,
  Types.createUserParams,
  { rejectValue: Types.ErrorResponse }
>("client/get-user", async ({ selfAddress }, thunkAPI) => {
  try {
    const { data } = await Axios.get<Types.createUserResponse>(
      `user?address=${selfAddress}`
    );
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.response?.status === 400) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: error?.response?.data,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.message === "Network Error") {
      const errors: Types.ErrorResponse = {
        status: 0,
        statusText: null,
        detail:
          "Unable to process your request, We are working to fix this issue.",
      };
      return thunkAPI.rejectWithValue(errors);
    } else {
      const errors: Types.ErrorResponse = {
        status: null,
        statusText: null,
        detail: error?.response?.data,
      };
      if (error?.response?.status === 302) {
        window.location.replace("/");
      }
      return thunkAPI.rejectWithValue(errors);
    }
  }
});

export const createPay = createAsyncThunk<
  number,
  Types.createPayParams,
  { rejectValue: Types.ErrorResponse }
>("client/create-pay", async ({ address, amount }, thunkAPI) => {
  try {
    const infos = { address, amount };
    const { data } = await Axios.post<number>(`referral/pay`, infos);
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.response?.status === 400) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: error?.response?.data,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.message === "Network Error") {
      const errors: Types.ErrorResponse = {
        status: 0,
        statusText: null,
        detail:
          "Unable to process your request, We are working to fix this issue.",
      };
      return thunkAPI.rejectWithValue(errors);
    } else {
      const errors: Types.ErrorResponse = {
        status: null,
        statusText: null,
        detail: error?.response?.data,
      };
      if (error?.response?.status === 302) {
        window.location.replace("/");
      }
      return thunkAPI.rejectWithValue(errors);
    }
  }
});

export const getPay = createAsyncThunk<
  Types.PayResponse,
  Types.getPayParams,
  { rejectValue: Types.ErrorResponse }
>("client/get-pay", async ({ address }, thunkAPI) => {
  try {
    const { data } = await Axios.get<Types.PayResponse>(
      `referral/pay?address=${address}`
    );
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.response?.status === 400) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: error?.response?.data,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.message === "Network Error") {
      const errors: Types.ErrorResponse = {
        status: 0,
        statusText: null,
        detail:
          "Unable to process your request, We are working to fix this issue.",
      };
      return thunkAPI.rejectWithValue(errors);
    } else {
      const errors: Types.ErrorResponse = {
        status: null,
        statusText: null,
        detail: error?.response?.data,
      };
      if (error?.response?.status === 302) {
        window.location.replace("/");
      }
      return thunkAPI.rejectWithValue(errors);
    }
  }
});

export const setTransactionState = createAsyncThunk<
  string,
  { state: string },
  { rejectValue: { message: string } }
>("client/set-tranaction-state", async ({ state }, thunkAPI) => {
  const stateTypes = [
    "init",
    "initializing",
    "approving",
    "approved",
    "paying",
    "payed",
  ];
  if (stateTypes.includes(state)) {
    return state;
  } else {
    return thunkAPI.rejectWithValue({ message: "failed" });
  }
});

export const setCheckState = createAsyncThunk<
  string,
  { state: string },
  { rejectValue: { message: string } }
>("client/set-check-state", async ({ state }, thunkAPI) => {
  const stateTypes = ["loading"];
  if (stateTypes.includes(state)) {
    return state;
  } else {
    return thunkAPI.rejectWithValue({ message: "failed" });
  }
});

export const saveReferral = createAsyncThunk<
  Types.SaveReferralresponse,
  { refValue: string },
  { rejectValue: Types.ErrorResponse }
>("client/save-referral", async ({ refValue }, thunkAPI) => {
  try {
    // const { data } = await Axios.get<Types.SaveReferralresponse>(
    //   `get-ref?ref=${refValue}`
    // );
    const url = `${API_URL}get-ref?ref=${refValue}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Types.SaveReferralresponse = await response.json();
    return data;
  } catch (err) {
    refValue && localStorage.setItem("ref", refValue);
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.response?.status === 400) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: error?.response?.data,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.message === "Network Error") {
      const errors: Types.ErrorResponse = {
        status: 0,
        statusText: null,
        detail:
          "Unable to process your request, We are working to fix this issue.",
      };
      return thunkAPI.rejectWithValue(errors);
    } else {
      const errors: Types.ErrorResponse = {
        status: null,
        statusText: null,
        detail: error?.response?.data,
      };
      if (error?.response?.status === 302) {
        window.location.replace("/");
      }
      return thunkAPI.rejectWithValue(errors);
    }
  }
});

export const getNotifications = createAsyncThunk<
  Types.getNotificationsResponse,
  Types.getNotificationsParams,
  { rejectValue: Types.ErrorResponse }
>("client/get-notifications", async ({ userId }, thunkAPI) => {
  try {
    const { data } = await Axios.get<Types.getNotificationsResponse>(
      `get-noti?user=${userId}`
    );
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.response?.status === 400) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: error?.response?.data,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.message === "Network Error") {
      const errors: Types.ErrorResponse = {
        status: 0,
        statusText: null,
        detail:
          "Unable to process your request, We are working to fix this issue.",
      };
      return thunkAPI.rejectWithValue(errors);
    } else {
      const errors: Types.ErrorResponse = {
        status: null,
        statusText: null,
        detail: error?.response?.data,
      };
      if (error?.response?.status === 302) {
        window.location.replace("/");
      }
      return thunkAPI.rejectWithValue(errors);
    }
  }
});

export const saveStat = createAsyncThunk<
  string,
  Types.saveStatParams,
  { rejectValue: Types.ErrorResponse }
>("client/get-stat", async ({ type, amount }, thunkAPI) => {
  try {
    const d = { type, amount };
    const { data } = await Axios.post<string>(`save-stat`, d);
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.response?.status === 400) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: error?.response?.data,
      };
      return thunkAPI.rejectWithValue(errors);
    } else if (error?.message === "Network Error") {
      const errors: Types.ErrorResponse = {
        status: 0,
        statusText: null,
        detail:
          "Unable to process your request, We are working to fix this issue.",
      };
      return thunkAPI.rejectWithValue(errors);
    } else {
      const errors: Types.ErrorResponse = {
        status: null,
        statusText: null,
        detail: error?.response?.data,
      };
      if (error?.response?.status === 302) {
        window.location.replace("/");
      }
      return thunkAPI.rejectWithValue(errors);
    }
  }
});

export interface ClientState {
  loading: boolean;
  transactionState: string;
  regLoading: boolean;
  checkState: string;
  checkFailed: boolean;
  checkState2: string;
  checkFailed2: boolean;
  isAuthenticated: boolean;
  error: boolean;
  userId: number | null;
  notifications: Types.getNotificationsResponse;
  total: { levelTwo: { total: number } };
  userRef: Types.createRefResponse | Types.getRefResponse;
  adminWallet: Types.adminWalletRes;
}

const initialState: ClientState = {
  loading: !!0,
  regLoading: !!0,
  transactionState: "init",
  checkState: "init",
  checkFailed: !!0,
  checkState2: "init",
  checkFailed2: !!0,
  isAuthenticated: !!0,
  error: !!0,
  adminWallet: { admin: "", refAdmin: "" },
  userId: null,
  notifications: [],
  total: {
    levelTwo: {
      total: 0,
    },
  },
  userRef: {
    id: 0,
    address: "",
    uplinkId: 0,
    upline: 0,
    uplines: [],
    code: "",
    uplineCode: null,
    downlines: {
      firstLevel: 0,
      secondLevel: 0,
      thirdLevel: 0,
    },
    userID: 0,
  },
};

const fallBackRefData = {
  id: 0,
  address: "",
  uplinkId: 0,
  upline: 0,
  uplines: [],
  code: "",
  uplineCode: null,
  downlines: {
    firstLevel: 0,
    secondLevel: 0,
    thirdLevel: 0,
  },
  userID: 0,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    justAction: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = !!0;
        state.notifications = action.payload;
        // state.isAuthenticated = !!1;
      })
      .addCase(getNotifications.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        // state.isAuthenticated = !!0;
      })
      .addCase(setCheckState.pending, (state) => {
        state.checkState = "pending";
      })
      .addCase(setCheckState.fulfilled, (state) => {
        state.checkState = "done";
        state.checkFailed = !!0;
      })
      .addCase(setCheckState.rejected, (state) => {
        state.checkState = "failed";
        state.checkFailed = !!1;
      })
      .addCase(setTransactionState.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(setTransactionState.fulfilled, (state, action) => {
        state.loading = !!0;
        state.transactionState = action.payload;
        // state.isAuthenticated = !!1;
      })
      .addCase(setTransactionState.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        // state.isAuthenticated = !!0;
      })
      .addCase(getPay.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(getPay.fulfilled, (state, action) => {
        state.loading = !!0;
        state.total.levelTwo.total = action.payload.total;
        // state.isAuthenticated = !!1;
      })
      .addCase(getPay.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        // state.isAuthenticated = !!0;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = !!0;
        // alert(action.payload.id);
        state.userId = action.payload.id;
        // state.isAuthenticated = !!1;
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        // state.isAuthenticated = !!0;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = !!0;
        state.userId = action.payload.id;
        // state.isAuthenticated = !!1;
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        // state.isAuthenticated = !!0;
      })
      .addCase(removeRef.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(removeRef.fulfilled, (state) => {
        state.loading = !!0;
        state.userRef = fallBackRefData;
        // state.isAuthenticated = !!1;
      })
      .addCase(removeRef.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        // state.isAuthenticated = !!0;
      })
      .addCase(createRefs.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(createRefs.fulfilled, (state, action) => {
        state.loading = !!0;
        state.userRef = { ...state.userRef, ...action.payload };
        // state.isAuthenticated = !!1;
      })
      .addCase(createRefs.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        // state.isAuthenticated = !!0;
      })
      .addCase(getRef.pending, (state) => {
        state.loading = !!1;
        state.checkState2 = "pending";
      })
      .addCase(getRef.fulfilled, (state, action) => {
        state.loading = !!0;
        state.userRef = action.payload;
        state.checkState2 = "done";
        state.checkFailed2 = !!0;
        // state.isAuthenticated = !!1;
      })
      .addCase(getRef.rejected, (state) => {
        state.loading = !!0;
        state.checkState2 = "failed";
        state.checkFailed2 = !!1;
        // state.error = !!1;
        // state.isAuthenticated = !!0;
      })
      .addCase(getWallets.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(getWallets.fulfilled, (state, action) => {
        state.loading = !!0;
        state.adminWallet.admin = action.payload.admin.address || "";
        state.adminWallet.refAdmin = action.payload.refAdmin.address || "";
        // state.isAuthenticated = !!1;
      })
      .addCase(getWallets.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        // state.isAuthenticated = !!0;
      })
      .addCase(addNewRef.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(addNewRef.fulfilled, (state) => {
        state.loading = !!0;
        // state.details = DD(action.payload.response);
        // state.isAuthenticated = !!1;
      })
      .addCase(addNewRef.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        // state.isAuthenticated = !!0;
      });
  },
});

export const { justAction } = clientSlice.actions;
export default clientSlice.reducer;
