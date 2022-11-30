import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../libs/atoms";

const Main = (props) => {
  const params = useParams();
  const userInfo = useRecoilValue(userInfoState);
  return (
    <div>
      <div>
        <h1>{params.test || "Main"}</h1>
      </div>
      <hr />
      <div>
        {Object.keys(userInfo).map((key) => (
          <div key={key}>{`${key} : ${userInfo[key]}`}</div>
        ))}
      </div>
    </div>
  );
};

export default Main;
