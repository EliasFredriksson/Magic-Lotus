import { useEffect } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import useFetch from "../../hooks/useFetch/useFetch";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import IServiceResponse from "../../models/backend/interfaces/IServiceResponse";
import IUser, { BLANK_IUSER } from "../../models/backend/interfaces/IUser";
import { GET_USER_PROFILE } from "../../services/backend/Users.routes";
import "./profile.scss";

type Props = {};

const Profile = (props: Props) => {
  const [profile, setProfile] = useObjectState<IUser>(BLANK_IUSER);

  const { credentials } = useAuth();

  const FetchProfile = useFetch<IServiceResponse<IUser>>({
    route: GET_USER_PROFILE(credentials.id),
    base: "BACKEND",
    method: "GET",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await FetchProfile.triggerFetch();
      if (res.success) {
        setProfile(res.data);
      } else {
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
    </main>
  );
};

export default Profile;
