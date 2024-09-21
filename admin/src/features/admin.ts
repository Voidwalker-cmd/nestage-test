import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../utils/libs";
import * as Types from "../types";

export const checkAuth = createAsyncThunk<
  Types.AuthResponse,
  void,
  { rejectValue: Types.ErrorResponse }
>("admin/check-auth", async (_, thunkAPI) => {
  try {
    // Axios.defaults.headers.common["Content-Type"] = "application/json";
    // Axios.defaults.headers.common["Authorization"] = `Bearer ${ER()}`;
    const { data } = await Axios.post<Types.AuthResponse>("check-auth");
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      Axios.get("logout");
      window.location.replace("/");
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
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        window.location.replace("/");
      }
      return thunkAPI.rejectWithValue(errors);
    }
  }
  Axios.get("logout");
  window.location.replace("/");
});

export const Login = createAsyncThunk<
  Types.AuthResponse,
  Types.loginParams,
  { rejectValue: Types.ErrorResponse }
>("admin/login", async ({ username, password }, thunkAPI) => {
  try {
    const body = { username, password };
    const { data } = await Axios.post<Types.AuthResponse>("login", body);
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      Axios.get("logout");
      window.location.replace("/");
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
>("admin/get-pay", async ({ address }, thunkAPI) => {
  try {
    const { data } = await Axios.get<Types.PayResponse>(
      `admin/level2?address=${address}`
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
      Axios.get("logout");
      window.location.replace("/");
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
  void,
  { rejectValue: Types.ErrorResponse }
>("admin/get-admin-wallets", async (_, thunkAPI) => {
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
      Axios.get("logout");
      window.location.replace("/");
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

export const getAllReferrals = createAsyncThunk<
  Types.RefDetails[],
  void,
  { rejectValue: Types.ErrorResponse }
>("admin/get-all-referrals", async (_, thunkAPI) => {
  try {
    const { data } = await Axios.get<Types.RefDetails[]>(
      `admin/get-all-referral`
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
      Axios.get("logout");
      window.location.replace("/");
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

export const changeAdminAddress = createAsyncThunk<
  Types.changeAdminAddressResponse,
  Types.changeAdminAddressParams,
  { rejectValue: Types.ErrorResponse }
>(
  "admin/changer-password",
  async ({ address, currentAddress, type }, thunkAPI) => {
    try {
      const body = { address, currentAddress, type };
      const { data } = await Axios.put<Types.changeAdminAddressResponse>(
        `update-admin-address`,
        body
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
        Axios.get("logout");
        window.location.replace("/");
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
  }
);

export const changePassword = createAsyncThunk<
  string,
  Types.changePasswordParams,
  { rejectValue: Types.ErrorResponse }
>(
  "admin/change-admin-address",
  async ({ newPassword, currentPassword }, thunkAPI) => {
    try {
      const body = { newPassword, currentPassword };
      const { data } = await Axios.post<string>(`admin/password`, body);
      return data;
    } catch (err) {
      const error = err as Types.ExtendedError;
      if (error?.response?.status === 403) {
        const errors: Types.ErrorResponse = {
          status: error?.response?.status,
          statusText: error?.response?.statusText.toUpperCase(),
          detail: null,
        };
        Axios.get("logout");
        window.location.replace("/");
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
  }
);

type PingResponse = { message: string };

export const pingServer = createAsyncThunk<
  PingResponse,
  void,
  { rejectValue: Types.ErrorResponse }
>("admin/ping-server", async (_, thunkAPI) => {
  try {
    const { data } = await Axios.get<PingResponse>(`ping`);
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      Axios.get("logout");
      window.location.replace("/");
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

export const getUsers = createAsyncThunk<
  Types.getUsersResponse,
  void,
  { rejectValue: Types.ErrorResponse }
>("admin/get-users", async (_, thunkAPI) => {
  try {
    const { data } = await Axios.get<Types.getUsersResponse>(`get-all-users`);
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      Axios.get("logout");
      window.location.replace("/");
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

export const sendNoti = createAsyncThunk<
  Types.sendNotiResponse[],
  Types.sendNotiParams,
  { rejectValue: Types.ErrorResponse }
>("admin/save-noti", async ({ users, type, title, text }, thunkAPI) => {
  try {
    const d = { users, type, title, text };
    const { data } = await Axios.post<Types.sendNotiResponse[]>(`save-noti`, {
      d,
    });
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      Axios.get("logout");
      window.location.replace("/");
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

export const getNoti = createAsyncThunk<
  Types.sendNotiResponse[],
  void,
  { rejectValue: Types.ErrorResponse }
>("admin/get-noti", async (_, thunkAPI) => {
  try {
    const { data } = await Axios.get<Types.sendNotiResponse[]>(`get-all-noti`);
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      Axios.get("logout");
      window.location.replace("/");
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

export const getStats = createAsyncThunk<
  Types.getStatsResponse[],
  void,
  { rejectValue: Types.ErrorResponse }
>("admin/get-stats", async (_, thunkAPI) => {
  try {
    const { data } = await Axios.get<Types.getStatsResponse[]>(`get-all-stats`);
    return data;
  } catch (err) {
    const error = err as Types.ExtendedError;
    if (error?.response?.status === 403) {
      const errors: Types.ErrorResponse = {
        status: error?.response?.status,
        statusText: error?.response?.statusText.toUpperCase(),
        detail: null,
      };
      Axios.get("logout");
      window.location.replace("/");
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

const initialState: Types.initialStateMain = {
  loading: !!0,
  regLoading: !!0,
  isAuthenticated: !!0,
  details: {},
  users: [],
  stats: [],
  noti: [],
  error: !!0,
  lvlTwoTotal: 0,

  adminWallets: {
    admin: "",
    refAdmin: "",
  },
  allRefs: [] as Types.RefDetails[],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    justAction: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStats.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.loading = !!0;
        state.stats = [...action.payload];
      })
      .addCase(getStats.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        state.isAuthenticated = !!0;
      })
      .addCase(sendNoti.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(sendNoti.fulfilled, (state, action) => {
        state.loading = !!0;
        state.noti = action.payload;
      })
      .addCase(sendNoti.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        state.isAuthenticated = !!0;
      })
      .addCase(getNoti.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(getNoti.fulfilled, (state, action) => {
        state.loading = !!0;
        state.noti = [...action.payload];
      })
      .addCase(getNoti.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        state.isAuthenticated = !!0;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = !!0;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        state.isAuthenticated = !!0;
      })
      .addCase(getAllReferrals.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(getAllReferrals.fulfilled, (state, action) => {
        state.loading = !!0;
        state.allRefs = action.payload;
      })
      .addCase(getAllReferrals.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        state.isAuthenticated = !!0;
      })
      .addCase(changeAdminAddress.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(changeAdminAddress.fulfilled, (state, action) => {
        state.loading = !!0;
        state.adminWallets[action.payload.type] = action.payload
          .address as string;
      })
      .addCase(changeAdminAddress.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        state.isAuthenticated = !!0;
      })
      .addCase(getWallets.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(getWallets.fulfilled, (state, action) => {
        state.loading = !!0;
        state.adminWallets.admin = action.payload.admin.address as string;
        state.adminWallets.refAdmin = action.payload.refAdmin.address as string;
      })
      .addCase(getWallets.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        state.isAuthenticated = !!0;
      })
      .addCase(getPay.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(getPay.fulfilled, (state, action) => {
        state.loading = !!0;
        state.lvlTwoTotal = action.payload.total;
      })
      .addCase(getPay.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        state.isAuthenticated = !!0;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = !!1;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.loading = !!0;
        // state.details = DD(action.payload.response);
        state.isAuthenticated = !!1;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = !!0;
        // state.error = !!1;
        state.isAuthenticated = !!0;
      });
  },
});

export const { justAction } = adminSlice.actions;
export default adminSlice.reducer;
