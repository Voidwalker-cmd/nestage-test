import { RiLockPasswordLine, RiUserLine } from "@remixicon/react";
import { TextInput, Button } from "@tremor/react";
import { useEffect, useState } from "react";
import { SITE_URL } from "../config";
import { Login, pingServer } from "../features/admin";
import { useDispatch } from "../hooks";
import { Toast } from "../utils/libs";
import { useNavigate } from "react-router-dom";

const initData = {
  username: "",
  password: "",
};

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(initData);
  const [usernameError, setUsernameError] = useState(!!0);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState("");
  const [passwordError, setPasswordError] = useState(!!0);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [loading, setLoading] = useState(!!0);
  const [loadingText, setLoadingText] = useState("");
  const [serverPinged, setServerPing] = useState<boolean>(!!0);

  const { username, password } = data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    setLoading(!!1);
    setLoadingText("Validating...");

    e.preventDefault();
    // reset errors
    setUsernameError(!!0);
    setPasswordError(!!0);

    if (username.length < 1 || password.length < 1) {
      if (username.length < 1) {
        setUsernameError(!!1);
        setUsernameErrorMsg("Please enter your login Username.");
        setLoading(!!0);
        setLoadingText("");
      }
      if (password.length < 1) {
        setPasswordError(!!1);
        setPasswordErrorMsg("Please enter your login Password.");
        setLoading(!!0);
        setLoadingText("");
      }
      return 0;
    }
    const res = await dispatch(Login({ username, password }));
    if (res?.meta?.requestStatus === "rejected") {
      setLoading(!!0);
      setLoadingText("");
      Toast("error", res?.payload?.detail?.error);
      return 0;
    }
    Toast("success", "Login valid.");
    navigate("/dashboard");
  };

  const initX = async () => {
    const res = await dispatch(pingServer());
    if (res.meta.requestStatus === "fulfilled") {
      setServerPing(!!1);
      Toast("success", "Welcome Back!");
    } else {
      Toast("error", "unable to load, Please Refresh");
    }
  };

  useEffect(() => {
    initX();
  }, []);

  return (
    <>
      <div className="min-h-screen overflow-hidden bg-gray-200 flex justify-center items-center">
        <div className="flex-col justify-center items-center">
          <a href={SITE_URL} target="_blank" rel="noopener noreferrer">
            <div className="flex justify-center items-center text-primary">
              {/* <TestLogo /> */}
              <img
                src={`https://res.cloudinary.com/dkjaod6nu/image/upload/v1717115836/nestage/logos/bk-icon.png`}
                alt="logoImg"
                width={40}
                height={40}
              />
              <p className="font-bold text-lg font-primary text-green-800 hover:text-black">
                NESTAGE
              </p>
            </div>
          </a>
          <div className="mx-auto max-w-sm space-y-8 bg-white rounded-lg shadow-lg p-8 ">
            <p className="block text-center">
              This is a secured Nestage Admin login
            </p>
            {serverPinged ? (
              <>
                <div>
                  <TextInput
                    value={username}
                    onChange={handleChange}
                    name="username"
                    placeholder="Username"
                    icon={RiUserLine}
                    error={usernameError}
                    errorMessage={usernameErrorMsg}
                  />
                </div>
                <div>
                  <TextInput
                    value={password}
                    onChange={handleChange}
                    name="password"
                    icon={RiLockPasswordLine}
                    placeholder="Password"
                    type="password"
                    error={passwordError}
                    errorMessage={passwordErrorMsg}
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={handleSubmit}
                    variant="primary"
                    className="w-full"
                    disabled={loading}
                    loading={loading}
                    loadingText={loadingText}
                  >
                    Login
                  </Button>
                </div>
              </>
            ) : (
              <p className="block text-center italic font-bold text-base text-gray-600 my-3">
                Loading please hold...
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
