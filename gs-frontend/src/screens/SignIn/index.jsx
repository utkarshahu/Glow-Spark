import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Api } from "../../utils/Api";
import { setToken } from "../../utils/localstorage";

function Index() {
  const { replace, push } = useHistory();

  // ✅ Fix: default values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const _handleSubmit = useCallback(async () => {
    if (email.length > 2 && password.length > 2) {
      setLoading(true);

      const { statusCode, data } = await Api.postRequest(
        "/api/user/signin",
        { email, password }
      );

      setLoading(false);

      if ([400, 403, 500].includes(statusCode)) {
        alert(data);
        return;
      }

      const { token } = JSON.parse(data);
      setToken(token);
      replace("/");
    } else {
      alert("Please enter valid email and password");
    }
  }, [email, password, replace]);

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Signing in...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-gray-100">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => push("/")}
            className="text-gray-500 hover:text-gray-800 text-xl transition"
          >
            ←
          </button>

          <h2 className="text-xl font-semibold text-gray-800">
            Sign In
          </h2>

          <div></div>
        </div>

        {/* Form */}
        <div className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Link */}
          <Link
            to="/signup"
            className="text-sm text-blue-600 hover:underline"
          >
            Create a new account
          </Link>

          {/* Button */}
          <button
            onClick={_handleSubmit}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:shadow-lg hover:scale-[1.02] transition"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;