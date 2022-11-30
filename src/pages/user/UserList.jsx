import { useEffect, useState } from "react";
import { Grid } from "../../components/Grid";
import { axiosPost } from "../../libs/axios";

function UserList() {
  const [userList, setUserList] = useState();

  useEffect(() => {
    axiosPost({ url: "/api/user/list" }).then((response) => {
      if (response.code === "000") {
        setUserList(response.data);
      }
    });
  }, []);

  const cols = [
    { id: "userSeq", name: "번호" },
    { id: "email", name: "이메일" },
    { id: "userNm", name: "성명" },
    { id: "posiNm", name: "직급" },
    { id: "deptNm", name: "부서" },
    { id: "userHp", name: "연락처" },
  ];

  const config = {
    gridHeight: "500px",
    rowHeight: "36px",
  };

  return <Grid cols={cols} data={userList} config={config} />;
}

export default UserList;
