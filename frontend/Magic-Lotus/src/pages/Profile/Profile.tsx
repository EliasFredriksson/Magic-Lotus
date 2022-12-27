import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch/useFetch";
import useModal from "../../hooks/useModal/useModal";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import IServiceResponse from "../../models/backend/types/MagicLotusResponse";
import IUser, { BLANK_IUSER } from "../../models/backend/interfaces/IUser";
import { GET_USER_PROFILE } from "../../services/backend/Users.routes";
import "./profile.scss";

const Profile = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [ErrorModal, openErrorModal] = useModal({
    innerTsx: <span>ERROR HERE</span>,
    confirmTextOrButton: "Ok",
  });

  const [profile, setProfile] = useObjectState<IUser>(BLANK_IUSER);
  const FetchProfile = useFetch<IServiceResponse<IUser>>({
    route: GET_USER_PROFILE(),
    base: "BACKEND",
    method: "GET",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await FetchProfile.triggerFetch();
      if (res.success) {
        setErrorMsg("");
        setProfile(res.data);
      } else {
        setErrorMsg(res.error);
        // openErrorModal();
        setProfile(BLANK_IUSER);
      }
    };
    fetchProfile();
    return () => {
      FetchProfile.abort();
    };
  }, []);

  return (
    <main id="profile-page">
      <div className="middle">
        <p>USERNAME: {profile.username}</p>
        <p>ROLE: {profile.role}</p>
        <p>EMAIL: {profile.email}</p>
      </div>
      {ErrorModal}
    </main>
  );
};

export default Profile;
