import { useEffect } from "react";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import IUser, { BLANK_IUSER } from "../../models/backend/interfaces/IUser";
import "./profile.scss";
import Main from "../../components/Main/Main";
import useUtility from "../../hooks/useUtility/useUtility";
import { useFetchGetLoggedInUser } from "../../services/backend/User.service";

const Profile = () => {
  const { openStatusModal } = useUtility();
  const [profile, setProfile] = useObjectState<IUser>(BLANK_IUSER);
  const FetchProfile = useFetchGetLoggedInUser();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await FetchProfile.triggerFetch();
      if (res.object === "aborted") return;
      if (res.object === "magic_lotus_error") {
        setProfile(BLANK_IUSER);
        openStatusModal(res.error);
        return;
      }
      setProfile(res.data);
    };
    fetchProfile();
    return () => {
      FetchProfile.abort();
    };
  }, []);

  return (
    <Main id="profile-page">
      <div className="middle">
        <p>USERNAME: {profile.username}</p>
        <p>ROLE: {profile.role}</p>
        <p>EMAIL: {profile.email}</p>
      </div>
    </Main>
  );
};

export default Profile;
