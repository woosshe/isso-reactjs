import { useEffect, useState } from "react";
import { getGridData, Grid } from "../../components/Grid";
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

  const columns = [
    { id: "userSeq", name: "번호" },
    { id: "email", name: "이메일" },
    { id: "userNm", name: "성명", editable: true },
    {
      id: "posiCd",
      name: "직급",
      editable: true,
      type: "combo",
      data: [
        { value: "P01", label: "대표이사" },
        { value: "P02", label: "이사" },
        { value: "P03", label: "본부장" },
        { value: "P04", label: "부장" },
        { value: "P05", label: "차장" },
        { value: "P06", label: "과장" },
        { value: "P07", label: "대리" },
        { value: "P08", label: "주임" },
        { value: "P09", label: "사원" },
      ],
    },
    {
      id: "deptCd",
      name: "부서",
      editable: false,
      type: "combo",
      data: [
        { value: "MSPTM", label: "경영지원팀" },
        { value: "ECOTM", label: "대외협력팀" },
        { value: "RNDTM", label: "R&D팀" },
        { value: "DV1TM", label: "개발1팀" },
        { value: "DV2TM", label: "개발2팀" },
        { value: "DV3TM", label: "개발3팀" },
        { value: "SPLTM", label: "전략기획팀" },
        { value: "UDVTM", label: "UI개발팀" },
      ],
    },
    { id: "userHp", name: "연락처", editable: true },
  ];

  const config = {
    gridHeight: "500px",
    rowHeight: "36px",
  };

  return (
    <>
      <Grid id='userListGrid' columns={columns} data={userList} config={config} />
      <button onClick={() => getGridData("userListGrid")}>getGridData</button>
    </>
  );
}

export default UserList;
