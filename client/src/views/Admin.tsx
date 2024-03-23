import { useEffect, useRef, useState } from "react";
import { User, getUser, getUsersByUsername } from "../api/user";
import { useNavigate } from "react-router-dom";
import InputText from "../components/shared/InputText";
import Label from "../components/shared/Label";
import Button from "../components/shared/Button";
import QrScanner from "qr-scanner";
import { getLoginQRAuthenticate, loginQRReady } from "../api/auth";

function Admin() {
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    // get user
    getUser().then((res) => {
      if (!res.success) {
        navigate("/login");
        return;
      }

      if (!res.data.isAdmin) {
        navigate("/");
        return;
      }

      setUser(res.data);
    });
  }, []);

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState("");

  const findUsers = async (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const username = target.value;

    // find users
    const res = await getUsersByUsername(username);
    if (!res.success) {
      console.error(res.data.error);
      return;
    }

    setUsers(res.data);
    console.log(res.data);
  };

  const [scanning, setScanning] = useState(false);
  const qrVideo = useRef<HTMLVideoElement>(null);

  const scanQrCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedUser || !qrVideo.current || scanning) {
      return;
    }

    try {
      const qrScanner = new QrScanner(
        qrVideo.current,
        async (result) => {
          await qrScanner.pause();

          const yes = confirm(`Login '${selectedUser}' with QR code?`);
          if (!yes) {
            qrScanner.start();
            return;
          }

          const id = result.data;

          const res = await loginQRReady(id, selectedUser);
          if (!res.success) {
            alert("Error logging in: " + res.data.error);
            return;
          }

          alert(`Successfully logged in '${selectedUser}'.`);
          qrScanner.destroy();
          setScanning(false);
        },
        {}
      );

      setScanning(true);
      await qrScanner.start();
    } catch (error) {
      setScanning(false);
      alert("Error scanning QR code: " + String(error));
    }
  };

  return (
    <main className="flex justify-center items-center w-full min-h-screen flex-col gap-6">
      <h1 className="text-3xl font-bold">Pick User to Login</h1>
      <form onSubmit={scanQrCode} className="max-w-3xl w-full flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label required htmlFor="username">
            Username
          </Label>
          <InputText onInput={findUsers} required name="username" placeholder="username..." />
        </div>

        {/* users list */}
        <div className="h-72 w-full overflow-y-scroll pr-4 mt-4 max-w-3xl flex flex-col gap-2">
          {users.map((user) => (
            <button
              type="button"
              className={`flex w-full justify-between p-4 rounded-lg font-semibold transition-colors duration-300 ${
                selectedUser === user.username ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              key={user.username}
              onClick={() =>
                selectedUser === user.username ? setSelectedUser("") : setSelectedUser(user.username)
              }
            >
              {user.username}
            </button>
          ))}
        </div>

        {/* login button */}
        <Button type="submit" className="w-full max-w-3xl h-16" disabled={!selectedUser}>
          {selectedUser ? "Login " + selectedUser : "Select a user to login"}
        </Button>
      </form>

      {/* qr scanner */}
      <video ref={qrVideo} className={!scanning ? "none" : "absolute top-0 left-0 w-full h-full"}></video>
    </main>
  );
}

export default Admin;
