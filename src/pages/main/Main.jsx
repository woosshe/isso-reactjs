import { Link, useParams } from "react-router-dom";
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
      <div>
        <Link to='/Test1'>Test1</Link>
      </div>
      <div>
        <Link to='/Test2'>Test2</Link>
      </div>
      <div>
        <Link to='/Test3'>Test3</Link>
      </div>
      <div>
        <Link to='/Test4'>Test4</Link>
      </div>
      <div>
        <Link to='/Test5'>Test5</Link>
      </div>
      <div>
        <Link to='/Test6'>Test6</Link>
      </div>
      <div>
        <Link to='/Test7'>Test7</Link>
      </div>
      <div>
        <Link to='/Test8'>Test8</Link>
      </div>
      <div>
        <Link to='/Test9'>Test9</Link>
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
