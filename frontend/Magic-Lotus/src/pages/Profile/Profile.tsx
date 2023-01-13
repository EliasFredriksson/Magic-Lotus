import "./profile.scss";
import { FormEvent, useCallback, useEffect, useState } from "react";
import useObjectState from "../../hooks/useObjectState/useObjectState";
import IUser, { BLANK_IUSER } from "../../models/backend/interfaces/IUser";
import Main from "../../components/Main/Main";
import useUtility from "../../hooks/useUtility/useUtility";
import { useFetchGetLoggedInUser } from "../../services/backend/User.service";
import ImageSelect from "../../components/ImageSelect/ImageSelect";
import { PUBLIC_FOLDER } from "../../Public";
import { useFetchPostUserAvatar } from "../../services/backend/Upload.service";
import Button from "../../components/Button/Button";
import IFile from "../../models/backend/interfaces/IFile";
import Card from "../../components/Card/Card";
import PageHeader from "../../components/PageHeader/PageHeader";
import Text from "../../components/Text/Text";
import Image from "../../components/Image/Image";

interface IIsEditing {
  avatar: boolean;
}

const BLANK_IS_EDITING: IIsEditing = {
  avatar: false,
};

const Profile = () => {
  const { openStatusModal, updateTitle } = useUtility();
  const [profile, setProfile] = useObjectState<IUser>(BLANK_IUSER);
  const FetchProfile = useFetchGetLoggedInUser();

  const [file, setFile] = useState<IFile | null>(null);
  const [imgUrl, setImgUrl] = useState("");
  const uploadAvatar = useFetchPostUserAvatar();

  const [isEditing, setIsEditing] =
    useObjectState<IIsEditing>(BLANK_IS_EDITING);

  const fetchProfile = useCallback(async () => {
    const res = await FetchProfile.triggerFetch();
    if (res.object === "aborted") return;
    if (res.object === "magic_lotus_error") {
      setProfile(BLANK_IUSER);
      openStatusModal(res.error);
      return;
    }
    if (res.object === "network_error" || res.object === "unknown_error") {
      openStatusModal(res.error);
      return;
    }

    console.log("RES: ", res);
    if (res.data.image) setImgUrl(res.data.image.file.data);
    setProfile(res.data);
  }, []);

  const handleUpdateAvatar = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      console.log("SUBMITTED!", e);
      if (file) {
        const res = await uploadAvatar.triggerFetch({
          body: {
            file: file,
          },
        });
        console.log("RES: ", res);
        if (res.object === "aborted") return;
        if (
          res.object === "magic_lotus_error" ||
          res.object === "network_error" ||
          res.object === "unknown_error"
        ) {
          openStatusModal(res.error);
          return;
        }
      }
    },
    [file]
  );

  useEffect(() => {
    fetchProfile();
    updateTitle("Your profile");
  }, [fetchProfile]);

  return (
    <Main id="profile-page">
      <div className="middle">
        <PageHeader title={`${profile.username}'s Profile`} />

        <div className="content">
          <Card className="left">
            <p>USERNAME: {profile.username}</p>
            <p>ROLE: {profile.role}</p>
            <p>EMAIL: {profile.email}</p>
          </Card>
          <Card className="right">
            {isEditing.avatar ? (
              <form onSubmit={handleUpdateAvatar} encType="multipart/form-data">
                <ImageSelect
                  // saveOnChoice
                  name="avatar"
                  imageUrl={imgUrl}
                  fallbackImageUrl={PUBLIC_FOLDER.IMAGES.USERS.DEFAULT}
                  imageSize={{
                    width: "20rem",
                    height: "20rem",
                  }}
                  onSave={(file) => {
                    setFile(file);
                  }}
                />
              </form>
            ) : (
              <>
                <Image
                  imageUrl={imgUrl}
                  fallbackImageUrl={PUBLIC_FOLDER.IMAGES.USERS.DEFAULT}
                  imageSize={{ width: "16rem", height: "16rem" }}
                  spinnerSize="medium"
                  borderRadius="50%"
                />
                <Text size="xl">{profile.username}</Text>
              </>
            )}
          </Card>
        </div>
      </div>
    </Main>
  );
};

export default Profile;
